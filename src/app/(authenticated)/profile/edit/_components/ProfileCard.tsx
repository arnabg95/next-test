import Button from "@/components/common/Button";
import { TriggerSwal } from "@/components/swal";
import { FILE_UPLOAD_LINK, PROFILE_UPDATE_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CustomRevalidateTag } from "@/actions";

type IProps = {
  name: string;
  email: string;
  image: string;
  token: string;
  handleProfileUpdate: () => {};
};

const allowedExt = ["png", "jpg", "jpeg"];

const ProfileCard = ({
  name,
  email,
  image,
  token,
  handleProfileUpdate,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setImage] = useState<string>(image);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileSizeInMB = e.target.files[0].size / (1024 * 1024);
      if (!allowedExt.includes(e.target.files[0].name.split(".")[1])) {
        TriggerSwal(
          "Error",
          "Only jpg, jpeg and png images are allowed",
          "error"
        );
      } else if (fileSizeInMB > 5) {
        TriggerSwal("Error", "Please upload images upto 5mb", "error");
      } else {
        let imgUrl = URL.createObjectURL(e.target.files[0]);
        setImage(imgUrl);

        const formdata = new FormData();
        formdata.append("file", e.target.files[0]);

        (async () => {
          try {
            const response = await fetchApi(FILE_UPLOAD_LINK, {
              method: "POST",
              body: formdata,
            });

            const r2 = await fetchApi(PROFILE_UPDATE_URL, {
              method: "PATCH",
              body: JSON.stringify({ profile_image: response.data.url }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            setImage(response.data.url);
            TriggerSwal(
              "Success",
              "Profile Picture Updated Successfully",
              "success"
            );
            handleProfileUpdate();
            CustomRevalidateTag("/profile");
          } catch (error: any) {
            console.log(error);
            TriggerSwal("Error", error.message, "error");
          }
        })();
      }
    }
  };

  return (
    <div className="profile-uploade-wrap text-center">
      <div className="profile-uploade-img">
        <Image
          src={!profileImage ? "/assets/images/default-user.png" : profileImage}
          alt="profile image"
          width={160}
          height={160}
          unoptimized
        />
      </div>
      <h3>{name || "Loading..."}</h3>
      <p>{email || "Loading..."}</p>
      <div className="file-wrapn position-relative">
        <Button
          type="button"
          title="Change Picture"
          className="button w-100"
          onclick={() => {
            inputRef?.current?.click();
          }}
        />
        <input
          type="file"
          className="button"
          ref={inputRef}
          onChange={onChangeImage}
          accept="image/png,image/jpeg,image/jpg"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
