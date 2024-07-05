import { timeAgo } from "@/helper/timeShow";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "../providers/AuthSessionProvider";
import { getRawCharsFromHtml } from "@/helper/decodeHtml";

export default function SliderItem({ value, blurMatured, postInNewTab }: any) {
  const session = useSession();
  const heading = value.heading;
  const desc = getRawCharsFromHtml(value?.desc);
  return (
    <div className="slider-box" key={value.id}>
      <div className="slider-img">
        <Image
          style={{ filter: blurMatured ? "blur(50px)" : "" }}
          src={
            value.image
              ? value.image
              : "https://thavamedu.org/not-image-available.png"
          }
          alt=""
          width={1920}
          height={1080}
        />
      </div>
      <div className="slider-content">
        <Link
          href={`/feeds/${value.link}`}
          target={postInNewTab ? "_blank" : ""}
        >
          <h3>
            {heading.length > 28 ? heading.substring(0, 28) + "..." : heading}
          </h3>
        </Link>
        <div> {desc.length > 35 ? desc.substring(0, 35) + "..." : desc}</div>
       
        <Link
          href={
            value.user
              ? session && session.user.slug === value.user.link
                ? "/profile"
                : `profiles/${value.user.link}`
              : "#"
          }
        >
          <div className="post-img-name mt-3">
          <div className="d-flex post-img-name-flex align-items-center">
            <div className="post-profile position-relative">           
              <Image
                src={
                  value.user &&
                  value.user.profilePic &&
                  value.user.profilePic !== ""
                    ? value.user.profilePic
                    : "/assets/images/default-user.png"
                }
                alt="profile-image"
                width={1920}
                height={1080}
              />
            </div>
            <h5>
              {value.user && value.user.name ? value.user.name : "Anonymous"}
            </h5>
            </div>
            <div className="post-time">{timeAgo(value.postTime)}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
