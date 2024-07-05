import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type IProps = {
  type: "followers" | "following";
  id: string | number;
  image: string;
  name: string;
  subTitle: string;
  desc: string;
  followers: string;
  followings: string;
  posts: string;
  followId: string;
  slug: string;
  removeAction: any;
};

const FollowersCard = ({
  type,
  id,
  image,
  name,
  subTitle,
  desc,
  followers,
  followings,
  posts,
  followId,
  slug,
  removeAction,
}: IProps) => {
  return (
    <div className="col-lg-4 col-md-6" key={id}>
      <div className="followers-wrap">
        <div className="followers-image">
          <Image
            src={image ? image : "/assets/images/default-user.png"}
            alt="image"
            width={100}
            height={100}
          />
        </div>
        <h3>
          <Link href={`/profiles/${slug}`}>{name}</Link>
        </h3>
        <h5>{subTitle}</h5>
        <p>{desc}</p>
        <ul>
          <li>
            <h5>{followers}</h5>
            <p>Followers</p>
          </li>
          <li>
            <h5>{followings}</h5>
            <p>Following</p>
          </li>
          <li>
            <h5>{posts}</h5>
            <p>Total Post</p>
          </li>
        </ul>
        <Button
          type="button"
          title={type === "followers" ? "Remove" : "Following"}
          className="light-btn"
          onclick={() => removeAction(followId)}
        />
      </div>
    </div>
  );
};

export default FollowersCard;
