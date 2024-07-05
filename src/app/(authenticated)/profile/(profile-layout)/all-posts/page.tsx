"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import ProfilePOstsWithSearch from "@/components/common/ProfilePOstsWithSearch";

const AllPostsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <div id="tab-post" className="tab-post common-tab-style">
      <div className="profile-search-wrap">
        <h2>Posts</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search on Moji AI"
              value={search}
              onChange={handleChange}
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
        </form>
      </div>
      <ProfilePOstsWithSearch search={debouncedSearch} />
    </div>
  );
};

export default AllPostsPage;
