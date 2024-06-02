import Image from "next/image";
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
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="footer-cards">
              <div className="footer-logo">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  unoptimized
                />
              </div>

              <p>Stay trendy, stay you</p>
              <small>Visit our Store to discover the perfect fabrics for your next occasion.</small>
              <small>Follow us on social media to stay updated on the latest trends,
                new arrivals, and special promotions.</small>

              <div className="footer-content">
                {/* <p>
              Follow us on social media to stay updated on the latest trends,
              new arrivals, and special promotions. Join our community and be
              the first to know about exclusive offers and events.
            </p> */}
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
            </div>
          </div>
          <div className="col-3">
            <div className="footer-cards">
              <h3>Shop Location</h3>
              <p>09037102710</p>
              <small>Ibafo, Ogun State, Nigeria.</small>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-cards">
              <h3>Shop Location</h3>
              <p>09037102710</p>
              <small>Ibafo, Ogun State, Nigeria.</small>
            </div>
          </div>
        </div>

        <small className="footer-bottom">
          copyright &copy; {new Date().getFullYear()} All rights reserved.
        </small>
      </div>
    </div>
  );
};

export default Footer;
