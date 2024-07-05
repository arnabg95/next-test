"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function PublicPostTab({ id }: { id: string }) {
  const path = usePathname();

  const ProfileRouteLinks = [
    {
      active: path === `/profiles/${id}` ? "active" : "",
      link: `/profiles/${id}`,
      title: "Overviews",
      type: true,
    },
    {
      active: path === `/profiles/${id}/about` ? "active" : "",
      link: `/profiles/${id}/about`,
      title: "About",
      type: true,
    },
    {
      active: path === `/profiles/${id}/all-posts` ? "active" : "",
      link: `/profiles/${id}/all-posts`,
      title: "All Posts",
      type: true,
    },
  ];

  return (
    <div className="post-tab-wrap">
      <ul>
        {ProfileRouteLinks.map(({ type, active, link, title }) => (
          <li className={active} key={title}>
            <Link href={link}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
