"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SettingWrapper = ({ children }: { children: React.ReactNode }) => {
  const url = usePathname();
  const urllength = url.split("/").length;
  const active = url.split("/")[urllength - 1];

  return (
    <>
      <div className="col-lg-8">
        <div className="setting-box-wrap">
          <h2>Settings</h2>
          <div className="setting-tab">
            <div className="post-tab-wrap">
              <ul>
                <li className={active === "feed" ? "active" : ""}>
                  <Link href={"/settings/feed"}>Feed Settings</Link>
                </li>
                <li className={active === "notification" ? "active" : ""}>
                  <Link href={"/settings/notification"}>
                    Notifications Settings
                  </Link>
                </li>
              </ul>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="col-lg-2"></div>
    </>
  );
};

export default SettingWrapper;
