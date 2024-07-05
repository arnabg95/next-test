import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PreviousArrow() {
  return (
    <div className="previous-arrow">
      <Link href="/">
        <Image
          src="/assets/images/back-arrow.svg"
          alt=""
          width={100}
          height={100}
        />
        <p>Back</p>
      </Link>
    </div>
  );
}
