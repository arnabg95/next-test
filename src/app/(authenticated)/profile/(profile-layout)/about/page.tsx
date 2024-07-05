import AboutComponent from "@/components/common/AboutComponent";
import CustomLoader from "@/components/Loader/CustomLoader";
import { getSession } from "@/lib";
import { fetchApi } from "@/http";
import { PROFILE_ABOUT_URL } from "@/constants/urls";

const AboutPage = async () => {
  const session = await getSession();
  const profileData = await fetchApi(PROFILE_ABOUT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.tokens.access.token}`,
    },
    next: {
      tags: ["aboutPage"],
    },
  });

  return (
      <AboutComponent
        bio={profileData.data.userData.bio}
        followers={profileData.data.followData.followers}
        followings={profileData.data.followData.followings}
        posts={profileData.data.followData.posts}
      />
  );
};

export default AboutPage;
