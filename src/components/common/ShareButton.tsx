"use client";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CustomSnackBar from "./CustomSnackBar";

type IProps = {
  slug: string;
  show: boolean;
};

export default function ShareButton({ slug, show }: IProps) {
  const [showSnackBar, setShowSnackbar] = useState<string>("");
  const handleShare = async () => {
    navigator.clipboard
      .writeText(`${window.location.host}/feeds/${slug}`)
      .then(() => {
        setShowSnackbar("Copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <>
      <div className="threedots-wrap">
        {show && (
          <Box className="threedots-list w-10">
            <ul>
              <li onClick={handleShare}>
                <FontAwesomeIcon icon={faCopy} />
                Copy Link
              </li>
            </ul>
          </Box>
        )}
      </div>
      <CustomSnackBar msg={showSnackBar} setShow={setShowSnackbar} />
    </>
  );
}
