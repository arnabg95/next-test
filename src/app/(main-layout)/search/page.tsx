"use client";
import FeedPostMapper from "@/components/common/FeedPostMapper";
import { getPosts } from "@/http/helper";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const params = useSearchParams();
  const tag = params.get("tag");
  const category = params.get("category");
  const search = params.get("search");
  const [url, setUrl] = useState<string>("web/get-post-by-category");

  useEffect(() => {
    if (tag) {
      setUrl(`web/get-post-by-category?tag=${tag}`);
    } else if (category) {
      setUrl(`web/get-post-by-category?category=${category}`);
    } else if (search) {
      setUrl(`web/get-post-by-category?search=${search}`);
    }
  }, [tag, category, search]);

  return (
    <div className="col-lg-8">
      <div className="hot-story-wrap">
        <div className="home-popular">
          <div className="home-p-w">
            <FeedPostMapper url={url} loaderFn={getPosts} searchByTag={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
