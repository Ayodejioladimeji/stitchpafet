import Link from "next/link";
import React from "react";

// PACKAGES
import {
  FaLinkedin,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-cards">
        <img src="/assets/new-logo-lights.png" alt="" />
        <p>
          Follow us on social media to stay updated on the latest trends, new
          arrivals, and special promotions. Join our community and be the first
          to know about exclusive offers and events.
        </p>
        <div className="footer-icons">
          <a
            href="/https://www.facebook.com/Verifibiz_africa-108734885270817/"
            target="_blank"
          >
            <FaFacebookSquare className="footer-social" />
          </a>
          <a
            href="/https://www.instagram.com/verifibiz_africa/"
            target="_blank"
          >
            <FaInstagram className="footer-social" />
          </a>
          <a href="/" target="_blank">
            <FaTwitterSquare className="footer-social" />
          </a>
        </div>
      </div>

      <small className="footer-rights">
        copyright &copy; {new Date().getFullYear()} All rights reserved.
        StitchPafet
      </small>
    </div>
  );
};

export default Footer;
