import React, { useRef, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { uploadFile } from "@/http/helper";
import { TriggerSwal } from "../swal";

interface IProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const ImageUploader = ({ image, setImage }: IProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleDrop = (event: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const allowedExt = ["png", "jpg", "jpeg"];

  const handleFileSelect = async (file: any) => {
    console.log(file.name.split(".")[1]);
    if (!allowedExt.includes(file.name.split(".")[1])) {
      TriggerSwal(
        "Error",
        "Only jpg, jpeg and png images are allowed",
        "error"
      );
    } else if (file.size / (1024 * 1024) > 10) {
      TriggerSwal("Error", "Please upload images upto 10mb", "error");
    } else {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await uploadFile(formdata);
      setImage(res.url);
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef && fileInputRef?.current) fileInputRef?.current.click();
  };

  return (
    <>
      {loading ? (
        <div className="imageUpload gifup">
          <Image
            alt="loader"
            width={120}
            height={120}
            src="/assets/images/spinner.gif"
          />
        </div>
      ) : (
        <>
          <div
            className="imageUpload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleImageClick}
          >
            {image ? (
              <Image
                alt="post banner image"
                width={1920}
                height={1080}
                src={image}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            ) : (
              <h5>Drag & Drop or Click to Select Image</h5>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileSelect(e.target.files![0])}
            accept="image/png, image/jpeg, image/jpg"
          />
        </>
      )}
    </>
  );
};

export default ImageUploader;
