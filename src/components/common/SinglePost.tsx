import Image from "next/image";
import React, { useState } from "react";
import { TriggerSwal } from "../swal";
import SafeHtmlComponent from "./SafeHtmlComponent";
import Link from "next/link";
import ThreeDots from "./ThreeDots";
import { timeAgo } from "@/helper/timeShow";
import { useSession } from "../providers/AuthSessionProvider";
import { mutate } from "swr";
import ShareButton from "./ShareButton";
import { handleLike } from "@/http/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import useSettingsStore from "@/store/useAuthStore";

type IProps = {
  item: any;
};

const SinglePost = ({ item: value }: IProps) => {
  const session = useSession();
  const { postInNewTab, blurMatured } = useSettingsStore();
  const [isLikedByuser, setIsLikedByUser] = useState<boolean>(
    (value?.likedUsers as string[])?.includes(session?.user?.slug)
  );
  const [likeCount, setLikeCount] = useState<number>(value?.totalUpvotes);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  return (
    <div className="post-img-w">
      <div className="post-card-top">
        <Link
          href={
            value?.user
              ? session && session.user.slug === value.user.link
                ? "/profile"
                : `/profiles/${value.user.link}`
              : "#"
          }
        >
          <div className="post-img-name">
            <div className="post-profile position-relative">
              <Image
                src={
                  value?.user &&
                  value.user.profilePic &&
                  value.user.profilePic !== ""
                    ? value.user.profilePic
                    : "/assets/images/default-user.png"
                }
                alt="profile-image"
                width={100}
                height={100}
              />
            </div>
            <h5>
              {value?.user && value.user.name ? value.user.name : "Anonymous"}
            </h5>
            <div className="post-time">{timeAgo(value?.postTime)}</div>
          </div>
        </Link>
        {value?.user && session && session?.user?.slug === value?.user?.link ? (
          <ThreeDots slug={value?.link} />
        ) : null}
      </div>
      {value?.image && value.image !== "" ? (
        <div className="post-main-image">
          <Image
            src={value.image!}
            alt="profile-image"
            width={500}
            height={500}
            style={{
              filter: value.isMatured
                ? blurMatured === value.isMatured
                  ? "blur(50px)"
                  : ""
                : "",
            }}
          />
        </div>
      ) : null}
      <div className="post-content">
        <Link
          href={`/feeds/${value?.link}`}
          target={postInNewTab ? "_blank" : ""}
        >
          <h4>{value?.heading}</h4>
        </Link>
        <h5>{value?.subHeading}</h5>
        <SafeHtmlComponent htmlContent={value?.desc} />
      </div>
      <div className="social-share">
        <ul>
          <li
            style={
              isLikedByuser
                ? {
                    cursor: "pointer",
                    backgroundColor: "#40A2E3",
                    color: "#fff",
                  }
                : { cursor: "pointer" }
            }
            onClick={async () => {
              if (session) {
                if (isLikedByuser) setLikeCount((prev) => prev - 1);
                else setLikeCount((prev) => prev + 1);

                setIsLikedByUser((prev) => !prev);
                await handleLike(value?.link);
                // mutate(value.mutateUrl); // ! Commented out while updating get-randomposts api
              } else {
                TriggerSwal("Warning", "Please Sign up to like post", "info");
              }
            }}
          >
            <p className="position-relative">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="fs-5 me-2 "
                style={isLikedByuser ? { color: "#ffffff" } : {}}
              />
            </p>
            Like {likeCount > 0 ? `(${likeCount})` : ""}
          </li>
          <li>
            <Link href={`/feeds/${value?.link}?key=comment`}>
              <p className="position-relative">
                <Image
                  src="/assets/images/chat.png"
                  alt="like.png"
                  width={100}
                  height={100}
                />
              </p>
              Comment{" "}
              {value?.totalComments > 0 ? `(${value?.totalComments})` : ""}
            </Link>
          </li>
        </ul>
        <div className="share-round position-relative">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowShareModal((prev) => !prev)}
          >
            <Image
              src="/assets/images/share.png"
              alt="like.png"
              width={100}
              height={100}
            />
            <ShareButton slug={value?.link} show={showShareModal} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
