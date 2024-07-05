import React, { Suspense } from "react";
import { IChildren } from "../../../../interfaces/index";
import PostTab from "@/components/common/PostTab";
import ProfileBanner from "@/components/common/ProfileBanner";
import { fetchApi } from "@/http";
import { PROFILE_ABOUT_URL } from "@/constants/urls";
import { getSession } from "@/lib";
import CustomLoader from "@/components/Loader/CustomLoader";

interface IUserProfile {
  data: {
    userData: {
      profile_image: string;
      bio: string;
      email: string;
      name: string;
    };
    followData: {
      posts: number;
      followers: number;
      followings: number;
    };
  };
  message: string;
}

const ProfileLayout = async ({ children }: IChildren) => {
  const session = await getSession();

  const profileData = await fetchApi(PROFILE_ABOUT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.tokens.access.token}`,
    },
  });

  const { name, email, profile_image, _id } = profileData.data.userData;

  return (
    <>
      <div className="col-lg-8">
        <ProfileBanner name={name!} email={email!} img={profile_image!} />
        <div className="profile-page-tab-wraper">
          <PostTab />
          <Suspense fallback={<CustomLoader />}>{children}</Suspense>
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
};

export default ProfileLayout;
