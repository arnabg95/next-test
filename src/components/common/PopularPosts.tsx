"use client";
import React from "react";
import { getRandomStories } from "@/http/helper";
import PostMapper from "./PostMapper";

export default function PopularPosts() {
  return (
    <>
      <PostMapper url={"web/get-random-posts"} loaderFn={getRandomStories} />
    </>
  );
}
