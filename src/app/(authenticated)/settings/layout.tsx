"use client";
import { ReactNode, Suspense } from "react";
import SettingWrapper from "./_components/SettingWrapper";
import CustomLoader from "@/components/Loader/CustomLoader";

export default function Setting({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<CustomLoader />}>
      <SettingWrapper>{children}</SettingWrapper>
    </Suspense>
  );
}
