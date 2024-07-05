"use client";
import { fetchUserProfileDetails } from "@/http/helper";
import ChangePassword from "./_components/ChangePassword";
import ProfileCard from "./_components/ProfileCard";
import ProfileDataForm from "./_components/ProfileDataForm";
import useSWR from "swr";
import CustomLoader from "@/components/Loader/CustomLoader";
import { useSession } from "@/components/providers/AuthSessionProvider";

const EditProfile = () => {
  const session = useSession();
  const {
    data: userData,
    isLoading,
    mutate,
  } = useSWR("profileData", fetchUserProfileDetails);

  const handleProfileUpdate = async () => {
    await mutate();
  };


  return (
    <>
      <div className="col-lg-8">
        <div className="for-m-det">
          <ProfileCard
            handleProfileUpdate={handleProfileUpdate}
            token={session?.tokens.access.token}
            email={userData?.email}
            name={userData?.name}
            image={userData?.profile_image}
          />
        </div>

        <div className="edit-profile-wraper">
          <div className="edit-profile-part">
            <h2>Edit Profile</h2>
            <h3>Personal Information</h3>

            <div className="white-bg-shw">
              {isLoading ? (
                <CustomLoader />
              ) : (
                <ProfileDataForm
                  token={session?.tokens.access.token}
                  user={userData}
                  handleProfileUpdate={handleProfileUpdate}
                />
              )}
            </div>
          </div>
          <ChangePassword token={session?.tokens.access.token} />
        </div>
      </div>
      <div className="col-lg-2">
        {isLoading ? (
          <CustomLoader />
        ) : (
          <ProfileCard
            handleProfileUpdate={handleProfileUpdate}
            token={session?.tokens.access.token}
            email={userData?.email}
            name={userData?.name}
            image={userData?.profile_image}
          />
        )}
      </div>
    </>
  );
};

export default EditProfile;
