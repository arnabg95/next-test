"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../../../components/common/Button";
import Image from "next/image";
import { fetchUserFollowings } from "@/http/helper";
import FollowersCard from "../_components/FollowersCard";
import { formatNumber } from "@/components/helpers";
import useSWR from "swr";
import CustomLoader from "@/components/Loader/CustomLoader";
import { fetchApi } from "@/http";
import { PROFILE_REMOVE_FOLLOWING_URL } from "@/constants/urls";
import CustomSnackBar from "@/components/common/CustomSnackBar";

const Following = () => {
  const [page, setPage] = useState<number>(1);
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [allFollowings, setAllFollowings] = useState<any>([]);

  const url = `page=${page}&limit=6&search=${debouncedSearch}`;
  const { data, isLoading, error, mutate } = useSWR(url, fetchUserFollowings);

  const removeFollowing = async (id: string) => {
    try {
      await fetchApi(`${PROFILE_REMOVE_FOLLOWING_URL}/${id}`, {
        method: "DELETE",
      });
      // As in case of paginating results are appended
      setAllFollowings((pre: any) => pre.filter((e: any) => e._id !== id));
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (data?.followings && data?.followings[0]?.length != 0) {
      if (search && search !== "") {
        const newFollowings = data?.followings[0]?.data || [];
        setAllFollowings([...newFollowings]);
      } else {
        setAllFollowings((prev: any) => {
          const newFollowings = data?.followings[0]?.data || [];
          if (newFollowings && newFollowings?.length > 0) {
            const updatedFollowings = [...prev, ...newFollowings];
            const uniqueData = Array.from(
              updatedFollowings
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
          Followings <span>{formatNumber(data?.totalFollowings ?? 0)}</span>
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
              />{" "}
            </button>
          </div>
        </form>
      </div>

      <div className="white-bg-shw">
        <div className="profile-followers-wrap">
          <div className="row">
            {allFollowings && allFollowings.length ? (
              allFollowings?.map(({ following, _id }: any) => {
                return (
                  <FollowersCard
                    followId={_id}
                    removeAction={removeFollowing}
                    desc={following?.desc}
                    followers={formatNumber(following?.followersCount ?? 0)}
                    followings={formatNumber(following?.followingsCount ?? 0)}
                    posts={formatNumber(following?.postsCount ?? 0)}
                    id={following?.id}
                    image={following?.profile_image ?? ""}
                    name={following?.name}
                    key={_id}
                    slug={following?.slug}
                    subTitle={following?.subTitle}
                    type="following"
                  />
                );
              })
            ) : !isLoading ? (
              <h5 className="text-center">No Followings</h5>
            ) : null}
          </div>
          {isLoading ? <CustomLoader /> : null}
          {data?.totalFollowings ?? 0 ? (
            page < data?.followings[0]?.pagination.totalPages ? (
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

export default Following;
