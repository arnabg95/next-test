"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { getTrendingTags } from "@/http/helper";
import { useRouter } from "next/navigation";
import SearchTrending from "./SearchTrending";

type IProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const SearchBox = ({ setShow }: IProps) => {
  const router = useRouter();
  const actionRef = useRef<HTMLDivElement>(null);
  const recentSearches = localStorage.getItem("recentSearches")
    ? JSON.parse(localStorage.getItem("recentSearches") as any)
    : [];

  const { data: trending, isLoading } = useSWR(
    "/web/get-trending-stories",
    getTrendingTags
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".form-control")
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionRef, setShow]);

  return (
    <>
      <Box className="search-popup-wrap">
        <div className="search-popup white-bg-shw" ref={actionRef}>
          {recentSearches.length > 0 ? (
            <div className="recent-post-wrap">
              <h3>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    cursor: "pointer",
                  }}
                  onClick={() => setShow(false)}
                >
                  <FontAwesomeIcon icon={faX} />
                </span>
                Recent Search
              </h3>
              <ul>
                {(recentSearches as string[])
                  .reverse()
                  .map((value: string, ind: number) => {
                    return (
                      <li
                        key={ind}
                        onClick={() => {
                          setShow(false);
                          router.push(`/search?search=${value}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            <></>
          )}
          <div className="trending-tags-wrap">
            <h3 className="mb-4">Trending Tags</h3>
            <ul>
              {isLoading ? (
                <>
                  <span className="li-skeleton mx-1"></span>
                  <span className="li-skeleton mx-1"></span>
                  <span className="li-skeleton mx-1"></span>
                  <span className="li-skeleton mx-1"></span>
                </>
              ) : (
                trending?.slice(0, 4).map(({ list }: { list: string }) => {
                  return (
                    <li
                      key={list}
                      onClick={() => {
                        setShow(false);
                        router.push(`/search?tag=${list.split("#")[1]}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{list}</p>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <SearchTrending setShow={setShow} />
        </div>
      </Box>
    </>
  );
};

export default SearchBox;
