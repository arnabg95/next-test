"use client";
import React from "react";
import PreviousArrow from "@/components/common/PreviousArrow";
import Button from "@/components/common/Button";
import Link from "next/link";
import InputField from "@/components/common/InputField";
import { useFormState } from "react-dom";
import { ForgotPasswordInitialState } from "@/constants/forms";
import { forgotPasswordHandler } from "@/actions";
import { TriggerSwal } from "@/components/swal";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter();
  const [state, formAction] = useFormState(
    forgotPasswordHandler,
    ForgotPasswordInitialState
  );

  // mojiai@yopmail.com
  if (state.success === false) {
    if (state.message === "form-verification-failed") {
      const error = Object.entries(state.errors).filter((e) => e[1] !== "");
      TriggerSwal("Error", `${error[0][1]}`, "error");
    } else TriggerSwal("Error", `${state.message}`, "error");
  }

  if (state.success === true) {
    TriggerSwal("Success", `${state.message}`, "success");
    router.replace("/auth/signin");
  }

  return (
    <div className="right-bar forget-page position-relative">
      <div className="login-details">
        <h1>Forget Password?</h1>
        <p>
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </p>
        <form action={formAction}>
          <InputField
            type="email"
            placeholder="Email"
            label="Your Email"
            required
            name="email"
          />

          <div className="filter-box text-right">
            <Link href="/contact">Need Help?</Link>
          </div>

          <Button type="submit" title=" Reset Password" className="btn w-100" />
        </form>
      </div>
      <div className="for-desktop-arrow">
        {" "}
        <PreviousArrow />
      </div>
    </div>
  );
}
