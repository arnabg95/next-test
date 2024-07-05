import { Box } from "@mui/material";
import React from "react";
import { post, searchTrending, tags } from "@/constants/temp_data";
import Image from "next/image";

const SearchModal = ({ show }: { show: boolean }) => {
  return (
    <>
      {show && (
        <Box className="search-popup-wrap" >
          <div className="search-popup white-bg-shw">
            <div className="recent-post-wrap">
              <h3>Recent Search</h3>
              <ul>
                {post.map((value) => {
                  return <li key={value.postList}>{value.postList}</li>;
                })}
              </ul>
            </div>
            <div className="trending-tags-wrap">
              <h3>Trending Tag</h3>
              <ul>
                {tags.map((value) => {
                  return (
                    <li key={value.tag}>
                      <p>{value.tag}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="search-trending">
              <h3>Trending Today </h3>
              <div className="search-trending-list-wrap">
                {searchTrending.map((value, index) => {
                  return (
                    <div className="search-trending-list" key={value.id}>
                      <div className="search-trinding-img">
                        <Image
                          src={value.image}
                          alt=""
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="search-trinding-content">
                        <h4>{value.heading}</h4>
                        <p>{value.desc}</p>
                        <div className="tranding-profile">
                          <Image
                            src={value.photo}
                            alt=""
                            width={26}
                            height={26}
                          />
                          <h5>{value.name}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
};

export default SearchModal;
