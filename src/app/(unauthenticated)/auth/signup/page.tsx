"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signUpHandler } from "@/actions";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import PreviousArrow from "@/components/common/PreviousArrow";
import {
  RegistrationInputFields,
  SignupPageInitialState,
} from "@/constants/forms";
import { useFormState } from "react-dom";
import Swal from "sweetalert2";
import SocialLogin from "../_components/SocialLogin";
import { useRouter } from "next/navigation";
import { TriggerSwal } from "@/components/swal";
import UserAgreement from "./_components/UserAgreement";
import RegisterButton from "./_components/RegisterButton";

/**
 * @author Anirban Mishra
 * @description Here in this component we're using useFormState for serverside form validation using server actions and form submission too in case of succes false there are 2 possible cases one is for form validation another one is for failed api response in case of form validation success failure we're sending a key named as "form-verification-failed" to trigger the swal and otherwise the failed response swal will be triggered
 */
const RegisterPage = () => {
  const router = useRouter();
  const [checked, setShecked] = useState<boolean>(false);
  const [state, formAction] = useFormState(
    signUpHandler,
    SignupPageInitialState
  );

  if (state.success === false) {
    if (state.message === "form-verification-failed") {
      const error = Object.entries(state.errors).filter((e) => e[1] !== "");
      TriggerSwal("Error", error[0][1], "error");
    } else TriggerSwal("Error", state.message, "error");
  }

  if (state.success) {
    TriggerSwal("Success", state.message, "success")
    router.replace(
      `/auth/email-verification?key=signup&email=${state.fields.email}`
    );
  }

  return (
    <>
      <div className="right-bar position-relative">
        <div className="login-details">
          <h1>Sign Up</h1>
          <p>Enter your data to create an account.</p>
          <form action={formAction}>
            {RegistrationInputFields.map((input) => (
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
              <p className="mb-0">or create an account with </p>
            </div>

            <SocialLogin checked={checked} />
            <UserAgreement checked={checked} setChecked={setShecked} />
            <RegisterButton checked={checked} />
          </form>
        </div>
        <div className="for-desktop-arrow">
          <PreviousArrow />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
