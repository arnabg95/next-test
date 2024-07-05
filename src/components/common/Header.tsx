"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationMenu from "./NotificationMenu";
import HeaderProfile from "./HeaderProfile";
import { useSession } from "../providers/AuthSessionProvider";
import SearchBox from "./SearchBox";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchUserProfileDetails } from "@/http/helper";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const storedRecentSearches = localStorage.getItem("recentSearches");
      return storedRecentSearches ? JSON.parse(storedRecentSearches) : [];
    }
    return [];
  });

  const { data: userData, isLoading } = useSWR(
    "profileData",
    fetchUserProfileDetails
  );

  const handleSearchClick = () => {
    setButton(!button);
    router.push(`/search?search=${searchString}`);
    if (searchString) {
      const updatedRecentSearches = [...recentSearches, searchString];
      if (updatedRecentSearches.length > 4) {
        updatedRecentSearches.shift();
      }

      setRecentSearches(updatedRecentSearches);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecentSearches)
      );
    }
    setSearchString("");
    setShow(false);
  };

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <>
      <div className="header-wraper">
        <div className="container">
          <div className="header-main">
            <div className="header-logo-wrap">
              <div className="logo position-relative">
                <Link href="/">
                  <Image
                    src="/assets/images/logo.png"
                    alt="home"
                    width={180}
                    height={180}
                  />
                </Link>
              </div>
            </div>
            <div className="header-middle">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchClick();
                }}
              >
                <div className="form-group">
                  <div className={button ? "search-b" : "search-b active"}>
                    <input
                      onClick={() => setShow((prev) => !prev)}
                      type="search"
                      className="form-control"
                      placeholder="Search on Moji AI"
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button type="submit">
                      <Image
                        src="/assets/images/icon_search.svg"
                        alt=""
                        width={28}
                        height={28}
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="header-right">
              {session ? (
                <div className="before-login">
                  <Link href="/post/create" className="button">
                    <Image
                      src="/assets/images/+.png"
                      alt="icon"
                      width={30}
                      height={30}
                      style={{ objectFit: "cover" }}
                    />
                    Create Post
                  </Link>
                  <NotificationMenu />
                  {isLoading ? (
                    <HeaderProfile name={""} email={""} img={""} />
                  ) : (
                    <HeaderProfile
                      name={userData?.name || ""}
                      email={userData?.email || ""}
                      img={userData?.profile_image || ""}
                    />
                  )}
                </div>
              ) : (
                <div className="before-sign">
                  <ul>
                    <li>
                      <Link href="/auth/signup" className="button">
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link href="/auth/signin" className="button">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {show ? <SearchBox setShow={setShow} /> : null}
    </>
  );
}
