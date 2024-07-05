"use client";
import React from "react";

interface Props {
  title: string;
  type: "submit" | "button";
  className?: string;
  onclick?: () => void;
}

export default function Button(props: Props) {
  const { title, type, className = "btn", onclick = () => {} } = props;
  return (
    <button type={type} className={className} onClick={onclick}>
      {title}
    </button>
  );
}
