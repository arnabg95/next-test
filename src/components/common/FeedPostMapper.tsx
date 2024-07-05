"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import SkeletonLoader from "./SkeletonLoader";
import SinglePost from "./SinglePost";
import AdBanner from "./AdBanner";

export default function FeedPostMapper({
  url,
  loaderFn,
  searchByTag = false,
}: {
  url: string;
  loaderFn: any;
  key?: string;
  searchByTag?: boolean;
}) {
  const [page, setPage] = useState<number>(1);
  const [alldata, setAlldata] = useState<any>([]);

  const paginatedUrl = url.includes("?")
    ? `${url}&page=${page}&limit=10`
    : `${url}?page=${page}&limit=10`;

  const { data: posts, isLoading } = useSWR(paginatedUrl, loaderFn);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          posts?.pagination[0]?.page < posts?.pagination[0]?.totalPages
        ) {
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, page, posts?.pagination]
  );

  useEffect(() => {
    setPage(1);
  }, [url]);

  useEffect(() => {
    if (posts) {
      setAlldata((predata: any) => {
        const data = posts?.data.map((e: any) => ({
          ...e,
          mutateUrl: paginatedUrl,
        }));

        if (searchByTag) return [...data];

        const combinedData = [...predata, ...data];
        const uniqueDataMap = new Map(
          combinedData.map((item: any) => [item._id, item])
        );
        const uniqueData = Array.from(uniqueDataMap.values());
        return uniqueData;
      });
    }
  }, [posts, paginatedUrl, searchByTag]);

  return (
    <>
      <div className="sigle-post white-bg-shw">
        <AdBanner />
        {alldata?.length ? (
          alldata?.map((item: any, index: number) => {
            if (index === alldata?.length - 1) {
              return (
                <div key={item?.id} ref={lastItemRef}>
                  <SinglePost item={item} />
                </div>
              );
            } else {
              return (
                <div key={item?.id}>
                  <SinglePost item={item} />
                </div>
              );
            }
          })
        ) : !isLoading ? (
          <h2 className="text-center">No Post Found</h2>
        ) : null}
        {isLoading ? <SkeletonLoader /> : null}
      </div>
    </>
  );
}
