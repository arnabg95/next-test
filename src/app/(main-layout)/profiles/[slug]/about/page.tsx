import React from "react";
import AboutComponent from "@/components/common/AboutComponent";
import { fetchApi } from "@/http";

const AboutPage = async ({ params }: { params: { slug: string } }) => {
  const url = `web/public-profile/${params.slug}`;
  const userInfo = await fetchApi(url);
  return (
    <AboutComponent
      bio={userInfo.data.userData?.bio}
      followers={userInfo.data.userData?.followerCount}
      followings={userInfo.data.userData?.followingCount}
      posts={userInfo.data.userData?.postCount}
    />
  );
};

export default AboutPage;
