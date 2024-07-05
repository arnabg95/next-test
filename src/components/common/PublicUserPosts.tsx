"use client"
import { getPopularStories } from "@/http/helper";
import PostMapper from "./PostMapper";

export default function PublicUserPosts({slug}:{slug:string}) {
  const postUrl = `web/get-post-by-user-slug/${slug}`

  return (
    <>
        <PostMapper url={postUrl} loaderFn={getPopularStories} />
    </>
  );
}
