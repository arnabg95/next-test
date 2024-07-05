import { timeAgo } from "@/helper/timeShow";
import { handleCommentLike } from "@/http/helper";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TriggerSwal } from "../swal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import CommentActions from "./CommentButtons";
import { fetchApi } from "@/http";
import { UPDATE_COMMENT_URL } from "@/constants/urls";
import CustomSnackBar from "./CustomSnackBar";
import { TextField } from "@mui/material";
import { mutate } from "swr";
import Link from "next/link";

const SingleComment = ({
  value,
  userSlug,
  mutateUrl,
  pageUrl,
  setDeletedComment,
}: {
  value: any;
  userSlug: string;
  mutateUrl: string;
  pageUrl: string;
  setDeletedComment: Dispatch<SetStateAction<string>>;
}) => {
  const fixedLength = 230;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(
    String(value?.comment).length > fixedLength && !isExpanded
      ? value.comment.substr(0, fixedLength) + "..."
      : value?.comment
  );
  const [updatedComment, setUpdatedComment] = useState<string>(
    String(value?.comment) ?? ""
  );
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(value?.likeCount);
  const [isLikedByuser, setIsLikedByUser] = useState<boolean>(
    (value?.likedUsers as string[])?.includes(userSlug)
  );
  const [isEditable, setEditable] = useState<boolean>(false);

  const handleToggleComment = () => {
    setIsExpanded(!isExpanded);
    setComment(
      !isExpanded
        ? value?.comment
        : value?.comment.substr(0, fixedLength) + "..."
    );
  };

  const updateComment = async () => {
    try {
      const res = await fetchApi(`${UPDATE_COMMENT_URL}/${value?._id}`, {
        method: "PATCH",
        body: JSON.stringify({ comment: updatedComment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowSnackbar(res.message);
      setEditable(false);
      mutate(mutateUrl);
      setComment(updatedComment.substring(0, fixedLength));
      setUpdatedComment("");
    } catch (e: any) {
      setShowSnackbar(e.message);
    }
  };

  useEffect(() => {
    if (isEditable) setUpdatedComment(String(value?.comment) ?? "");
  }, [isEditable, value?.comment]);

  return (
    <>
      <div className="comment-list">
        <div className="comment-profile">
          <Link href={`/profiles/${value?.user?.slug}`}>
            <Image
              src={
                value?.user?.profile_image
                  ? value?.user?.profile_image
                  : "/assets/images/default-user.png"
              }
              alt="profile picture"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div className="comment-content">
          <div className="comment-heading">
            <Link href={`/profiles/${value?.user?.slug}`}>
              <h4>{value?.user?.name}</h4>
            </Link>
            <div className="post-time">
              {timeAgo(value?.timeSinceCreation ?? 0)}
            </div>
          </div>
          {isEditable ? (
            <div>
              <textarea
                name=""
                id=""
                className="form-control"
                placeholder="Enter your comment"
                value={updatedComment}
                style={{ minHeight: "250px" }}
                onChange={(e) => setUpdatedComment(e.target.value)}
              />
              <div className="mt-3 mb-3">
                <span
                  onClick={() => setEditable(false)}
                  className="ms-2 button"
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </span>
                <span
                  onClick={() => {
                    updateComment();
                  }}
                  className="ms-2 btn"
                  style={{ color: "#40a2e3", cursor: "pointer" }}
                >
                  Update
                </span>
              </div>
            </div>
          ) : (
            comment
          )}
          <ul>
            <li
              onClick={async () => {
                if (userSlug) {
                  if (isLikedByuser) setLikeCount((prev) => prev - 1);
                  else setLikeCount((prev) => prev + 1);

                  setIsLikedByUser((prev) => !prev);
                  await handleCommentLike(value?._id);
                } else {
                  TriggerSwal("Warning", "Please Sign up to like", "info");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="fs-5 me-2 mt-1"
                style={isLikedByuser ? { color: "#40A2E3" } : {}}
              />
              {likeCount}
            </li>
            <li>
              {value?.user?.slug === userSlug ? (
                <CommentActions
                  setDeletedComment={setDeletedComment}
                  id={value?._id}
                  mutateCommentsUrl={mutateUrl}
                  pageUrl={pageUrl}
                  isCurrentUser={true}
                  setEditable={setEditable}
                />
              ) : null}
              {String(value?.comment).length > fixedLength && (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleToggleComment}
                >
                  {isExpanded ? "Less" : "More"}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <CustomSnackBar msg={showSnackBar} setShow={setShowSnackbar} />
    </>
  );
};

export default SingleComment;
