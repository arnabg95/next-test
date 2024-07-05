"use client";
import React from "react";
import LeftBar from "@/components/common/LeftBar";
import { IChildren } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/AuthSessionProvider";
import useSettingsStore from "@/store/useAuthStore";

/**
 * @description Server Component to Client Component
 */

const Layout1 = ({ children }: IChildren) => {
  const session = useSession();
  const router = useRouter();
  const { updateSettings } = useSettingsStore();
  if (session) {
    if (session?.user?.feedsettings?.blur_mature)
      updateSettings(
        "blurMatured",
        session?.user?.feedsettings?.blur_mature ?? false
      );
    if (session?.user?.feedsettings?.post_on_new_tab)
      updateSettings(
        "postInNewTab",
        session?.user?.feedsettings?.blur_mature ?? false
      );

    router.push("/");
  }
  return (
    <>
      <div className="main-wraper">
        <LeftBar />
        {children}
      </div>
    </>
  );
};

export default Layout1;
