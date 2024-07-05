"use client";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CustomModal from "@/components/common/CustomModal";
import { fetchApi } from "@/http";
import { mutate } from "swr";

export default function ThreeDots({ slug }: { slug: string }) {
  const [show, setShow] = useState(false);
  const [showDel, setshowDel] = useState(false);

  const handleClose = () => setshowDel(false);

  const handleDelete = async () => {
    setshowDel(true);
  };

  const deletePost = async () => {
    const res = await fetchApi(`web/delete-post/${slug}`, { method: "delete" });
    if (res) {
      mutate("/web/get-trending-stories");
      mutate("/web/get-hot-stories");
      mutate("web/get-popular-stories?page=1&limit=1");
      mutate("web/get-post-by-category?page=1&limit=1");
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
      <div className="threedots-wrap">
        <button onClick={() => setShow((prev) => !prev)}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        {show && (
          <Box className="threedots-list" ref={actionRef}>
            <ul>
              <li>
                <Link href={`/post/edit/${slug}`}>
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </Link>
              </li>
              <li
                className="red-text"
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                Delete
              </li>
            </ul>
          </Box>
        )}
      </div>
      <CustomModal
        closeBtnText="Cancel"
        type=""
        show={showDel}
        updateFn={deletePost}
        updateBtnText="Delete"
        handleClose={handleClose}
        body="Deleting this post will remove it from the platform permanently."
        title="Are you sure you want to proceed?"
        image="/assets/images/delete.png"
      />
    </>
  );
}
