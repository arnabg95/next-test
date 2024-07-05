"use client";
import Image from "next/image";
import {  useState } from "react";
import CatrgoryUl from "./CatrgoryUl";

export default function SideCategory() {
  const [none, setNone] = useState<boolean>(true);

  return (
    <div className={none ? "icon-right" : "icon-right active"}>
      <button className="for-mobile-categories-list">
        <Image
          src="/assets/images/categories.png"
          alt="categories"
          width={24}
          height={24}
          onClick={() => setNone(!none)}
        />
      </button>

      <div className="sidecategory-wraper white-bg-shw">
        <h3 style={{marginBottom:"35px"}}>Category</h3>
          <CatrgoryUl />
      </div>
    </div>
  );
}
