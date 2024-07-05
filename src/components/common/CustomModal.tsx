"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CustomModal({
  show,
  handleClose,
  title,
  body,
  closeBtnText,
  updateBtnText,
  updateFn,
  type,
  image = "",
}: {
  updateFn: () => Promise<void>;
  closeBtnText: string;
  image?: string;
  updateBtnText: string;
  title: string;
  body: string;
  show: boolean;
  handleClose: any;
  type: string;
}) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Modal className={`deletemodal  ${type=="logout"? "logoutmodal":''}`}  show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
        {image ? (
          <div className="modal-img-wrap">
            <Image width={40} height={40} alt="delete" src={image} />
          </div>
        ) : null}
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          className="cancle-btn"
          variant="secondary"
          onClick={handleClose}
        >
          {closeBtnText}
        </Button>
        <Button
          className="delete-btn"
          variant="primary"
          onClick={() => {
            handleClose();
            updateFn();
          }}
        >
          {updateBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
