"use client";
import { getTrendingStories } from "@/http/helper";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import TrendingTodaySkeleton from "./TrendingTodaySkeleton";
import { getRawCharsFromHtml } from "../../helper/decodeHtml";
import Link from "next/link";

type IProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const SearchTrending = ({ setShow }: IProps) => {
  const { data: trending, isLoading } = useSWR(
    "/web/get-trending-today",
    getTrendingStories
  );

  if (isLoading) return <TrendingTodaySkeleton />;
  return (
    <div className="search-trending">
      <h3>Trending Today </h3>
      <div className="search-trending-list-wrap">
        {trending?.length ? (
          trending.map((value: any) => {
            const body = getRawCharsFromHtml(value?.body);
            return (
              <Link
                onClick={() => setShow(false)}
                href={`/feeds/${value.slug}`}
                key={value._id}
              >
                <div className="search-trending-list">
                  <div className="search-trinding-img">
                    <Image
                      src={
                        value.image
                          ? value.image
                          : "/assets/images/default_image.png"
                      }
                      alt=""
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="search-trinding-content">
                    <h4>{value.title}</h4>
                    <p>
                      {body.length > 50 ? body.substring(0, 50) + "..." : body}
                    </p>
                    <div className="tranding-profile">
                      <Image
                        src={
                          value.userDetails.profile_image ??
                          "/assets/images/default-user.png"
                        }
                        alt=""
                        width={26}
                        height={26}
                      />
                      <h5>{value.userDetails.name ?? "Anonymous"}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h6 className="text-center">No Trending Posts Today</h6>
        )}
      </div>
    </div>
  );
};

export default SearchTrending;
