import React from "react";

// Components
import Hero from "./../components/hero/Hero";
import Securely from "../components/securely/Securely";
import Transaction from "../components/transaction/Transaction";
import BestOffer from "../components/bestoffer/BestOffer";
import BestSecurity from "../components/bestsecurity/BestSecurity";
import Layout from "./../common/Layout";
import Testimonial from "@/components/testimonial/Testimonial";

const Home = () => {
  return (
    <Layout>
      {/* <SEO title="Homepage" /> */}
      <Hero />
      <Securely />
      <Transaction />
      <BestOffer />
      <BestSecurity />
      <Testimonial />
    </Layout>
  );
};

export default Home;
