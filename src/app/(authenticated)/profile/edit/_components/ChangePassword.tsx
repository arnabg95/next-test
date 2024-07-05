import { changeProfilePasswordHandler } from "@/actions";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { TriggerSwal } from "@/components/swal";
import { changeProfilePassInitialState } from "@/constants/forms";
import React from "react";
import { useFormState } from "react-dom";

type IProps = {
  token: string;
};

const ChangePassword = ({ token }: IProps) => {
  const [state, formAction] = useFormState(
    changeProfilePasswordHandler,
    changeProfilePassInitialState
  );

  if (state.success === false) {
    if (state.message === "form-verification-failed") {
      const error = Object.entries(state.errors).filter((e) => e[1] !== "");
      TriggerSwal("Error", `${error[0][1]}`, "error");
    } else {
      TriggerSwal("Error", `${state.message}`, "error");
    }
  }

  if (state.success === true)
    TriggerSwal("Success", `${state.message}`, "success");

  return (
    <div className="edit-profile-part">
      <h3>Change Password</h3>

      <div className="white-bg-shw">
        <form action={formAction}>
          <input type="hidden" value={token!} name="token" />
          <InputField
            type="password"
            placeholder="Password@123"
            label="Old Password"
            required
            name="oldpass"
          />
          <InputField
            type="password"
            placeholder="************"
            label="New Password"
            required
            name="pass"
          />
          <InputField
            type="password"
            placeholder="************"
            label="Confirm Password"
            required
            name="conf"
          />
          <div className="edit-button-wrap">
            {/* <Button type="button" title="Cancel" className="button" /> */}
            <Button type="submit" title="Change Password" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
