"use client";
import React, { useState } from "react";
import useSWR from "swr";
import SkeletonLoader from "./SkeletonLoader";
import SinglePost from "./SinglePost";

export default function PostMapper({
  url,
  loaderFn,
}: {
  url: string;
  loaderFn: any;
}) {
  const [page] = useState<number>(1);
  const [limit] = useState<number>(10);

  const paginatedUrl = url.includes("?")
    ? `${url}&page=${page}&limit=${limit}`
    : `${url}?page=${page}&limit=${limit}`;

  const { data: posts, isLoading } = useSWR(paginatedUrl, loaderFn);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="sigle-post white-bg-shw">
          {posts?.data?.length ? (
            posts?.data?.map((value: any) => {
              return (
                <SinglePost
                  item={{ ...value, mutateUrl: paginatedUrl }}
                  key={value._id}
                />
              );
            })
          ) : (
            <h4 className="text-center">No Posts Found</h4>
          )}
        </div>
      )}
    </>
  );
}
