import React from "react";
import Image from "next/image";
import { fetchApi } from "@/http";
import { formatNumber } from "@/components/helpers";
import PublicUserPosts from "@/components/common/PublicUserPosts";
import AboutComponent from "@/components/common/AboutComponent";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const url = `web/public-profile/${params.slug}`;
  const userInfo = await fetchApi(url);

  if (userInfo.data.userData)
    return (
      <>
        <AboutComponent
          bio={userInfo.data.userData.bio}
          followers={userInfo.data.userData.followerCount}
          followings={userInfo.data.userData.followingCount}
          posts={userInfo.data.userData.postCount}
        />

        <div id="tab-post" className="tab-post common-tab-style">
          <h2>Posts</h2>
          <PublicUserPosts slug={params.slug} />
        </div>
      </>
    );
  else return <></>;
};

export default ProfilePage;
