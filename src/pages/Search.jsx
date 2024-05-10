import React from "react";
import Layout from "../common/Layout";
import DisplaySearch from "./../components/displaysearch/DisplaySearch";
import SEO from "./../common/SEO";

const Search = () => {
  return (
    <Layout>
      {/* <SEO title="Search" /> */}
      <DisplaySearch />
    </Layout>
  );
};

export default Search;
