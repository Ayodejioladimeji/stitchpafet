import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import ReviewCard from "@/common/ReviewCard";

const Tabs = ({ productdescription }) => {
  const links = [
    {
      title: "Description",
      link: "description",
      content: productdescription,
    },
    {
      title: `Reviews (10)`,
      link: "reviews",
      // content: "Review not available",
      content: <ReviewCard />,
    },
  ];

  const [activetab, setActivetab] = useState(links[0].link);
  const { alert } = useSelector((state: any) => state);

  const linksrow = links?.map((link, index) => {
    return (
      <div
        key={index}
        onClick={() => setActivetab(link.link)}
        className={`${activetab === link.link ? "activelink" : ""} link`}
      >
        {link.title}
      </div>
    );
  });

  const tabsroute = links?.map((content, index) => {
    if (activetab === content.link) {
      return (
        <div className={`tabs`} key={index}>
          <div
            className={`${content.link === activetab ? "tab-enter-done" : ""
              } tab`}
          >
            <div className="tabcont">
              {alert.loading ? (
                <div className="detail-loading">
                  <Loading width="25px" height="25px" color="#fff" />
                </div>
              ) : (
                content.content
              )}
            </div>
          </div>
        </div>
      );
    }
    return "";
  });

  return (
    <div className="sidetabs">
      <div className="tablinks">{linksrow}</div>
      <div className="tabsroute">{tabsroute}</div>
    </div>
  );
};
export default Tabs;
