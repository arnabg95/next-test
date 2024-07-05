import Image from "next/image";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { TriggerSwal } from "@/components/swal";
import { fetchApi } from "@/http";
import { SOCIAL_AUTH_URL } from "@/constants/urls";
import { socialLoginUser } from "@/lib";

interface IUserProfile {
  email: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const GoogleAuth = ({ checked = true }: { checked?: boolean }) => {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { access_token } = codeResponse;
      try {
        const response = await fetchApi(SOCIAL_AUTH_URL, {
          method: "POST",
          body: JSON.stringify({ type: "google", token: access_token }),
          headers: { "Content-Type": "application/json" },
        });

        TriggerSwal("Success", "Logged in successfully", "success");
        await socialLoginUser(response.data);
      } catch (error: any) {
        console.log("error", error);
        return null;
      }
    },
    onError: (errorResponse) => {
      TriggerSwal("Error", errorResponse.error_description, "error");
    },
    scope:
      "email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/userinfo.profile",
  });
  return (
    <>
      <button type="button" onClick={() => login()} disabled={!checked}>
        <Image
          src={"/assets/images/google.svg"}
          alt=""
          width={100}
          height={100}
        />
      </button>
    </>
  );
};

export default GoogleAuth;
