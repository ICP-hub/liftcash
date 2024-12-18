import "./Footer.css"; // Import your custom Tailwind CSS file
import { FaFacebookF, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import shape1 from "../../assets/images/shape-1.svg";
import shape3 from "../../assets/images/shape-3.svg";
import shape2 from "../../assets/images/shape-2.svg";

const Footer = () => {
  return (
    <footer className="footer-main-conatiner">
      <img src={shape1} alt="shape1" className="footer-shape-image-top" />

      <div className="footer-first-container">
        {/* Lift Cash Logo and Description */}
        <div className="footer-main-logo">
          <img src={logo} className="footer-logo" />
          <p className="footer-logo-description">
            We represent economic <br />
            freedom through democracy.
          </p>
          {/* Social Icons */}
          <div className="footer-social-icons">
            <a
              target="_blank"
              href="https://facebook.com"
              aria-label="Facebook"
              className="social-icon"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              href="https://x.com/lift_cash"
              aria-label="X (formerly Twitter)"
              className="social-icon"
            >
              <FaXTwitter />
            </a>
            <a
              target="_blank"
              href="https://t.me/+vDcmQ6tRdINkNDJh"
              aria-label="Telegram"
              className="social-icon"
            >
              <FaTelegram />
            </a>
            <a
              target="_blank"
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* About Lift Cash */}
        <div className="footer-about-container">
          <h5 className="footer-container-h5">About Lift Cash</h5>
          <ul className="footer-container-ul">
            <li>
              <a href="#home" className="footer-container-li">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="footer-container-li">
                About
              </a>
            </li>
            <li>
              <a href="#dao" className="footer-container-li">
                DAO
              </a>
            </li>
            <li>
              <a href="#purpose" className="footer-container-li">
                Purpose
              </a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div className="footer-container">
          <h5 className="footer-container-h5">Information</h5>
          <ul className="footer-container-ul">
            <li>
              <a href="#faq" className="footer-container-li">
                FAQ
              </a>
            </li>
            <li>
              <a href="#blog" className="footer-container-li">
                Blog
              </a>
            </li>
            <li>
              <a href="#document" className="footer-container-li">
                Documents
              </a>
            </li>
            <li>
              <a href="#" className="footer-container-li">
                FreeDAO
              </a>
            </li>
          </ul>
        </div>

        {/* Built On */}
        <div className="footer-container">
          <h5 className="footer-container-h5">Built On</h5>
          <ul className="footer-container-ul">
            {/* <li>
              <a href="https://xprnetwork.com" className="footer-container-li">
                XPR Network
              </a>
            </li> */}
            <li>
              <a
                href="https://internetcomputer.org"
                className="footer-container-li"
              >
                Internet Computer
              </a>
            </li>
            {/* <li>
              <a href="https://antelope.io" className="footer-container-li">
                Antelope
              </a>
            </li> */}
            {/* <li>
              <a href="https://junonetwork.io" className="footer-container-li">
                Juno
              </a>
            </li> */}
          </ul>
        </div>

        {/* Latest Blogs */}
        <div className="footer-container hidden md:block">
          <h5 className="footer-container-h5 ">Latest Blog</h5>
          <div className="footer-container-ul">
            <a href="/blog/freeos-unchained" className="footer-container-a">
              <img
                src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*t7wM5PqOGrxJSPLw9t2GRw.png"
                alt="Blog 1"
                className="footer-container-img"
              />

              <h6 className="w-52 font-inter">Lift Cash Unchained</h6>
            </a>
            <a
              href="/blog/revolutionising-dao-governance"
              className="footer-container-a"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*xD7fnBxITIn_A9FVhFf4gw.png"
                alt="Blog 2"
                className="footer-container-img"
              />

              <h6 className="w-52 truncate font-inter">
                Revolutionising DAO Governance
              </h6>
            </a>
          </div>
        </div>
      </div>

      <img src={shape3} alt="shap2" className="footer-shape-image-bottom " />

      {/* Footer Bottom */}
      <div className=" footer-bottom-container">
        <p className="footer-bottom-items">
          © 2024 FreeDAO. All rights reserved.
        </p>
        <p className="footer-bottom-items">Website Hosted on ICP</p>
      </div>
      <img src={shape2} alt="shape2" className="footer-shape-image-top-left" />
    </footer>
  );
};

export default Footer;
