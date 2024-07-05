import PreviousArrow from "@/components/common/PreviousArrow";
import React from "react";
import VerificationText from "./_components/VerificationText";
import OtpTimer from "./_components/OtpTimer";
import Image from "next/image";

const PasswordResetEmail = () => {
  return (
    <div className="right-bar forget-page position-relative">
  
      <div className="login-details">
        <h1>Check Your Inbox</h1>
        <VerificationText />
        <div className="img-wraper">
          <Image
            src="/assets/images/image1.png"
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div className="resend-text text-center">
          <p className="mb-0">
            <OtpTimer />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetEmail;
