import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-links">
        <a
          target={"_blank"}
          href="https://twitter.com/ashwinib935"
          className="footer-icon"
        >
          <i className="fa fa-brands fa-twitter"></i>
        </a>

        <a
          target={"_blank"}
          href="https://github.com/ashwinib935"
          className="footer-icon"
        >
          {" "}
          <i className="fa fa-brands fa-github"></i>
        </a>

        <a
          target={"_blank"}
          href="https://www.linkedin.com/in/ashwini-bhambere-611b95157/"
          className="footer-icon"
        >
          <i className="fa fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-text">© No Copyright, Feel free to replicate.</div>
    </footer>
  );
}

export default Footer;
