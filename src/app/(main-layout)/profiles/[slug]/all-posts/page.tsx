"use client";
import PublicUserPosts from "@/components/common/PublicUserPosts";
import React from "react";
import { getPopularStories } from "@/http/helper";
import FeedPostMapper from "@/components/common/FeedPostMapper";

const AllPostsPage = ({ params }: { params: { slug: string } }) => {
  const url = `web/get-post-by-user-slug/${params.slug}`;
  return (
    <div id="tab-post" className="tab-post common-tab-style">
      <h2>Posts</h2>
      <FeedPostMapper loaderFn={getPopularStories} url={url} />
    </div>
  );
};

export default AllPostsPage;
