import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reduxStore/userSlice";
import { toast } from "react-toastify";

import { auth } from "../firebase/firebase";

import "./header.scss";

import ContentWrapper from "./contentWrapper/ContentWrapper";
import hotStarLogo from "../assets/images/logo.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  const logout = () => {
    try {
      // console.log('logging out....');
      dispatch(getUser(null));
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error(error);
      toast.error("Something goes very wrong");
    }
  };

  
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <Link
          className="logo"
          to={`${
            userDetails?.data || userDetails?.user?.displayName ? "/" : "/login"
          }`}
        >
          <img src={hotStarLogo} alt="" />
        </Link>
        {userDetails?.data || userDetails?.user?.displayName ? (
          <ul className="menuItems ">
            <li
              className="menuItem hover:scale-110 transition-all duration-300
            ease-in-out"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="menuItem hover:scale-110 transition-all duration-300
            ease-in-out "
              onClick={() => navigationHandler("movie")}
            >
              Movies
            </li>

            <li
              className="menuItem hover:scale-110 transition-all duration-300
            ease-in-out"
              onClick={() => navigationHandler("tv")}
            >
              TV Shows
            </li>
            <li
              className="menuItem hover:scale-110 transition-all duration-300
            ease-in-out"
            >
              <HiOutlineSearch onClick={openSearch} />
            </li>

            <li
              className="menuItem hover:scale-110 transition-all duration-300
            ease-in-out"
            >
              <Link to={"/login"} onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
