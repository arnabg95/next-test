"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ThreeDots from "./ThreeDots";
import Button from "./Button";
import { timeAgo } from "../../helper/timeShow";
import useSWR, { mutate } from "swr";
import { getPostComments, handleLike } from "../../http/helper/index";
import { useSession } from "../providers/AuthSessionProvider";
import SafeHtmlComponent from "./SafeHtmlComponent";
import { fetchApi } from "@/http";
import { POST_COMMENT_URL } from "@/constants/urls";
import ShareButton from "./ShareButton";
import CustomSnackBar from "./CustomSnackBar";
import { TriggerSwal } from "../swal";
import SingleComment from "./SingleComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import CustomLoader from "../Loader/CustomLoader";
import useSettingsStore from "@/store/useAuthStore";

export default function PostCommon({ data, slug, mutateUrl }: any) {
  const session = useSession();
  const { blurMatured } = useSettingsStore();
  const [page, setPage] = useState<number>(1);
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const [commentBox, setCommentBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const [allComments, setAllComments] = useState<any[]>([]);
  const [deletedComment, setDeletedComment] = useState<string>(""); // #1
  const [isLikedByuser, setIsLikedByUser] = useState<boolean>(
    (data?.likedUsers as string[])?.includes(session?.user?.slug)
  );
  const [likeCount, setLikeCount] = useState<number>(data?.upvotesScore);

  const commentsUrl = `web/get-comments/${slug}?page=${page}&limit=10`;
  const {
    data: comments,
    mutate: mutateGetPostComments,
    isLoading,
  } = useSWR(commentsUrl, getPostComments);

  /** @description Mutating the url is not working for comments for that used states to manage this thing (#1)  */
  useEffect(() => {
    if (deletedComment) {
      setAllComments((prev) => prev.filter((e) => e._id !== deletedComment));
    }
  }, [deletedComment]);

  useEffect(() => {
    if (comments && comments.data) {
      setAllComments((prev) => {
        const commentIds = new Set(prev.map((comment) => comment._id));
        const newComments = comments.data.filter(
          (comment: any) => !commentIds.has(comment._id)
        );
        const combinedComments = [...prev, ...newComments];
        combinedComments.sort(
          (a, b) => a.timeSinceCreation - b.timeSinceCreation
        );
        return combinedComments;
      });
    }
  }, [comments]);

  const handleCommentSubmit = async (data: any) => {
    if (data) {
      try {
        const res = await fetchApi(POST_COMMENT_URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        setMessage("");
        mutateGetPostComments();
        mutate(mutateUrl);
        setShowSnackbar(res.message);
        return res.data;
      } catch (e: any) {
        setShowSnackbar(e.message);
      }
    } else {
      setShowSnackbar("Message shouldn't be empty");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyParam = urlParams.get("key");
    if (keyParam === "comment" && commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <>
      <div className="sigle-post white-bg-shw">
        <div className="post-img-w">
          <div className="post-card-top">
            <div className="post-img-name">
              <div className="post-profile position-relative">
                <Image
                  src={
                    data?.user?.profile_image
                      ? data?.user?.profile_image
                      : "/assets/images/default-user.png"
                  }
                  alt="user image"
                  width={1920}
                  height={1080}
                />
              </div>
              <h5>{data?.user?.name ?? "Anonymous"}</h5>
              <div className="post-time">
                {" "}
                {timeAgo(data?.timeSinceCreation)}{" "}
              </div>
            </div>

            {session &&
            session?.user &&
            session?.user?.slug === data?.user?.slug ? (
              <ThreeDots slug={slug} />
            ) : null}
          </div>
          {data?.image && data?.image !== "" ? (
            <div className="post-main-image">
              <Image
                src={data?.image}
                alt="post banner"
                width={1920}
                height={1080}
                style={{
                  filter: data.isMatured
                    ? blurMatured === data.isMatured
                      ? "blur(50px)"
                      : ""
                    : "",
                }}
              />
            </div>
          ) : null}

          {data?.tags?.map((tag: string) => {
            return (
              <div className="sales-tag mx-1" key={tag}>
                <Link href={`/feeds?tag=${tag.split("#")[1]}`}>{tag}</Link>
              </div>
            );
          })}

          <h4>{data?.title}</h4>

          <div className="post-content">
            <SafeHtmlComponent htmlContent={data?.body} />
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
                    await handleLike(data?.slug);
                    mutate(mutateUrl);
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
                {" "}
                <p className="position-relative">
                  {" "}
                  <Image
                    src="/assets/images/chat.png"
                    alt="like.png"
                    width={50}
                    height={50}
                  />{" "}
                </p>{" "}
                Comment{" "}
                {data?.commentsScore > 0 ? `(${data?.commentsScore})` : ""}
              </li>
            </ul>
            <div className="share-round position-relative">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowShareModal((prev) => !prev);
                }}
              >
                <Image
                  src="/assets/images/share.png"
                  alt="like.png"
                  width={50}
                  height={50}
                />
                <ShareButton slug={data?.slug} show={showShareModal} />
              </span>
            </div>
          </div>
        </div>

        <div className="comment-show" ref={commentSectionRef}>
          {!commentBox ? (
            <button
              className="button"
              onClick={() => {
                if (!session) {
                  TriggerSwal(
                    "Warning",
                    "Please Sign up to comment on post",
                    "info"
                  );
                } else {
                  setCommentBox((prev) => !prev);
                }
              }}
            >
              <Image
                src="/assets/images/+.png"
                alt="icon"
                width={30}
                height={30}
              />
              Add Comment
            </button>
          ) : null}

          {commentBox ? (
            <form action={""}>
              <textarea
                name=""
                id=""
                className="form-control"
                placeholder="Enter your comment"
                value={message}
                style={{ minHeight: "250px" }}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="comment-button-wrap mt-3">
                <Button
                  type="button"
                  className="button"
                  title="Cancel"
                  onclick={() => setCommentBox((prev) => !prev)}
                />
                <Button
                  type="button"
                  className="btn"
                  title="Comment"
                  onclick={async () =>
                    await handleCommentSubmit({ message, slug })
                  }
                />
              </div>
            </form>
          ) : null}
          {isLoading ? (
            <CustomLoader />
          ) : (
            <div className="comment-list-wraper">
              {allComments.length > 0 ? (
                allComments.map((value: any) => {
                  return (
                    <SingleComment
                      setDeletedComment={setDeletedComment} // #1
                      value={value}
                      key={value._id}
                      userSlug={session?.user?.slug}
                      mutateUrl={commentsUrl}
                      pageUrl={mutateUrl}
                    />
                  );
                })
              ) : (
                <h6 className="text-center">No Comments</h6>
              )}
            </div>
          )}

          {comments?.pagination?.page < comments?.pagination?.totalPages ? (
            <Button
              type="button"
              className="btn"
              title="View More Comments"
              onclick={() => setPage((prev) => prev + 1)}
            />
          ) : null}
        </div>
      </div>
      <CustomSnackBar msg={showSnackBar} setShow={setShowSnackbar} />
    </>
  );
}
