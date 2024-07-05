"use client";
import { IChildren } from "@/interfaces";
import React, { useEffect } from "react";
import CustomLoader from "../Loader/CustomLoader";
import { useRouter } from "next/navigation";

/**
 * @author Anirban Mishra
 * @description Here if status is authenticated then the useState hookis sending it to the home page but if in initial rendering for the authenticated status Sending a blank fragment to avoiding the layout visual
 */

const AuthProvider = ({ children }: IChildren) => {
  // const { status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/");
  //   }
  // }, [status, router]);

  // if (status === "loading") return <CustomLoader />;
  // if (status === "authenticated") return <></>;


  return <>{children}</>;
};

export default AuthProvider;
