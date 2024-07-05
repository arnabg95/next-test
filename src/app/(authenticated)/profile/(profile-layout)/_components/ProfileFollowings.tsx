import Image from "next/image";
import React from "react";
type IProps = {
  followers: string | number;
  followings: string | number;
  posts: string | number;
};

const ProfileFollowings = ({ followers, followings, posts }: IProps) => {
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="number-box">
          <div className="number-img position-relative">
            <Image src="/assets/images/icon1.png" alt="icon1.png" fill />
          </div>
          {/* <h4>{followData.followers}M+</h4> */}
          <h4>{followers}</h4>
          <h6>Number of Total Followers</h6>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="number-box">
          <div className="number-img position-relative">
            <Image src="/assets/images/follow.png" alt="icon1.png" fill />
          </div>
          {/* <h4>{followData.followings}k+</h4> */}
          <h4>{followings}</h4>
          <h6>Number of Total Followings</h6>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="number-box">
          <div className="number-img position-relative">
            <Image src="/assets/images/icon3.png" alt="icon1.png" fill />
          </div>
          {/* <h4>{followData.posts}k+</h4> */}
          <h4>{posts}</h4>
          <h6>Total Number of Post</h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileFollowings;
