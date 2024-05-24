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
        <div className="footer-cards">
          <div className="footer-logo">
            <Image
              src="/images/logos.svg"
              alt=""
              width={100}
              height={100}
              unoptimized
            />
          </div>

          <p>Stay trendy, stay you</p>

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
      <small className="footer-rights">
        copyright &copy; {new Date().getFullYear()} All rights reserved.
      </small>
    </div>
  );
};

export default Footer;
