import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../assets/fav.png";

const SEO = ({ title }) => {
  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={`${title} | Verifibiz Africa`}
    >
      <meta name="image" content={favicon} />
      <meta
        name="description"
        content="We bridge the trust gap between transacting parties in Africa. With a major focus on social commerce, e-commerce, and real estate."
      />
      <link rel="shortcut icon" href={favicon} />
    </Helmet>
  );
};

export default SEO;
