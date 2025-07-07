import React, { useRef, useState } from "react";
import logo from "../src/assets/logo.svg";
import cross from "../src/assets/emailCross.svg";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import styles from "../src/styleSheet/NetflixStartingPage.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { getLanguage } from "../store/slice/languageSlice";
import languageData from "../src/language";

const SignInPage = () => {
  const [informationVisible, setInformationVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUsingSignInCode, setIsUsingSignInCode] = useState(false);
  const language = useSelector(getLanguage);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handlePasswordSubmit = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredentials.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
        })
      );
      navigate("/browse");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setSignInError(
          `Incorrect password for ${email}_ You can use a sign-in code, reset your password or try again or Create a new Account`
        );
      } else {
        setSignInError("An error occurred. Please try again later.");
      }
    }
  };

  const handleCodeSubmit = () => {
    setSignInError(
      "An error occurred. Please try again later. or Try using Password"
    );
    setIsUsingSignInCode(!isUsingSignInCode);
  };

  function SignInProcess(e) {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setEmailError(true);
      emailRef.current.focus();
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError(true);
      emailRef.current.focus();
      return;
    }
    setEmailError(false);

    if (!isUsingSignInCode) {
      if (!trimmedPassword) {
        setPasswordError(true);
        passwordRef.current.focus();
        return;
      }

      if (trimmedPassword.length < 6 || trimmedPassword.length > 60) {
        setPasswordError(true);
        passwordRef.current.focus();
        return;
      }
    }

    isUsingSignInCode ? handleCodeSubmit() : handlePasswordSubmit();
  }

  return (
    <>
      <div className={styles.SignInPageContainer}>
        <div className="absolute inset-0 bg-[#00000080] z-0"></div>
        <div className=" relative z-10 max-[600px]:bg-black">
          <div className="xl:px-12 min-[600px]:px-8 px-6 py-6 xl:w-[calc(83%-6rem)] mx-auto z-20">
            <Link to="/">
              <div className="w-[148px] max-[960px]:w-[89px]">
                <img className="w-full" src={logo} alt="" />
              </div>
            </Link>
          </div>
          <div className="flex justify-center z-10">
            <div className="flex items-center justify-center w-[450px] mb-12 max-[600px]:mb-0">
              <form
                className="py-12 px-16 max-[600px]:px-5 max-[600px]:pt-0 max-[600px]:pb-8 bg-[#000000B3]  rounded-sm w-[100%]"
                autoComplete="on"
                onSubmit={(e) => SignInProcess(e)}
              >
                <h1 className="mt-4 pb-3 font-bold text-3xl">
                  {languageData[language].signIn}
                </h1>
                {signInError && (
                  <p className="bg-[#D89D31] p-4 text-black rounded-md">
                    <strong>{signInError.split("_")[0]}</strong>{" "}
                    {signInError.split("_").slice(1).join(".")}
                  </p>
                )}
                <div className="mt-4 w-full">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      ref={emailRef}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" "
                      autoComplete="current-password"
                      className={`peer w-full px-4 pt-6 pb-2 text-white text-base bg-transparent border  rounded-md focus:outline-2 ${
                        emailError ? "border-[#EB3942]" : "border-[#5E5E5E]"
                      } focus:outline-white focus:border-[#5E5E5E] focus:outline-offset-2`}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-white/70 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70 peer-focus:top-4 peer-focus:text-xs peer-focus:text-white
                    peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white"
                    >
                      {languageData[language].emailOrMobileNetflix}
                    </label>
                  </div>
                  <p
                    className={`mt-2.5 text-[13px] text-[rgb(235,57,66)] ${
                      emailError ? "flex items-center" : "hidden"
                    } items-start justify-start gap-[6px]`}
                  >
                    <img src={cross} alt="" />{" "}
                    {languageData[language].enterValidEmailAndMobile}
                  </p>
                </div>
                {!isUsingSignInCode && (
                  <div className="mt-4 w-full">
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        value={password}
                        onChange={(e) => {
                          const newPassword = e.target.value;
                          setPassword(newPassword);

                          if (newPassword.length) {
                            setPasswordError(false);
                          } else {
                            setPasswordError(true);
                          }
                        }}
                        placeholder=" "
                        className={`peer w-full px-4 pt-6 pb-2 text-white text-base bg-transparent border  rounded-md focus:outline-2 ${
                          passwordError
                            ? "border-[#EB3942]"
                            : "border-[#5E5E5E]"
                        } focus:outline-white focus:border-[#5E5E5E] focus:outline-offset-2`}
                      />
                      <label
                        htmlFor="password"
                        className="peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white absolute left-4 top-1/2 -translate-y-1/2 text-base text-white/70 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70 peer-focus:top-4 peer-focus:text-xs peer-focus:text-white"
                      >
                        {languageData[language].passwordNetflix}
                      </label>
                    </div>
                    <p
                      className={`mt-2.5 text-[13px] text-[rgb(235,57,66)] ${
                        passwordError ? "flex items-center" : "hidden"
                      } items-start justify-start gap-[6px]`}
                    >
                      <img src={cross} alt="" />
                      {languageData[language].passwordLength}
                    </p>
                  </div>
                )}
                {isUsingSignInCode && (
                  <div className="mt-4 text-[rgba(255,255,255,0.7)] text-sm font-medium text-center">
                    <p>{languageData[language].messageDataRatesNetflix}</p>
                  </div>
                )}
                <button className="mt-4 rounded-md px-4 py-[11px] font-semibold text-[16px] w-full text-white border border-transparent cursor-pointer transition-all duration-300 ease-in-out bg-[rgb(229,9,20)] hover:bg-[#c11119]">
                  {isUsingSignInCode
                    ? languageData[language].sendPasswordResetCode
                    : languageData[language].signIn}
                </button>
                <p className="mt-4 text-center text-[#b3b3b3]">
                  {languageData[language].orNetflix}
                </p>
                <button
                  className="mt-4 rounded-md px-4 py-[11px] font-semibold text-[16px] w-full text-white border border-transparent cursor-pointer transition-all duration-300 ease-in-out bg-[rgba(128,128,128,0.4)] hover:bg-[#272727]"
                  onClick={() => setIsUsingSignInCode(!isUsingSignInCode)}
                >
                  {isUsingSignInCode
                    ? languageData[language].usePasswordNetflix
                    : languageData[language].useSignInCodeNetflix}
                </button>
                <Link to="/in/loginHelp">
                  <p className="mt-4 text-center text-white underline cursor-pointer transition duration-300 ease-in-out hover:text-[#b3b3b3]">
                    {languageData[language].forgetPassword}
                  </p>
                </Link>
                <div className="py-5">
                  <div className="flex items-center hover:[&>input]:border-white">
                    <input
                      type="checkbox"
                      id="remember"
                      className="cursor-pointer appearance-none bg-transparent w-5 h-5 border border-[rgba(128,128,128,0.4)] rounded-[3px] transition-all duration-300 ease-in-out checked:bg-white checked:after:content-['✔'] checked:after:w-full checked:after:h-full checked:after:text-[11px] checked:after:text-black checked:after:flex checked:after:items-center checked:after:justify-center"
                    />
                    <label htmlFor="remember" className="pl-3">
                      {languageData[language].rememberMeNetflix}
                    </label>
                  </div>
                  <p className="mt-4 text-[#b3b3b3]">
                    {languageData[language].newToNetflix}{" "}
                    <Link to="/signup/registration" className="no-underline">
                      <span className="text-white font-semibold cursor-pointer inline hover:underline">
                       {languageData[language].signUpNowNetflix}
                      </span>
                    </Link>
                  </p>
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
                    className={`text-[13px] ${
                      informationVisible
                        ? "visible"
                        : "invisible max-h-[20px] overflow-hidden"
                    }`}
                  >
                    The information collected by Google reCAPTCHA is subject to
                    the Google{" "}
                    <span className="text-[rgb(68,142,244)]">
                      Privacy Policy
                    </span>
                    and{" "}
                    <span className="text-[rgb(68,142,244)]">
                      Terms of Service
                    </span>
                    , and is used for providing, maintaining, and improving the
                    reCAPTCHA service and for general security purposes (it is
                    not used for personalised advertising by Google).
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#161616] text-[#ffffffb3] w-full">
        <div className="xl:w-[calc(83.5%-6rem)] w-full py-[72px] mx-auto xl:px-12 max-[600px]:px-8 px-6 max-[960px]:py-7">
          <Footer displayFull={false} />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
