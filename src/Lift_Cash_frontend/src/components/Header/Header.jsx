import { useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../utils/redux/themeSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    //console.log(window.scrollY);
    if (window.scrollY >= 70) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleThemeAction = () => {
    // setIsDarkTheme(!isDarkTheme);
    dispatch(toggleTheme());
  };

  return (
    <header className={navbar ? "header-main-active" : "header-main"}>
      {/* Left Side: Logo */}
      <div className="header-logo ">
        <img
          src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27%20standalone=%27no%27?%3e%3c!DOCTYPE%20svg%20PUBLIC%20%27-//W3C//DTD%20SVG%201.1//EN%27%20%27http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%27%3e%3csvg%20xmlns:dc=%27http://purl.org/dc/elements/1.1/%27%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xl=%27http://www.w3.org/1999/xlink%27%20viewBox=%2719353%207483%202547.3397%201921%27%20width=%272547.3397%27%20height=%271921%27%3e%3cdefs/%3e%3cg%20id=%27High-Impact%27%20stroke-dasharray=%27none%27%20fill=%27none%27%20fill-opacity=%271%27%20stroke-opacity=%271%27%20stroke=%27none%27%3e%3ctitle%3eHigh-Impact%3c/title%3e%3cg%20id=%27High-Impact_Layer_1%27%3e%3ctitle%3eLayer%201%3c/title%3e%3cg%20id=%27Graphic_113%27%3e%3cpath%20d=%27M%2019867.575%208005.563%20L%2019353%208302.653%20L%2019913.634%209273.7%20L%2020428.21%208976.61%20L%2020674.963%209404%20L%2021900.34%207483%20L%2019624.017%207583.707%20Z%20M%2020679.403%208534.046%20L%2020756.135%208666.951%20L%2019758.93%208711.069%20L%2020295.74%207869.5215%20L%2020372.472%208002.426%20L%2020014.598%208563.458%20Z%20M%2021587.57%207911.736%20L%2021588.643%207910.056%20L%2021589.562%207911.648%20Z%20M%2020454.658%208079.753%20L%2020620.86%208072.4%20L%2020369.768%208466.031%20L%2020207.794%208473.197%20L%2020205.842%208469.817%20Z%20M%2021378.474%207784.736%20L%2021417.765%207782.998%20L%2021417.737%207782.95%20L%2021510.838%207778.831%20L%2021421.37%207919.089%20L%2021289.038%207924.943%20L%2020841.976%208625.793%20L%2020765.244%208492.889%20L%2021122.837%207932.296%20L%2020592.355%207955.765%20L%2020592.636%207955.326%20L%2020458.313%207961.269%20L%2020381.58%207828.364%20L%2021378.786%207784.246%20Z%20M%2020705.017%208068.156%20L%2020705.858%208066.838%20L%2020937.1%208056.607%20L%2020847.663%208196.815%20L%2020781.061%208199.761%20L%2020762.82%208228.356%20L%2020833.372%208225.234%20L%2020743.936%208365.441%20L%2020673.385%208368.563%20L%2020618.565%208454.503%20L%2020456.592%208461.669%20L%2020454.64%208458.288%20L%2020703.455%208068.225%20Z%27%20fill=%27%23ff4500%27/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"
          alt="Logo"
          className="header-logo-img"
        />
      </div>

      {/* Center: Navigation Links (Hidden on Mobile) */}
      <nav className="header-navigation-link-nav relative z-10">
        <a
          href="#home"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          Home
        </a>
        <a
          href="#about"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          About
        </a>
        <a
          href="#dao"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          DAO
        </a>
        <a
          href="#purpose"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          Purpose
        </a>
        <a
          href="#faq"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          FAQ
        </a>
        <a
          href="#blog"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          Blog
        </a>
        <a
          href="#documents"
          className={
            !navbar ? "header-navigation-link" : " header-navigation-link-dark"
          }
        >
          Documents
        </a>
      </nav>

      {/* Right Side: Theme Toggle and Button */}
      <div className="header-right-side-buttons">
        {/* Moon Icon (For Dark Mode Toggle) */}
        <button onClick={toggleThemeAction} className="header-theme-icon">
          {darkMode ? (
            <GoSun className={!navbar ? "text-white" : "text-black"} />
          ) : (
            <GoMoon />
          )}
        </button>

        {/* "Open App" Button */}
        <button
          className={navbar ? "header-signUp-btn-active" : "header-signUp-btn"}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Open App
        </button>

        {/* Hamburger Menu Icon (Mobile/Tablet) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="header-hamburger-icon">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible when the menu is toggled) */}
      {isMenuOpen && (
        <nav className="header-mobile-naviagtion-link">
          <a
            href="#home"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            About
          </a>
          <a
            href="#dao"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            DAO
          </a>
          <a
            href="#purpose"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Purpose
          </a>
          <a
            href="#faq"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            FAQ
          </a>
          <a
            href="#blog"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Blog
          </a>
          <a
            href="#documents"
            className="header-navigation-link"
            onClick={toggleMenu}
          >
            Documents
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
