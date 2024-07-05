"use client";
import React, { useEffect } from "react";
import CustomizedSwitches from "@/components/common/switch";
import useSWR from "swr";
import { feedSettings } from "@/http/helper";
import CustomLoader from "@/components/Loader/CustomLoader";
import { UPDATE_FEED_SETTINGS_URL } from "@/constants/urls";
import useSettingsStore from "@/store/useAuthStore";

const Feed = () => {
  const { data, isLoading, error } = useSWR("feed-settings", feedSettings);
  const { updateSettings } = useSettingsStore();

  useEffect(() => {
    if (data) {
      updateSettings("blurMatured", data?.blur_mature ?? false);
      updateSettings("postInNewTab", data?.post_on_new_tab ?? false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return <h4 className="text-center mt-5">Something Went Wrong!</h4>;
  return (
    <>
      <h4>Content Preferences</h4>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="white-bg-shw">
          <div className="switch-wrap">
            <div className="switch-list">
              <div className="switch-content">
                <h5>Show mature (18+) content</h5>
                <p>
                  See NSFW (Not Safe for Work) mature and adult images, videos,
                  written content, and other media in your Reddit feeds and
                  search results.
                </p>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="feed"
                  checked={data?.is_mature ?? false}
                  value="is_mature"
                  url={UPDATE_FEED_SETTINGS_URL}
                />
              </div>
            </div>
            <div className="switch-list">
              <div className="switch-content">
                <h5>Blur mature images and media</h5>
                <p>
                  Blur previews and thumbnails for any images or videos tagged
                  as NSFW (Not Safe for Work).
                </p>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="feed"
                  checked={data?.blur_mature ?? false}
                  value="blur_mature"
                  url={UPDATE_FEED_SETTINGS_URL}
                />
              </div>
            </div>

            <div className="switch-list">
              <div className="switch-content">
                <h5>Open posts in new tab</h5>
                <p>Enable to always open posts in a new tab.</p>
              </div>
              <div className="switch-button">
                <CustomizedSwitches
                  type="feed"
                  checked={data?.post_on_new_tab ?? false}
                  value="post_on_new_tab"
                  url={UPDATE_FEED_SETTINGS_URL}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
