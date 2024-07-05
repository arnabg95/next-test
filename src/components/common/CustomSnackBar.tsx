import React, { Dispatch, SetStateAction } from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";

type IProps = {
  setShow: Dispatch<SetStateAction<string>>;
  msg: string;
};

export default function CustomSnackBar({ setShow, msg }: IProps) {
  const handleClose = () => {
    setShow("");
  };

  return (
    <div>
      <Snackbar
        open={msg ? true : false}
        onClose={handleClose}
        TransitionComponent={Fade}
        message={msg}
        key={msg}
        autoHideDuration={1200}
      />
    </div>
  );
}
