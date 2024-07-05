"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Image from "next/image";
import FollowersCard from "../_components/FollowersCard";
import { formatNumber } from "@/components/helpers";
import { fetchUserFollowers } from "@/http/helper";
import useSWR from "swr";
import CustomLoader from "@/components/Loader/CustomLoader";
import { PROFILE_REMOVE_FOLLOWER_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import CustomSnackBar from "@/components/common/CustomSnackBar";

const FollowersPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const [allFollowers, setAllFollowers] = useState<any>([]);

  const url = `page=${page}&limit=6${
    debouncedSearch ? `&search=${debouncedSearch}` : ""
  }`;
  const { data, isLoading, error, mutate } = useSWR(url, fetchUserFollowers);

  const removeFollower = async (id: string) => {
    try {
      await fetchApi(`${PROFILE_REMOVE_FOLLOWER_URL}/${id}`, {
        method: "DELETE",
      });
      mutate();
      setAllFollowers((pre: any) => pre.filter((e: any) => e._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (data?.followers && data?.followers[0]?.length != 0) {
      if (search && search !== "") {
        const newFollowers = data?.followers[0]?.data || [];
        setAllFollowers([...newFollowers]);
      } else {
        setAllFollowers((prev: any) => {
          const newFollowers = data?.followers[0]?.data;
          if (newFollowers && newFollowers?.length > 0) {
            const updatedFollowers = [...prev, ...newFollowers];
            const uniqueData = Array.from(
              updatedFollowers
                .reduce((map, item) => {
                  map.set(item._id, item);
                  return map;
                }, new Map())
                .values()
            );
            return uniqueData;
          } else {
            return prev;
          }
        });
      }
    }
  }, [data, search]); // Build Error

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  if (error) return <h5 className="text-center mt-5">Internal Server Error</h5>;

  return (
    <>
      <div className="profile-search-wrap">
        <h2>
          Followers <span>{formatNumber(data?.totalFollowers ?? 0)}</span>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search on Moji AI"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <Image
                src="/assets/images/icon_search.svg"
                alt=""
                width={28}
                height={28}
              />
            </button>
          </div>
        </form>
      </div>
      <div className="white-bg-shw">
        <div className="profile-followers-wrap">
          <div className="row">
            {allFollowers && allFollowers.length ? (
              allFollowers.map(({ follower, _id }: any) => {
                return (
                  <FollowersCard
                    removeAction={removeFollower}
                    followId={_id}
                    desc={follower?.desc}
                    followers={formatNumber(follower?.followersCount ?? 0)}
                    followings={formatNumber(follower?.followingsCount ?? 0)}
                    posts={formatNumber(follower?.postsCount ?? 0)}
                    id={follower?.id}
                    image={follower?.profile_image}
                    name={follower?.name}
                    key={_id}
                    subTitle={follower?.subTitle}
                    slug={follower?.slug}
                    type="followers"
                  />
                );
              })
            ) : !isLoading ? (
              <h5 className="text-center">No Followers</h5>
            ) : null}
          </div>

          {isLoading ? <CustomLoader /> : null}
          {data?.totalFollowers ?? 0 ? (
            page < data?.followers[0]?.pagination.totalPages ? (
              <div className=" text-center">
                <Button type="submit" title="Load More" onclick={loadMore} />
              </div>
            ) : null
          ) : null}
        </div>
      </div>
      <CustomSnackBar msg={showSnackBar} setShow={setShowSnackbar} />
    </>
  );
};

export default FollowersPage;
