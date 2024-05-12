import React from "react";
import Loading from "../alert/Loading";

const LoadMore = ({ load, showItems }) => {
  return (
    <div className="loadmore">
      <button onClick={showItems}>
        {load ? (
          <Loading width="20px" height="20px" color="#fff" />
        ) : (
          "Load more"
        )}
      </button>
    </div>
  );
};

export default LoadMore;
