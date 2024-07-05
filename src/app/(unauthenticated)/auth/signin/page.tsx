"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import PreviousArrow from "@/components/common/PreviousArrow";
import { SignInInputFields, SignInitialState } from "@/constants/forms";
import Link from "next/link";
import React, { useEffect } from "react";
import SocialLogin from "../_components/SocialLogin";
import { useFormState } from "react-dom";
import { signInHandler } from "@/actions";
import { useRouter } from "next/navigation";
import { TriggerSwal } from "@/components/swal";
import { useSession } from "@/components/providers/AuthSessionProvider";

const SignIn = () => {
  const [state, formAction] = useFormState(signInHandler, SignInitialState);
  const session = useSession();
  const router = useRouter();
  // const error = useSearchParams().get("error");

  useEffect(() => {
    if (session) return router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);


  if (!state?.success && state?.message !== "") {
    if (state?.message === "form-verification-failed") {
      const error = Object.entries(state?.errors).filter((e) => e[1] !== "");
      TriggerSwal("Error", `${error[0][1]}`, "error");
    } else TriggerSwal("Error", `${state?.message}`, "error");
  }

  if (state?.success) {
    if (state?.success) return router.replace("/");
  }

  return (
    <div className="right-bar signin-page position-relative">
      <div className="login-details">
        <h1>Sign In</h1>
        <p>Enter your data to sign in to your account.</p>
        <form action={formAction}>
          {SignInInputFields.map((input) => (
            <InputField
              key={input.label}
              type={input.type}
              placeholder={input.placeHolder}
              label={input.label}
              required={input.required}
              name={input.name}
            />
          ))}
          <div className="border-text position-relative">
            <p className="mb-0">or signed in with</p>
          </div>

          <SocialLogin />
          <div className="filter-box">
            {/* TEMPORARY HIDDEN */}
            {/* <div className="form-check">
              <input
                className="form-check-input best-suit-checkbox"
                type="checkbox"
                id="casual-date"
                name="check"
              />
              <label className="form-check-label">Keep me signed in</label>
            </div> */}
            {/* TEMPORARY HIDDEN */}
            <Link href="/auth/forget-password">Forget Password?</Link>
          </div>
          <Button type="submit" title="Sign In" className="btn w-100" />
        </form>
      </div>
      <div className="for-desktop-arrow">
        {" "}
        <PreviousArrow />
      </div>
    </div>
  );
};

export default SignIn;
