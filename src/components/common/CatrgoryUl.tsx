"use client";
import { getCategories } from "@/http/helper";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CatrgoryUlSkeleton from "./CatrgoryUlSkeleton";

export default function CatrgoryUl() {
  const [page, setPage] = useState<number>(1);
  const [resetCatList, setResetCatList] = useState<boolean>(false);

  const [category, setCategory] = useState<
    { id: string; icon: string; name: string; link: string }[] | []
  >([]);

  const { data, isLoading } = useSWR(
    `web/categories/list?page=${page}&limit=${10}`,
    getCategories
  );

  useEffect(() => {
    if (data?.data) {
      const newdata = data.data as {
        id: string;
        icon: string;
        name: string;
        link: string;
      }[];
      setCategory((preData) => {
        if (resetCatList) {
          // If resetting the list then returning only the page 1 data and setting it to false
          setResetCatList(false);
          return [...newdata];
        }
        const combinedData = [...preData, ...newdata];
        const uniqueData = Array.from(
          new Set(combinedData.map((item) => JSON.stringify(item)))
        ).map((item) => JSON.parse(item));
        return uniqueData;
      });
    }
  }, [data, resetCatList]);

  return (
    <>
      {isLoading ? (
        <CatrgoryUlSkeleton />
      ) : (
        <ul>
          <li key="all">
            <Link href="/">
              <div className="im-g">
                <Image
                  src="/assets/images/8.png"
                  alt="feeds"
                  width={24}
                  height={24}
                />
              </div>
              <p className="mb-0">All</p>
            </Link>
          </li>
          {category?.map((value, index) => {
            return (
              <li key={value.id} className="my-3">
                <Link href={value.link}>
                  <div className="im-g">
                    <Image
                      src={
                        value?.icon
                          ? value.icon
                          : "/assets/images/category-default.jpg"
                      }
                      alt="feeds"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="mb-0">{value.name}</p>
                </Link>
              </li>
            );
          })}
          <li key={"others"} className="my-3">
            <Link href={"/search?category=others"}>
              <div className="im-g">
                <Image
                  src={"/assets/images/category-default.jpg"}
                  alt="feeds"
                  width={24}
                  height={24}
                />
              </div>
              <p className="mb-0">Others</p>
            </Link>
          </li>
          {data?.pagination?.page < data?.pagination?.totalPages ? (
            <span
              className="see-more"
              style={{ cursor: "pointer" }}
              onClick={() => setPage(page + 1)}
            >
              See More
            </span>
          ) : null}

          {data?.pagination?.page === data?.pagination?.totalPages ? (
            <span
              className="see-more"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setResetCatList(true);
                setPage(1);
              }}
            >
              See Less
            </span>
          ) : null}
        </ul>
      )}
    </>
  );
}
