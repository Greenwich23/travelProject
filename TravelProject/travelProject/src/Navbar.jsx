import { NavLink, useLocation } from "react-router-dom";
import "../src/Components/HomePage.css";
import { FaBars, FaRegHeart, FaMoon } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  //   localStorage.setItem("theme", theme);
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    setOpen(false);
  }, [location]);

  function ActiveMode() {
    setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  console.log(theme);
  return (
    <header className="header" id="header">
      <nav className="navContainer">
        <div className="logo">
          <NavLink className="logoText" to={"/"}>
            Voyago
          </NavLink>
        </div>
        <div className="navLinks">
          <NavLink
            className={({ isActive }) => (!isActive ? "Links" : "LinksActive")}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (!isActive ? "Links" : "LinksActive")}
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (!isActive ? "Links" : "LinksActive")}
            to={"/discover"}
          >
            Discover
          </NavLink>
          <div id="flexLink">
            <NavLink
              id="favorites"
              to={"/favorites"}
              className={({ isActive }) =>
                !isActive ? "Links" : "LinksActive"
              }
            >
              <FaRegHeart id="favoriteIcon" /> Favorites
            </NavLink>
          </div>
          <NavLink
            className={({ isActive }) => (!isActive ? "Links" : "LinksActive")}
            to={"/articles"}
          >
            Articles
          </NavLink>
          <NavLink
            className={({ isActive }) => (!isActive ? "Links" : "LinksActive")}
            to={"/imageGallery"}
          >
            ImageGallery
          </NavLink>
        </div>
        {open == false ? (
          <FaBars
            id="barsIcon"
            onClick={() => setOpen(!open)}
            style={theme === "light" ? { color: "black" } : { color: "white" }}
          />
        ) : (
          <GiCancel
            id="barsIcon"
            onClick={() => setOpen(!open)}
            style={theme === "light" ? { color: "black" } : { color: "white" }}
          />
        )}
        {
          <FaMoon
            onClick={ActiveMode}
            style={theme === "light" ? { color: "black" } : { color: "red" }}
          />
        }
      </nav>
      <div
        className={open == false ? "navLinksDropDown" : "navLinksDropDown open"}
      >
        <div className="height"></div>
        <NavLink className="Links" to={"/"}>
          Home
        </NavLink>
        <NavLink className="Links" to={"/about"}>
          About
        </NavLink>
        <NavLink className="Links" to={"/discover"}>
          Discover
        </NavLink>
        <div className="Links" id="flexLink">
          <FaRegHeart id="favoriteIcon" />
          <NavLink id="favorites" className="Links" to={"favorites"}>
            Favorites
          </NavLink>
        </div>
        <NavLink className="Links" to={"/articles"}>
          Articles
        </NavLink>
        <NavLink className="Links" to={"/imageGallery"}>
          ImageGallery
        </NavLink>
      </div>
    </header>
  );
}
