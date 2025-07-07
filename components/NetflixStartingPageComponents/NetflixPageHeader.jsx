import React, { useEffect } from "react";
import logo from "../../src/assets/logo.svg";
import NetflixNlogo from "../../src/assets/NetflixNlogo.svg";
import Language_logo from "../../src/assets/LanguageImg.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";

const NetflixPageHeader = ({}) => {
  const dispatch = useDispatch("");
  const language = useSelector(getLanguage);

  console.log(language);

  return (
    <div className="flex justify-between items-center ">
      <div className="w-[148px] h-[40px]">
        <picture className="w-full h-full">
          <source
            media="(min-width: 960px)"
            srcSet={logo}
            className="w-full h-full"
          />
          <img className="w-min h-full" src={NetflixNlogo} alt="logo" />
        </picture>
      </div>
      <div className="flex gap-5">
        <div className="relative border rounded-full  border-[#605F5F] cursor-pointer">
          <div className="absolute top-1/2 left-[15px] -translate-y-1/2 ">
            <img src={Language_logo} alt="" />
          </div>
          <select
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="bg-clip-padding py-1.5 pr-4 pl-[34px] w-[130px] max-[600px]:w-16 rounded-[30px] bg-transparent text-white text-base font-semibold focus:outline focus:outline-white focus:outline-offset-2"
          >
            <option value="English" className="text-black">
              English
            </option>
            <option value="Hindi" className="text-black">
              हिन्दी
            </option>
          </select>
        </div>
        <Link to="/in/login">
          <button className="h-full font-bold border text-sm border-white rounded-[100px] px-4 bg-white whitespace-nowrap  text-black cursor-pointer ">
            {languageData[language].signIn}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NetflixPageHeader;
