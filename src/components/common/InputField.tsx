"use client";
import { InputHTMLAttributes, useState } from "react";
import FormInputWrapper from "./FormInputWrapper";
import PasswordEye from "./PasswordEye";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  required?: boolean;
  id?: string;
  error?: string;
}

function InputField(props: IProps) {
  const { type, label, required = false, id } = props;
  const [isShow, setIsShow] = useState(false);

  return (
    <FormInputWrapper id={id} label={label} required={required}>
      <input
        {...props}
        type={isShow ? "text" : props.type}
        className="form-control"
        autoComplete={type === "password" ? "on" : "off"}
      />
      {type === "password" ? (
        <PasswordEye isShow={isShow} setIsShow={setIsShow} />
      ) : null}
      {props.error ? <p className="text-danger ms-3">{props.error}</p> : <></>}
    </FormInputWrapper>
  );
}

export default InputField;
