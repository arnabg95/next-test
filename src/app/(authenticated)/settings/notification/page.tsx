"use client";
import CustomizedSwitches from "@/components/common/switch";
import useSWR from "swr";
import CustomLoader from "@/components/Loader/CustomLoader";
import { UPDATE_NOTIFICATION_SETTINGS_URL } from "@/constants/urls";
import { notificationSettings } from "@/http/helper";

export default function NotificationMenu() {
  const { data, isLoading, error } = useSWR(
    "notification-settings",
    notificationSettings
  );
  if (error) return <h4 className="text-center mt-5">Something Went Wrong!</h4>;
  return (
    <>
      <h4>Activity</h4>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="white-bg-shw">
          <div className="switch-wrap">
            <div className="switch-list">
              <div className="switch-content">
                <h5>Comments on your posts</h5>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="notification"
                  checked={
                    data?.data?.settings?.activity?.activity_on_my_post ?? false
                  }
                  value="activity_on_my_post"
                  url={UPDATE_NOTIFICATION_SETTINGS_URL}
                />
              </div>
            </div>

            <div className="switch-list">
              <div className="switch-content">
                <h5>New followers</h5>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="notification"
                  checked={data?.data?.settings?.activity?.newFollower}
                  value="newFollower"
                  url={UPDATE_NOTIFICATION_SETTINGS_URL}
                />
              </div>
            </div>
            <div className="switch-list">
              <div className="switch-content">
                <h5>Posts you follow</h5>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="notification"
                  checked={
                    data?.data?.settings?.activity?.activity_on_other_post
                  }
                  value="activity_on_other_post"
                  url={UPDATE_NOTIFICATION_SETTINGS_URL}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
