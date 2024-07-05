import ProfileBanner from "@/components/common/ProfileBanner";
import PublicPostTab from "../_components/PublicPostTab";
import { fetchApi } from "@/http";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib";

const ProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getSession();
  if (session?.user.slug === params.slug) {
    return redirect("/profile");
  } else {
    const url = `web/public-profile/${params.slug}`;
    let userInfo = await fetchApi(url, {
      next: { tags: ["profile-banner"] },
    });

    if (userInfo.data.userData === null)
      return <h1 className="col-lg-8 text-center mt-2">Profile Not Found</h1>;

    return (
      <>
        <div className="col-lg-8">
          <ProfileBanner
            name={userInfo.data.userData?.name}
            email={userInfo.data.userData?.email}
            img={userInfo.data.userData?.profile_image}
            id={userInfo.data.userData?._id}
            publicProfile
          />
          <div className="profile-page-tab-wraper">
            <PublicPostTab id={params.slug} />
            {children}
          </div>
        </div>
        <div className="col-lg-2"></div>
      </>
    );
  }
};

export default ProfileLayout;
