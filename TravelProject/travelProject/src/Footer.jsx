import "../src/Components/HomePage.css";
import { FaInstagram, FaTwitter, FaGithub, FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footerDiv">
        <div className="footer">
          <div className="voyagoAbout">
            <h2>Voyago</h2>
            <p>
              Discover the world's most beautiful destinations and create
              unforgettable memories with our curated travel experiences.
            </p>
            <div className="socialLinks">
              <a href="">
                <FaInstagram className="links" />
              </a>
              <a href="">
                <FaTwitter className="links" />
              </a>
              <a href="">
                <FaGithub className="links" />
              </a>
            </div>
          </div>
          <div className="quickLinksDiv">
            <h2>Quick Links</h2>
            <div className="quickLinks">
              <NavLink className={"footerQuickLinks"} to={"/"}>
                Home
              </NavLink>
              <NavLink className={"footerQuickLinks"} to={"/discover"}>
                Discover
              </NavLink>
              <NavLink className={"footerQuickLinks"} to={"/favorites"}>
                Favorites
              </NavLink>
              <NavLink className={"footerQuickLinks"} to={"/imagegallery"}>
                Image Gallery
              </NavLink>
              <NavLink className={"footerQuickLinks"} to={"/articles"}>
                Articles
              </NavLink>
              <NavLink className={"footerQuickLinks"} to={"/about"}>
                About
              </NavLink>
            </div>
          </div>
          <div className="supportDiv">
            <h2>Support</h2>
            <div className="support">
              <NavLink>Contact Us</NavLink>
              <NavLink>Help Center</NavLink>
            </div>
          </div>
          <div className="getInTouchDiv">
            <h2>Get in Touch</h2>
            <div className="getInTouch">
              <div className="GetInTouchLinks">
                <MdOutlineEmail />
                <a href="mailto:nosaomo83@gmail.com">hello@voyago.com</a>
              </div>
              <div className="GetInTouchLinks">
                <FaPhone />
                <a href="tel:+2348148123686">+234 8148123686</a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footerTerms">
          <p>© 2024 Voyago. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
