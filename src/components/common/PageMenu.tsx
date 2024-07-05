"use client";
import { getSett } from "@/http/helper";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import SafeHtmlComponent from "./SafeHtmlComponent";
import CatrgoryUl from "./CatrgoryUl";

export default function PageMenu() {
  const [block, setBlock] = useState(true);

  const pathname = usePathname();

  const { data, isLoading } = useSWR("web/copyright", getSett);

  const PageMenu1 = [
    {
      active: pathname === "/" ? "active" : "",
      title: "Home",
      link: "/",
      img: "/assets/images/home.png",
    },
    {
      active: pathname === "/feeds" ? "active" : "",
      title: "Feed",
      link: "/feeds",
      img: "/assets/images/feed.png",
    },
  ];

  const PageMenu2 = [
    {
      active: pathname === "/about" ? "active" : "",
      title: "About Moji AI",
      link: "/about",
      img: "/assets/images/about-icon.png",
    },
    {
      active: pathname === "/contact" ? "active" : "",
      title: "Contact Us",
      link: "/contact",
      img: "/assets/images/contact-us-icon.png",
    },
    {
      active: pathname === "/content-policy" ? "active" : "",
      title: "Content Policy",
      link: "/content-policy",
      img: "/assets/images/privacy-icon.png",
    },
    {
      active: pathname === "/user-agreement" ? "active" : "",
      title: "User Agreement",
      link: "/user-agreement",
      img: "/assets/images/user-agreement-icon.png",
    },
    {
      active: pathname === "/privacy-policy" ? "active" : "",
      title: "Privacy Policy",
      link: "/privacy-policy",
      img: "/assets/images/privacy-policy-icon.png",
    },
  ];

  return (
    <>
      <div className={block ? "icon-left" : "icon-left active"}>
        <button className="for-mobile-menu-button">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              setBlock((prev) => !prev);
            }}
          />
        </button>

        <div className="page-manu-wrap">
          <div className="sidebar-for-mobile">
            <ul className="pages-list">
              {PageMenu1.map(({ img, active, link, title }) => (
                <li className={active} key={title}>
                  <Link href={link} onClick={() => setBlock((prev) => !prev)}>
                    <div className="im-g ">
                      <Image src={img} alt={title} width={24} height={24} />
                    </div>
                    <span className="text-black">{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="sidecategory-wraper white-bg-shw">
              <h3 style={{ marginBottom: "35px" }}>Category</h3>
              <CatrgoryUl />
            </div>
            <div className="page-manu-resources">
              <div className="resources-heading">
                <h6>Resources</h6>
              </div>

              <ul>
                {PageMenu2.map(({ img, active, link, title }) => (
                  <li
                    className={active}
                    key={title}
                    onClick={() => setBlock((prev) => !prev)}
                  >
                    <div className="im-g">
                      <Image src={img} alt={title} width={24} height={24} />
                    </div>
                    <Link href={link}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="side-copyright">
              {isLoading ? (
                <li className="skeleton">
                  <p className="text-line" style={{ width: "100%" }}></p>
                </li>
              ) : (
                // <Markdown className="mb-0">{data?.copyright}</Markdown>
                <SafeHtmlComponent htmlContent={data?.copyright} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
