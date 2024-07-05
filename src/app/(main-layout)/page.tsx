"use client";
import { getTrendingTags } from "@/http/helper";
import Link from "next/link";
import useSWR from "swr";
import TagsSkeleton from "../../components/common/TagsSkeleton";
import SliderData from "@/components/common/SliderData";
import FeedPostMapper from "@/components/common/FeedPostMapper";
import { getPosts } from "@/http/helper";

export default function Home() {
  const { data: trending, isLoading } = useSWR(
    "/web/get-trending-stories",
    getTrendingTags
  );
  const url = "web/get-post-by-category";

  return (
    <>
      <div className="col-lg-8">
        <div className="hot-story-wrap">
          <h2>Hot Stories</h2>
          <div className="white-bg-shw slider-w">
            <SliderData />
          </div>

          <div className="home-trending-wraper">
            <h2>Trending</h2>
            <div className="white-bg-shw">
              {isLoading ? (
                <TagsSkeleton />
              ) : trending?.length ? (
                <ul>
                  {trending?.map((value: { list: string }, index: number) => {
                    return (
                      <li key={index}>
                        <p>
                          <Link
                            href={`/feeds?tag=${value.list.split("#")[1]}`}
                            style={{ textTransform: "capitalize" }}
                          >
                            {value.list}
                          </Link>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h4 className="text-center">No Trending Tags</h4>
              )}
            </div>
          </div>
          <div className="home-popular">
            <h2>Popular Posts </h2>
            <div className="home-p-w">
              <FeedPostMapper
                url={url}
                loaderFn={getPosts}
                searchByTag={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
