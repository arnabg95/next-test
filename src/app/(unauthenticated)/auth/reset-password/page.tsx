"use client";
import React from "react";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useFormState } from "react-dom";
import { TriggerSwal } from "@/components/swal";
import { ResetPasswordInitialState } from "@/constants/forms";
import { resetPasswordHandler } from "@/actions";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction] = useFormState(
    resetPasswordHandler,
    ResetPasswordInitialState
  );
  if (!token) redirect("/");

  if (state.success === false) {
    if (state.message === "form-verification-failed") {
      const error = Object.entries(state.errors).filter((e) => e[1] !== "");
      TriggerSwal("Error", `${error[0][1]}`, "error");
    } else if (state.message === "token-not-found") {
      TriggerSwal("Error", `${state.errors.token}`, "error");
    } else {
      TriggerSwal("Error", `${state.message}`, "error");
    }
  }

  if (state.success === true)
    TriggerSwal("Success", `${state.message}`, "success").then((e) => {
      if (e.isConfirmed) {
        router.push("/auth/signin");
      }
    });

  return (
    <div className="right-bar reset-page position-relative">
      <div className="login-details">
        <h1>Reset Password</h1>
        <p>Please enter your new password</p>
        <form action={formAction}>
          <input type="hidden" value={token!} name="token" />
          <InputField
            type="password"
            placeholder="Password@123"
            label="Password"
            name="pass"
          />
          <InputField
            type="password"
            placeholder="************"
            label="Confirm Password"
            name="conf"
          />
          <p>Resetting your password will log you out on all devices.</p>
          <Button type="submit" title=" Reset Password" />
        </form>
      </div>
    </div>
  );
}
