import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  label: string;
  id?: string;
  required: boolean;
}

export default function FormInputWrapper({
  children,
  label,
  id,
  required,
}: IProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <div className="position-relative">{children}</div>
    </div>
  );
}
