import { useEffect, useRef, useState } from "react";
import logo from "../../src/assets/logo.svg";
import search from "../../src/assets/search.svg";
import notification from "../../src/assets/notification.svg";
import account from "../../src/assets/account.svg";
import help from "../../src/assets/help.svg";
import cross from "../../src/assets/plus.svg";
import manageProfiles from "../../src/assets/manageProfiles.svg";
import transferProfile from "../../src/assets/transferProfile.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../../store/slice/searchMovieSlice";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import { auth } from "../firebase";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";

const tabs = [
  { name: { English: "Home", Hindi: "मुख्य पृष्ठ" }, url: "/browse" },
  {
    name: { English: "TV Shows", Hindi: "टीवी शो" },
    url: "/browse/comingSoon",
  },
  { name: { English: "Movies", Hindi: "फिल्में" }, url: "/browse/comingSoon" },
  {
    name: { English: "News & Popular", Hindi: "समाचार और लोकप्रिय" },
    url: "/browse/comingSoon",
  },
  { name: { English: "My List", Hindi: "मेरा सूची" }, url: "/browse/my-list" },
  {
    name: { English: "Browse by Language", Hindi: "भाषा द्वारा ब्राउज़ करें" },
    url: "/browse/comingSoon",
  },
];

const profileMenuOptions = [
  {
    name: { English: "Manage Profiles", Hindi: "प्रोफ़ाइल प्रबंधित करें" },
    img: manageProfiles,
  },
  {
    name: { English: "Transfer Profile", Hindi: "प्रोफ़ाइल ट्रांसफर करें" },
    img: transferProfile,
  },
  { name: { English: "Account", Hindi: "खाता" }, img: account },
  { name: { English: "Help Centre", Hindi: "मदद केंद्र" }, img: help },
];

const Header = ({
  profileSelected,
  headerBackground,
  pageUrl,
  searchBox,
  setSearchBox,
  searchedMovie,
  setSearcheMovie
}) => {
  const [tabSelected, setTabSelected] = useState(
    Number(sessionStorage.getItem("index")) || 0
  );
  
  const dispatch = useDispatch();
  const searchBoxRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const language = useSelector(getLanguage);
  const [showDropdown, setShowDropdown] = useState(false);


  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 875) {
      setIsVisible(false);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  };

  const handleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const searchMovieFnc = (e) => {
    const value = e.target.value;
    setSearcheMovie(value);
    dispatch(fetchSearch(value));
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      throw err;
    }
  };

  return (
    <div
      className={`${
        pageUrl == "/browse"
          ? headerBackground
            ? "bg-neutral-900"
            : "bg-transparent"
          : "bg-[#141414]"
      } text-[14px] fixed top-0 w-full z-[100]  px-[4%] bg-[linear-gradient(180deg,_rgba(0,0,0,0.7)_10%,_transparent)] transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-between h-[68px] max-[950px]:h-[41px]  relatvie">
        <div className="flex z-10">
          <Link to="/browse">
            <div className="min-[950px]:w-24 w-16 min-[1150px]:mr-[25px] mr-[5px]">
              <img src={logo} alt="logo" className="w-24" />
            </div>
          </Link>
          <div className="hidden min-[875px]:flex items-center">
            <ul className="flex items-center">
              {tabs.map((tab, index) => (
                <Link to={tab.url} key={index}>
                  <li
                    className={`ml-5 cursor-pointer hover:text-[#b3b3b3] transition-all duration-100 ease-in-out xl:text-sm text-[10px] ${
                      tabSelected === index ? "font-bold" : ""
                    }`}
                    onClick={() => {
                      setTabSelected(index);
                      sessionStorage.setItem("index", index);
                    }}
                  >
                    {tab.name[language]}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div
            className="max-[875px]:flex hidden cursor-pointer  items-center relative"
            onClick={handleDropDown}
          >
            <button className="text-[12px] font-semibold ml-[18px]">
              {languageData[language].browse}
            </button>
            <span
              className={`border-solid border-t-[5px] border-r-[5px] border-b-0 border-l-[5px] 
    border-t-white border-r-transparent border-b-transparent border-l-transparent 
    ml-2.5 transition-transform duration-200 ease-in-out ${
      showDropdown ? "rotate-180" : ""
    }`}
            ></span>

            {showDropdown && (
              <div className="top-[64px] left-13 -translate-x-1/2 absolute">
                <div className="absolute border-[7px] border-transparent -top-3 border-b-[#e5e5e5] -translate-x-1/2 left-1/2"></div>
                <div className="bg-[#e5e5e5] h-0.5"></div>
                <ul className="z-[100] border border-[hsla(0,0%,100%,.15)] text-[13px] w-[260px] flex flex-col">
                  {tabs.map((tab, index) => (
                    <Link to={tab.url} key={index}>
                      <li
                        className={`justify-center bg-[rgba(0,0,0,0.9)] flex items-center cursor-pointer w-full hover:bg-[rgba(0,0,0,1)] transition-all duration-100 ease-in-out xl:text-sm text-[10px] h-[50px] ${
                          tabSelected === index
                            ? "font-bold text-white"
                            : "text-[#b3b3b3]"
                        }`}
                        onClick={() => {
                          setTabSelected(index);
                          sessionStorage.setItem("index", index);
                        }}
                      >
                        {tab.name[language]}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex items-center z-20 absolute right-[4%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-[400px]:hidden flex items-center">
            {!searchBox && (
              <div
                className="px-1.5 min-w-9 mr-[15px] cursor-pointer transition-all duration-300 ease-in-out active:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  searchBoxRef.current.focus();
                  setSearchBox(true);
                }}
              >
                <img src={search} alt="" className="w-full" />
              </div>
            )}
            <div
              className={`flex z-[100]  border-white ${
                searchBox ? "border mr-[15px]" : "border-none"
              } items-center  bg-black ${
                searchBox
                  ? "max-w-[500px] transition-all duration-300 ease-in"
                  : "max-w-0"
              }  overflow-hidden`}
            >
              <div className="min-w-9 px-1.5 cursor-pointer">
                <img src={search} alt="" className="w-full" />
              </div>
              <input
                type="search"
                name=""
                id=""
                placeholder="Title, people, genres"
                className={`${styles.search} outline-none pl-[7PX] py-[7PX] pr-3.5`}
                ref={searchBoxRef}
                onChange={searchMovieFnc}
                value={searchedMovie}
              />
              <div
                className="cursor-pointer w-6 rotate-45 mx-1.5"
                onClick={() => {
                  setSearcheMovie("");
                  searchBoxRef.current.focus();
                  dispatch(fetchSearch(""));
                }}
              >
                <img src={cross} alt="" className="" />
              </div>
            </div>
          </div>

          <div className="mr-[15px] cursor-pointer max-[1100px]:hidden ">
            <p className="xl:text-sm text-[10px]">Children</p>
          </div>
          <div className="mr-[15px] min-w-9 ">
            <button className="px-1.5 pt-0.5 pb-[3px] mt-1 cursor-pointer">
              <img src={notification} alt="" className="w-full" />
            </button>
          </div>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center cursor-pointer">
              <div className="w-8">
                <img
                  src={profileSelected.profilepic}
                  alt=""
                  className="w-full"
                />
              </div>
              <span
                className={`max-[950px]:hidden border-solid border-t-[5px] border-r-[5px] border-b-0 border-l-[5px] 
            border-t-white border-r-transparent border-b-transparent border-l-transparent 
            ml-2.5 transition-transform duration-200 ease-in-out 
            ${isVisible ? "rotate-180" : ""}`}
              ></span>
            </div>

            {isVisible && (
              <div className="absolute top-[53px] right-0 z-[100] bg-[#000000E6] border border-[#FFFFFF26] text-[13px] w-[220px]">
                <div className="py-2.5 relative border-y border-[#FFFFFF40]">
                  {profileMenuOptions.map((menu, index) => (
                    <div
                      key={index}
                      className="py-[5px] px-2.5 flex items-center whitespace-nowrap hover:underline cursor-pointer"
                    >
                      <img
                        src={menu.img}
                        alt=""
                        className="pr-[13px] pl-[5px]"
                      />
                      <span>{menu.name[language]}</span>
                    </div>
                  ))}
                  <div className="absolute border-solid border-t-[7px] border-r-[7px] border-l-[7px] border-t-white border-r-transparent border-l-transparent -top-3 right-7 rotate-180"></div>
                </div>
                <div className="my-2.5 text-center">
                  <button
                    className="px-2.5 py-[5px] hover:underline cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <span>{languageData[language].signOut}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
