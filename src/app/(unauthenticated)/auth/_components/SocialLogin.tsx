"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuth from "./GoogleAuth";
import FacebookAuth from "./FacebookAuth";

const SocialLogin = ({ checked = true }: { checked?: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <ul className="social-link">
      <li>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID!}>
          <GoogleAuth checked={checked} />
        </GoogleOAuthProvider>
      </li>
      <li>
        <FacebookAuth checked={checked} />
      </li>
      <li>
        <a href="/">
          <Image
            src={"/assets/images/apple.svg"}
            alt=""
            width={100}
            height={100}
          />
        </a>
      </li>
    </ul>
  );
};

export default SocialLogin;
