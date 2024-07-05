"use client";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";

const VerificationText = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const email = searchParams.get("email");
  const isSpecificKey = [key].some((e) => e === "password" || e === "signup");
  if (!key || !isSpecificKey || !email) redirect("/auth/signin");

  return (
    <p>
      An email with a link to
      {key === "password" ? " reset your password " : " verify your account "}
      was sent to the email address associated with your account.
    </p>
  );
};

export default VerificationText;
