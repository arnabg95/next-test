import { TriggerSwal } from "@/components/swal";
import { SOCIAL_AUTH_URL } from "@/constants/urls";
import { fetchApi } from "@/http";
import { socialLoginUser } from "@/lib";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Image from "next/image";
import React from "react";

const FacebookAuth = ({ checked = true }: { checked?: boolean }) => {
  return (
    <button type="button" className="facebook-button" disabled={!checked}>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID!}
        onSuccess={async (res) => {
          const { accessToken } = res;
          try {
            const response = await fetchApi(SOCIAL_AUTH_URL, {
              method: "POST",
              body: JSON.stringify({ type: "facebook", token: accessToken }),
              headers: { "Content-Type": "application/json" },
            });

            TriggerSwal("Success", "Logged in successfully", "success");
            await socialLoginUser(response.data);
            } catch (error: any) {
            TriggerSwal("Error", "Can not login", "success");
            console.log("error", error);
            return null;
          }
        }}
      >
        <Image
          src={"/assets/images/facebook.svg"}
          alt=""
          width={100}
          height={100}
        />
      </FacebookLogin>
    </button>
  );
};

export default FacebookAuth;
