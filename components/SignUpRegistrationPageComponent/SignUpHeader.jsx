import React from "react";
import logo from "../../src/assets/logo.svg";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";

const SignUpHeader = ({ authButtonText }) => {
const language = useSelector(getLanguage)

  const signOut = async () => {
    try {
      await auth.signOut();
      window.location.href='/'
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[90px] max-[500px]:h-[45px] border-b-[1px] border-[#e6e6e6]">
      <Link
        to="/"
        className="w-[167px] ml-[3%] max-[500px]:w-[75px] max-[500px]:h-5 "
      >
        <img className="w-full h-full" src={logo} alt="" />
      </Link>
      <Link
        to={authButtonText == languageData[language].signIn ? "/in/login" : ""}
        className="mx-[3%]  font-bold"
        onClick={() => {
          if (authButtonText ==  languageData[language].signout) signOut();
        }}
      >
        <h4 className="text-[19px] max-[750px]:text-base">{authButtonText}</h4>
      </Link>
    </div>
  );
};

export default SignUpHeader;
