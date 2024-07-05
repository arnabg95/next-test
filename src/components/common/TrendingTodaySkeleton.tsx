import { Skeleton } from "@mui/material";
import React from "react";

const TrendingTodaySkeleton = () => {
  return (
    <div className="search-trending-list">
      <div className="search-trinding-img">
        <Skeleton variant="rectangular" width={100} height={100} />
      </div>
      <div className="search-trinding-content">
        <h4>
          <Skeleton variant="rectangular" width={300} height={10} />
        </h4>
        <p>
          <Skeleton
            variant="rectangular"
            width={340}
            height={10}
            sx={{ mb: 1 }}
          />
        </p>
        <div className="tranding-profile">
          <Skeleton variant="circular" width={26} height={26} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width={100} height={10} />
        </div>
      </div>
    </div>
  );
};

export default TrendingTodaySkeleton;
