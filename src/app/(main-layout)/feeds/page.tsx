"use client";
import React, {  } from "react";
import PopularPosts from "@/components/common/PopularPosts";

const FeedPage = () => {
  return (
    <>
      <div className="col-lg-8">
        <div className="hot-story-wrap">
          <div className="home-popular">
            <div className="home-p-w">
              <PopularPosts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPage;
