"use client"
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "../helpers";
import { useSession } from "../providers/AuthSessionProvider";

export default function UserCard({user}:any) {
  const session = useSession()
  return (
    <div className="post-details-single white-bg-shw">
    <div className="d-flex align-items-center">
      <div className="small-img">
        <Image
          src={user?.profile_image ? user?.profile_image : "/assets/images/default-user.png"}
          alt="profile_image"
          width={1920}
          height={1080}
        />
      </div>
      <h3>{user?.name}</h3>
    </div>
    <p>
      {user?.bio}
    </p>
    <div className="show-more-wrap text-center">

    <Link href={ session && session.user.slug === user?.slug ? '/profile' : `/profiles/${user?.slug}`} className="light-btn">
      Show More
    </Link>
    </div>
    <ul>
      <li>
        <h4>{formatNumber(user?.followerCount)}</h4>
        <p>Followers</p>
      </li>
      <li>
        <h4>{formatNumber(user?.followingCount)}</h4>
        <p>Following</p>
      </li>
      <li>
        <h4>{formatNumber(user?.postCount)}</h4>
        <p>Total Post</p>
      </li>
    </ul>
  </div>
  )
}
