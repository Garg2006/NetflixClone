import React, { useState } from "react";
import SignUpHeader from "../components/SignUpRegistrationPageComponent/SignUpHeader";
import SettingUpAccount from "../components/SignUpRegistrationPageComponent/SettingUpAccount";
import Footer from "../components/Footer";
import languageData from "../src/language";
import { useSelector } from "react-redux";
import { getLanguage } from "../store/slice/languageSlice";

const SignUpRegistrationPage = () => {
  const  language = useSelector(getLanguage)
  const [authButtonText, setAuthButtonText] = useState(languageData[language].signIn);

  return (
    <div>
      <SignUpHeader authButtonText={authButtonText}/>
      <SettingUpAccount  setAuthButtonText={setAuthButtonText}/>
      <div className="bg-[#f3f3f3] text-[#737373] w-full py-[30px] font-semibold">
        <div className="w-[90%] mx-auto">
          <Footer displayFull={false} />
        </div>
      </div>
    </div>
  );
};

export default SignUpRegistrationPage;
