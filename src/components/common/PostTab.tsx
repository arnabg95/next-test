"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function PostTab({
  publicProfile = false,
}: {
  publicProfile?: boolean;
}) {
  const path = usePathname();
  const profileUrl = publicProfile ? "profiles" : "profile";

  const ProfileRouteLinks = [
    {
      active: path === `/${profileUrl}` ? "active" : "",
      link: `/${profileUrl}`,
      title: "Overviews",
      type: true,
    },
    {
      active: path === `/${profileUrl}/about` ? "active" : "",
      link: `/${profileUrl}/about`,
      title: "About",
      type: true,
    },
    {
      active: path === `/${profileUrl}/all-posts` ? "active" : "",
      link: `/${profileUrl}/all-posts`,
      title: "All Posts",
      type: true,
    },
    {
      active: path === `/${profileUrl}/followers` ? "active" : "",
      link: `/${profileUrl}/followers`,
      title: "Followers",
      type: false,
    },
    {
      active: path === `/${profileUrl}/following` ? "active" : "",
      link: `/${profileUrl}/following`,
      title: "Following",
      type: false,
    },
  ];

  return (
    <div className="post-tab-wrap">
      <ul>
        {ProfileRouteLinks.filter(({ type }) => !publicProfile || type).map(
          ({ title, link, active }) => (
            <li className={active} key={title}>
              <Link href={link}>{title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
