import Header from "@/components/common/Header";
import PageMenu from "@/components/common/PageMenu";
import { IChildren } from "@/interfaces";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib";
import CustomLoader from "@/components/Loader/CustomLoader";

const LayoutAfterSignIn = async ({ children }: IChildren) => {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <>
      <Header />
      <div className="main-body full-col">
        <div className="container">
          <div className={`row pages-row`}>
            <div className="col-lg-2">
              <PageMenu />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAfterSignIn;
