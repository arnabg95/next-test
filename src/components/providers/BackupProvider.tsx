"use client";

import { IChildren } from "@/interfaces";
import React from "react";

const AuthSessionProvider = ({ children }: IChildren) => {
  return <>{children}</>;
};

export default AuthSessionProvider;
