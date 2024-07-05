"use client";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEllipsis,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CustomSnackBar from "./CustomSnackBar";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { fetchApi } from "@/http";
import { DELETE_COMMENT_URL } from "@/constants/urls";
import { mutate } from "swr";
import { TriggerSwal } from "../swal";
import CustomModal from "./CustomModal";

type IProps = {
  id: string;
  mutateCommentsUrl: string;
  pageUrl: string;
  isCurrentUser: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
  setDeletedComment: Dispatch<SetStateAction<string>>;
};

export default function CommentActions({
  id,
  mutateCommentsUrl,
  pageUrl,
  isCurrentUser,
  setEditable,
  setDeletedComment,
}: IProps) {
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showDel, setshowDel] = useState<boolean>(false);

  const deleteComment = async () => {
    try {
      const res = await fetchApi(`${DELETE_COMMENT_URL}/${id}`, {
        method: "DELETE",
      });
      setDeletedComment(id);
      mutate(pageUrl);
      mutate(mutateCommentsUrl);
      setShowSnackbar(res.message);
    } catch (e: any) {
      setShowSnackbar(e.message);
    }
    setShow(false);
  };

  const handleActions = async (key: "delete" | "edit" | "report") => {
    switch (key) {
      case "edit": {
        setShow(false);
        setEditable(true);
        break;
      }
      case "delete": {
        setShow(false);
        setshowDel(true);
        break;
      }
      default:
        break;
    }
  };

  const actionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionRef]);

  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsis}
        className="fs-5 me-2 mt-2"
        onClick={() => setShow((prev) => !prev)}
        style={{ cursor: "pointer" }}
      />
      <div className="threedots-wrap" ref={actionRef}>
        {show ? (
          <Box className="threedots-list w-10">
            {isCurrentUser ? (
              <ul>
                <li
                  onClick={() => handleActions("edit")}
                  className="my-1"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </li>
              </ul>
            ) : null}
            {isCurrentUser ? (
              <ul>
                <li
                  onClick={() => handleActions("delete")}
                  className="my-1 red-text"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Delete
                </li>
              </ul>
            ) : null}
          </Box>
        ) : null}
      </div>
      <CustomModal
        closeBtnText="Cancel"
        type=""
        show={showDel}
        updateFn={deleteComment}
        updateBtnText="Delete"
        handleClose={() => setshowDel(false)}
        body="Deleting this post will remove it from the platform permanently."
        title="Are you sure you want to proceed?"
        image="/assets/images/delete.png"
      />
      <CustomSnackBar msg={showSnackBar} setShow={setShowSnackbar} />
    </>
  );
}
