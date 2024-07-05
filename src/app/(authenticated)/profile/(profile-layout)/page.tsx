import { PROFILE_OVERVIEW_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import { getSession } from "@/lib";;
import PublicUserPosts from "@/components/common/PublicUserPosts";
import AboutComponent from "@/components/common/AboutComponent";

const ProfilePage = async () => {
  const session = await getSession();

  const profileOverview = await fetchApi(PROFILE_OVERVIEW_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.tokens.access.token}`,
    },
  });

  return (
    <>
      <AboutComponent
        bio={profileOverview.data.userData.bio}
        followers={profileOverview.data.followData.followers}
        followings={profileOverview.data.followData.followings}
        posts={profileOverview.data.followData.posts}
      />
      <div id="tab-post" className="tab-post common-tab-style">
        <h2>Posts</h2>
        <PublicUserPosts slug={profileOverview.data.userData.slug} />
      </div>
    </>
  );
};

export default ProfilePage;
