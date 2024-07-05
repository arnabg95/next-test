"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "../providers/AuthSessionProvider";
import { MANAGE_FOLLOWING_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import { CustomRevalidateTag } from "@/actions";
import ProfileFollowButton from "./ProfileFollowButton";
import { mutate } from "swr";

export default function ProfileBanner({
  name,
  email,
  img,
  publicProfile = false,
  id,
}: {
  name: string;
  email: string;
  img: string;
  publicProfile?: boolean;
  id?: string;
}) {
  const session = useSession();

  return (
    <div className="my-profile-details">
      <div className="profile-banner position-relative">
        <div className="profile-banner-img position-relative">
          <Image src="/assets/images/profile-banner.png" fill alt="feed" />
        </div>
        <div className="profile-flex position-relative z-1">
          <div className="profile-page-left">
            <div className="profile-page-profile">
              <Image
                src={img || "/assets/images/default-user.png"}
                alt="profile-image"
                width={170}
                height={170}
              />
            </div>
            <div className="profile-page-profile-content">
              <h4>{name}</h4>
              {/* <p>{email}</p> */}
            </div>
          </div>
          <div className="profile-page-right">
            {!publicProfile ? (
              <Link href="/profile/edit" className="btn">
                Edit
              </Link>
            ) : session ? (
              <ProfileFollowButton id={String(id)} />
            ) : (
              <button className="btn" disabled={true}>
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
