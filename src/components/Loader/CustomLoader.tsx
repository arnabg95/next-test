import Image from "next/image";
import React from "react";

const CustomLoader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Image src="/assets/images/loader.gif" alt="" width={100} height={100} />
    </div>
  );
};

export default CustomLoader;
