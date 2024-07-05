import React from "react";
import ProfileFollowings from "@/app/(authenticated)/profile/(profile-layout)/_components/ProfileFollowings";
import { formatNumber } from "../helpers";

type IProps = {
  bio: string;
  followers: number;
  followings: number;
  posts: number;
};
const AboutComponent = ({ bio, followers, followings, posts }: IProps) => {
  return (
    <div id="tab-about" className="tab-about common-tab-style">
      <div className="profile-search-wrap">
        <h2>About</h2>
      </div>

      <div className="get-me white-bg-shw">
        <p>{bio ? bio : "Bio Is Not Added Yet"}</p>
      </div>
      <div className="by-number white-bg-shw">
        <h4>By the Numbers</h4>
        <p>
          Every day, millions of people around the world post, like, and comment
          in communities organized around their interests.
        </p>
        <ProfileFollowings
          followers={formatNumber(followers)}
          followings={formatNumber(followings)}
          posts={formatNumber(posts)}
        />
      </div>
    </div>
  );
};

export default AboutComponent;
