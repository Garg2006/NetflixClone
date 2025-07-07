import { Link } from "react-router-dom";
import logo from "../../src/assets/logo.svg";
import cross from "../../src/assets/emailCross.svg";
import { useState } from "react";
import Footer from "../Footer";
import { ClipLoader } from "react-spinners";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";

const HelpPage = () => {
  const [informationVisible, setInformationVisible] = useState(false);
  const [isEmailCaseSelected, setIsEmailCaseSelected] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [numberValue, setNumberValue] = useState("");
  const language = useSelector(getLanguage);

  const forgetPassword = async () => {
    setLoading(true);
    setTimeout(() => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const numberRegex = /^\d+$/;
      if (isEmailCaseSelected) {
        if (!emailRegex.test(emailValue)) {
          setEmailError(true);
          setLinkSent(false);
        } else {
          setEmailError(false);
          setLinkSent(true);
        }
      } else {
        if (!numberRegex.test(numberValue)) {
          setLinkSent(false);
          setEmailError(true);
        } else {
          setEmailError(false);
          setLinkSent(true);
        }
      }
      setLoading(false);
    }, 2000);
    try {
      if (emailValue) await sendPasswordResetEmail(auth, emailValue);
    } catch (error) {
      throw error;
    }
  };

  const checkingError = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!isEmailCaseSelected) {
      if (!emailValue) {
        setEmailError(false);
        return;
      }
    } else {
      if (!numberValue) {
        setEmailError(false);
        return;
      }
    }
    if (!isEmailCaseSelected) {
      console.log("1");
      !emailRegex.test(emailValue) ? setEmailError(true) : setEmailError(false);
    } else {
      !numberRegex.test(numberValue)
        ? setEmailError(true)
        : setEmailError(false);
    }
  };

  return (
    <>
      <div className="bg-[url(assets/help.jpg)]  bg-cover bg-no-repeat">
        <div className="border-b border-[rgba(128,128,128,0.2)] ">
          <div className="px-8 py-6 flex items-center justify-between xl:w-[calc(83.33333333333334%-6rem)] mx-auto ">
            <div className="mt-1.5 ml-4">
              <Link to="/">
                <div className="w-[148px] max-[960px]:w-[89px]">
                  <img className="w-full" src={logo} alt="" />
                </div>
              </Link>
            </div>
            <Link to="/in/login">
              <div className="mt-1.5 ml-4 bg-[rgb(229,9,20)] text-white font-semibold rounded-md ">
                <button className="px-4 py-2 text-sm">Sign In</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="px-12 pt-20 pb-24 max-[960px]:px-8 max-[960px]:pt-10 max-[960px]:pb-12">
          <div className="flex flex-col items-center">
            <div className="w-[500px] max-[960px]:w-full">
              <div className="bg-[#F2F2F2] p-10 ">
                <div className="mt-2.5">
                  <h1 className="text-[32px] font-bold">
                    {languageData[language].updatePasswordEmailPhoneNetflix}
                  </h1>
                </div>
                <div className="pt-1.5" />
                <div className="mt-2.5">
                  <span className="my-1.5">
                    {languageData[language].resetPassword}
                  </span>
                </div>
                <div className="pt-1.5"></div>
                <div className="mt-1.5">
                  <div className="pl-6 pt-2.5 pb-1.5">
                    <div className="flex">
                      <div className="mt-1 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          id="email"
                          checked={isEmailCaseSelected}
                          onChange={() => {
                            setIsEmailCaseSelected(true);
                            checkingError();
                          }}
                        />{" "}
                        <label className="pl-3" htmlFor="email">
                          {languageData[language].Aemail}
                        </label>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mt-1 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          id="text"
                          onChange={() => {
                            setIsEmailCaseSelected(false);
                            checkingError();
                          }}
                        />{" "}
                        <label className="pl-3 cursor-pointer" htmlFor="text">
                          {languageData[language].textMessageSMS}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5">
                  <span>
                    {isEmailCaseSelected
                      ? languageData[language].resetPasswordByEmail
                      : languageData[language].verificationCodeMessage}
                  </span>
                </div>
                <div className="pt-4  mb-8">
                  <div
                    className={`mt-1.5 bg-white border rounded-sm ${
                      emailError ? "border-[#EB3942]" : "border-black"
                    }`}
                  >
                    {isEmailCaseSelected ? (
                      <input
                        type="email"
                        placeholder={languageData[language].Aemail}
                        className={`w-full  py-3 px-4 `}
                        onChange={(e) => setEmailValue(e.target.value)}
                        value={emailValue}
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={languageData[language].mobileNumber}
                        className={`w-full py-3 px-4 `}
                        onChange={(e) => setNumberValue(e.target.value)}
                        value={numberValue}
                      />
                    )}
                  </div>
                  <p
                    className={`mt-2.5 text-[13px] text-[rgb(235,57,66)] ${
                      emailError ? "flex items-center" : "hidden"
                    } items-start justify-start gap-[6px]`}
                  >
                    <img src={cross} alt="" />{" "}
                    {isEmailCaseSelected
                      ? languageData[language].validEmail
                      : languageData[language].enterValidPhoneNumber}
                  </p>
                </div>
                <div>
                  <button
                    className={`w-full cursor-pointer text-lg font-semibold min-h-12 rounded-sm ${
                      loading
                        ? "bg-[rgba(229,9,20,0.408)]"
                        : "bg-[rgb(229,9,20)]"
                    } text-white px-4 py-2`}
                    onClick={forgetPassword}
                  >
                    {isEmailCaseSelected ? (
                      loading ? (
                        <ClipLoader size={20} color="#fff" />
                      ) : (
                        languageData[language].emailMe
                      )
                    ) : loading ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      languageData[language].messageMe
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="mt-4 mb-2 text-[#b3b3b3] text-xs">
                  {languageData[language].recaptchaProtectionNetflix}
                </p>
                {!informationVisible && (
                  <button
                    className=" text-[rgb(68,142,244)] text-xs underline bg-transparent border-none cursor-pointer rounded-sm"
                    onClick={() => setInformationVisible(true)}
                  >
                    {languageData[language].learnMoreNetflix}
                  </button>
                )}
                <p
                  className={`text-[13px] text-[#b3b3b3]  ${
                    informationVisible
                      ? "visible"
                      : "invisible max-h-[20px] overflow-hidden"
                  }`}
                >
                  The information collected by Google reCAPTCHA is subject to
                  the Google{" "}
                  <span className="text-white underline">Privacy Policy</span>{" "}
                  and{" "}
                  <span className="text-white underline">Terms of Service</span>
                  , and is used for providing, maintaining, and improving the
                  reCAPTCHA service and for general security purposes (it is not
                  used for personalised advertising by Google).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-[#D89D31] p-4 font-bold text-black rounded-md absolute transition-all duration-200 ease-in-out  z-[100] left-1/2 -translate-x-1/2 top-5 ${
          linkSent ? "translate-y-0" : "-translate-y-96"
        }`}
      >
        Check You Email Inbox Link has been Sent!
      </div>
      <div className="bg-[#161616] text-[#ffffffb3] w-full">
        <div className="xl:w-[calc(83.5%-6rem)] w-full py-[72px] mx-auto xl:px-12 max-[600px]:px-8 px-6 max-[960px]:py-7">
          <Footer displayFull={false} />
        </div>
      </div>
    </>
  );
};

export default HelpPage;
