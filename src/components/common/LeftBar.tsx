import Image from "next/image";
import Link from "next/link";
import LeftBarLinks from "./LeftBarLinks";
import PreviousArrow from "./PreviousArrow";
import React from "react";
import { usePathname } from "next/navigation";

function LeftBar() {
  return (
    <>
      <div className="leftbar">
        <div className="for-mobile-arrow">
          <PreviousArrow />
        </div>

        <div className="left-bar-wrap">
          <div className="left-bar-top">
            <div className="sidebar-logo">
              <Link href="#">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={220}
                  height={100}
                />
              </Link>
            </div>
            <div className="side-nav">
              <LeftBarLinks />
            </div>
          </div>
          <div className="left-bar-bottom">
            <div className="sidebar-heading">
              <p
                style={{
                  display: "block",
                  fontSize: "42px",
                  fontWeight: "bolder",
                  color: "#374151",
                }}
              >
                Join MOJI AI
              </p>{" "}
              <p
                style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Share, Inspire, Innovate!
              </p>
              <p>
                Discover how AI is transforming the way we work and connect with
                like-minded innovators.
              </p>
            </div>
            <div className="copyright">
              <p>© Moji AI 2024. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftBar;
