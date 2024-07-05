import { CustomRevalidateTag } from "@/actions";
import {
  CHECK_PROFILE_FOLLOWING_URL,
  MANAGE_FOLLOWING_URL,
} from "@/constants/urls";
import { fetchApi } from "@/http";
import React from "react";
import useSWR from "swr";
import Image from "next/image";

const fetchProfileFollowing = async (id: string) => {
  const response = await fetchApi(`${CHECK_PROFILE_FOLLOWING_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

type IProps = {
  id: string;
};

const handleFollow = async (id: string) => {
  try {
    await fetchApi(MANAGE_FOLLOWING_URL, {
      method: "POST",
      body: JSON.stringify({ following: id }),
      headers: { "Content-Type": "application/json" },
    });
    CustomRevalidateTag("profile-banner");
  } catch (error) {
    console.log(error);
  }
};

const ProfileFollowButton = ({ id }: IProps) => {
  const { data, mutate, isValidating } = useSWR(id, fetchProfileFollowing);

  return (
    <button
      className="btn"
      onClick={async () => {
        await handleFollow(id);
        mutate();
      }}
    >
      {isValidating ? (
        <Image src="/assets/images/loader.gif" alt="" width={40} height={40} />
      ) : data?.isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
};

export default ProfileFollowButton;
