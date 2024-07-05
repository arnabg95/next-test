"use client";
import { getProfilePosts } from "@/http/helper";
import FeedPostMapper from "./FeedPostMapper";

export default function ProfilePOstsWithSearch({ search }: { search: string }) {
  const postUrl = `web/get-profile-posts?search=${search}`;

  return (
    <>
      <FeedPostMapper url={postUrl} loaderFn={getProfilePosts} searchByTag={!!search} />
    </>
  );
}
