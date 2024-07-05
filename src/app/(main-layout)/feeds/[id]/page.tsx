"use client";
import React from "react";
import PostCommon from "@/components/common/PostCommon";
import useSWR from "swr";
import { getPostDetails } from "@/http/helper";
import UserCard from "@/components/common/UserCard";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import UserCardMobile from "@/components/common/UserCardMobile";

const PostDetails = ({ params }: { params: { id: string } }) => {
  const url = `web/post-details/${params.id}`;
  const { data, isLoading } = useSWR(url, getPostDetails);


  return (
    <>
      <div className="col-lg-8">
        <div className="for-m-det">
          {isLoading ? <UserCardMobile /> : <UserCard user={data?.user} />}
        </div>
        {isLoading ? (
          <SkeletonLoader />
        ) : data ? (
          <PostCommon data={data} slug={params.id} mutateUrl={url} />
        ) : (
          <h2 className="text-center">No Post Found</h2>
        )}
      </div>
      <div className="col-lg-2">
        {isLoading ? (
          <UserCardMobile />
        ) : data && data?.user ? (
          <UserCard user={data?.user} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PostDetails;
