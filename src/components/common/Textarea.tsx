import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea(props: IProps) {
  const { label } = props;

  return (
    <>
      <div className="form-group">
        <label htmlFor="">{label}</label>
        <textarea {...props} className="form-control" />
        {props.error ? (
          <p className="text-danger ms-3">{props.error}</p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
