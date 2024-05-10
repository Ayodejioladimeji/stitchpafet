import React from "react";

// Components
import Hero from "./../components/hero/Hero";
import Securely from "../components/securely/Securely";
import Transaction from "../components/transaction/Transaction";
import BestOffer from "../components/bestoffer/BestOffer";
import BestSecurity from "../components/bestsecurity/BestSecurity";
// import EasySteps from "../components/easysteps/EasySteps";
import Testimonial from "../components/testimonial/Testimonial";
import Newsletter from "../components/newsletter/Newsletter";
import Layout from "./../common/Layout";
import Faqs from "../components/faqs/Faqs";
import Questions from "../components/questions/Questions";
import ChatwootWidget from "./../common/ChatwootWidget";
import SEO from "./../common/SEO";

const Home = () => {
  return (
    <Layout>
      {/* <SEO title="Homepage" /> */}
      <Hero />
      <Securely />
      <Transaction />
      <BestOffer />
      <BestSecurity />
      <Faqs />
      <Questions />
      <Testimonial />
      <Newsletter />
    </Layout>
  );
};

export default Home;
