import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./../../common/Loading";

const Tabs = ({ productdescription }) => {
  const links = [
    {
      title: "Description",
      link: "description",
      content: productdescription,
    },
    {
      title: "Delivery Fee",
      link: "delivery",
      content: "Delivery Fee",
    },
    {
      title: `Reviews (0)`,
      link: "reviews",
      content: "Review not available",
      //   content: <Reviewsystem product={product} />,
    },
  ];

  const [activetab, setActivetab] = useState(links[0].link);
  const { alert } = useSelector((state) => state);

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
            className={`${
              content.link === activetab ? "tab-enter-done" : ""
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
