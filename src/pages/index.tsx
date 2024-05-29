import React from "react";

// Components
import Hero from "../components/Hero";
import Securely from "../components/securely/Securely";
import Transaction from "../components/transaction/Transaction";
import BestOffer from "../components/bestoffer/BestOffer";
import BestSecurity from "../components/bestsecurity/BestSecurity";
import Layout from "./../common/Layout";
import Testimonial from "@/components/Testimonial";
import LatestCollection from "@/components/securely/LatestCollection";
import PopularCategory from "@/components/PopularCategory";

const Home = () => {
  return (
    <Layout>
      {/* <SEO title="Homepage" /> */}
      <Hero />
      <Securely />
      <Transaction />
      <PopularCategory />
      <BestOffer />
      <LatestCollection />
      <BestSecurity />
      <Testimonial />
    </Layout>
  );
};

export default Home;
