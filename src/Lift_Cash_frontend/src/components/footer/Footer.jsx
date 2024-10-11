import "./footer.css"; // Import your custom Tailwind CSS file
import { FaFacebookF, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="footer-main-conatiner">
      <div className="footer-first-container">
        {/* Freeos Logo and Description */}
        <div className="footer-main-logo">
          <div className="mb-4">
            <TbCoinRupeeFilled className="footer-logo" />
            <p>
              We represent economic <br />
              freedom through democracy.
            </p>
          </div>
          {/* Social Icons */}
          <div className="footer-social-icons">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="social-icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              aria-label="X (formerly Twitter)"
              className="social-icon"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://telegram.org"
              aria-label="Telegram"
              className="social-icon"
            >
              <FaTelegram />
            </a>
            <a
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
              <a href="/" className="footer-container-li">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="footer-container-li">
                About
              </a>
            </li>
            <li>
              <a href="/dao" className="footer-container-li">
                DAO
              </a>
            </li>
            <li>
              <a href="/purpose" className="footer-container-li">
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
              <a href="#" className="footer-container-li">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="footer-container-li">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="footer-container-li">
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
            <li>
              <a href="https://xprnetwork.com" className="footer-container-li">
                XPR Network
              </a>
            </li>
            <li>
              <a
                href="https://internetcomputer.org"
                className="footer-container-li"
              >
                Internet Computer
              </a>
            </li>
            <li>
              <a href="https://antelope.io" className="footer-container-li">
                Antelope
              </a>
            </li>
            <li>
              <a href="https://junonetwork.io" className="footer-container-li">
                Juno
              </a>
            </li>
          </ul>
        </div>

        {/* Latest Blogs */}
        <div className="footer-container">
          <h5 className="footer-container-h5 ">Latest Blog</h5>
          <div className="footer-container-ul">
            <a href="/blog/freeos-unchained" className="footer-container-a">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Blog 1"
                className="footer-container-img"
              />
              <div>
                <h6>Freeos Unchained</h6>
                <p className="footer-conatiner-p">Mar 18 2024</p>
              </div>
            </a>
            <a
              href="/blog/revolutionising-dao-governance"
              className="footer-container-a"
            >
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Blog 2"
                className="footer-container-img"
              />
              <div>
                <h6>Revolutionising DAO Governance</h6>
                <p className="footer-conatiner-p">Dec 14 2023</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" footer-bottom-container">
        <p>© 2024 Lift Cash</p>
        <p>Website Hosted on ICP, powered by Juno</p>
      </div>
    </footer>
  );
};

export default Footer;
