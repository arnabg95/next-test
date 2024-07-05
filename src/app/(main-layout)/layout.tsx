import Header from "@/components/common/Header";
import PageMenu from "@/components/common/PageMenu";
import CustomLoader from "@/components/Loader/CustomLoader";
import { IChildren } from "@/interfaces";
import React, { Suspense } from "react";

const MainLayout = ({ children }: IChildren) => {
  return (
    <>
      <Header />
      <div className="main-body content-page">
        <div className="container">
          <div className="row pages-row">
            <div className="col-lg-2">
              <PageMenu />
            </div>
            <Suspense fallback={<CustomLoader />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
