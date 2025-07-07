import React, { useRef, useState } from "react";
import stepsLogo from "../../src/assets/stepsLogo.png";
import cross from "../../src/assets/emailCross.svg";
import securityMark from "../../src/assets/security.svg";
import check from "../../src/assets/check.svg";
import checkMark from "../../src/assets/Checkmark.png";
import successIcon from "../../src/assets/successIcon.svg";
import Lock from "../../src/assets/Lock.png";
import secure from "../../src/assets/secure.svg";
import visa from "../../src/assets/visa.png";
import mastercard from "../../src/assets/MASTERCARD.png";
import rightAngleBracket from "../../src/assets/rightAngleBracket2.svg";
import bhim from "../../src/assets/BHIM.png";
import paytm from "../../src/assets/PAYTM.png";
import phonePe from "../../src/assets/PHONEPE.png";
import amazonPay from "../../src/assets/AMAZONPAY.png";
import googlePay from "../../src/assets/GPAY.png";
import { useDispatch, useSelector } from "react-redux";
import { getEmail, setEmail } from "../../store/slice/emailSlice";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";

const SettingUpAccount = ({ setAuthButtonText }) => {
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [planSelected, setPlanSelected] = useState("1");
  const [loading, setLoading] = useState(false);
  const [userRegisteredAlready, setUserRegisteresAlready] = useState("");
  const language = useSelector(getLanguage);

  const email = useSelector(getEmail);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStep((prevState) => prevState + 1);
    } catch (error) {
      setUserRegisteresAlready("Email-already-in-use. Try to Sign In");
    }
  };

  function SignUpProcess(e) {
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
    handleRegister(e);
  }

  const Our_Plan_Policy = [
    {
      English: "No commitments, cancel anytime.",
      Hindi: "कोई प्रतिबद्धताएँ नहीं, कभी भी रद्द करें।",
    },
    {
      English: "Everything on Netflix for one low price.",
      Hindi: "नेटफ्लिक्स पर सब कुछ एक ही कम कीमत में।",
    },
    {
      English: "No ads and no extra fees. Ever.",
      Hindi: "कोई विज्ञापन नहीं और कोई अतिरिक्त शुल्क नहीं। कभी नहीं।",
    }
  ];

  const About_Plans = [
    {
      type: "Mobile",
      background:
        "radial-gradient(140.76% 131.96% at 100% 100%, rgb(33, 114, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
      quality: "480p",
      details: {
        "Monthly price": "₹ 149",
        "Video and Sound Quality": "Fair",
        resolution: "480p",
        "Supported devices": ["Mobile phone", "tablet"],
        "Devices your household can watch at the same time": "1",
        download: "1",
      },
    },
    {
      type: "Basic",
      background:
        "radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
      quality: "720p",
      popular: "Most Popular",
      details: {
        "Monthly price": "₹ 199",
        "Video and Sound Quality": "Good",
        resolution: "720p (HD)",
        "Supported devices": ["TV", "computer", "Mobile phone", "tablet"],
        "Devices your household can watch at the same time": "1",
        download: "1",
      },
    },
    {
      type: "Standard",
      background:
        "radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
      quality: "1080p",
      details: {
        "Monthly price": "₹ 499",
        "Video and Sound Quality": "Great",
        resolution: "1080p (Full HD)",
        "Supported devices": ["TV", "computer", "Mobile phone", "tablet"],
        "Devices your household can watch at the same time": "2",
        download: "2",
      },
    },
    {
      type: "Premium",
      background:
        "radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
      quality: "4K + HDR",
      details: {
        "Monthly price": "₹ 649",
        "Video and Sound Quality": "Best",
        resolution: "4K (Ultra HD) + HDR",
        "Spatial Audio (immersive_sound)": "Included",
        "Supported devices": ["TV", "computer", "Mobile phone", "tablet"],
        "Devices your household can watch at the same time": "4",
        download: "6",
      },
    },
  ];

  const emailVerification = async () => {
    try {
      if (auth.currentUser) await sendEmailVerification(auth.currentUser);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="pb-[95px]">
      {step === 0 && <Step0 setStep={setStep} language={language} />}
      {step === 1 && (
        <Step1
          email={email}
          dispatch={dispatch}
          password={password}
          setPassword={setPassword}
          SignUpProcess={SignUpProcess}
          loading={loading}
          setLoading={setLoading}
          emailError={emailError}
          passwordError={passwordError}
          emailRef={emailRef}
          passwordRef={passwordRef}
          setAuthButtonText={setAuthButtonText}
          emailVerification={emailVerification}
          userRegisteredAlready={userRegisteredAlready}
          language={language}
        />
      )}
      {step === 2 && (
        <Step2 setStep={setStep} email={email} language={language} />
      )}
      {step === 3 && (
        <Step3
          setStep={setStep}
          email={email}
          Our_Plan_Policy={Our_Plan_Policy}
          language={language}
        />
      )}
      {step === 4 && (
        <Step3Part2
          setStep={setStep}
          About_Plans={About_Plans}
          planSelected={planSelected}
          setPlanSelected={setPlanSelected}
          loading={loading}
          setLoading={setLoading}
          language={language}
        />
      )}
      {step === 5 && (
        <Step4
          setStep={setStep}
          loading={loading}
          setLoading={setLoading}
          language={language}
        />
      )}
      {step === 6 && <Step5 language={language} />}
    </div>
  );
};

export default SettingUpAccount;

const Step0 = ({ setStep, language }) => (
  <div className="pt-5 px-8 pb-16 max-w-[404px] mx-auto">
    <div>
      <div className="mt-[100px] mb-[20px] w-[260px] mx-auto">
        <img className="w-full" src={stepsLogo} alt="" />
      </div>
      <div className="text-center">
        <span className="text-[13px]">
          {languageData[language].step} <b>1</b> {languageData[language].of} <b>4</b>
        </span>
        <h1 className="text-[30px] font-semibold mb-[12px]">
          {languageData[language].finishSettingUpAccount}
        </h1>
      </div>
    </div>
    <div className="text-center">
      <span className="font-medium">
        {languageData[language].personalizedNetflix}
      </span>
    </div>
    <div className="pt-6">
      <button
        className="w-full border-0 cursor-pointer transitio-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] align-text-top text-[24px] font-semibold hover:bg-[#C11119] px-6 py-5 rounded bg-[#e50914] text-white"
        onClick={() => {
          setStep((prevState) => prevState + 1);
        }}
      >
        {languageData[language].next}
      </button>
    </div>
  </div>
);

const Step1 = ({
  email,
  dispatch,
  password,
  setPassword,
  SignUpProcess,
  loading,
  setLoading,
  emailError,
  passwordError,
  emailRef,
  passwordRef,
  emailVerification,
  setAuthButtonText,
  userRegisteredAlready,
  language,
}) => (
  <div className="mt-11 px-8 pb-16 max-w-[480px] mx-auto">
    {userRegisteredAlready && (
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white  bg-black rounded-md p-4 text-center font-bold max-[650px]:w-[220px]">
        {userRegisteredAlready}
      </div>
    )}
    <form onSubmit={(e) => SignUpProcess(e)}>
      <div>
        <span className="text-[13px]">
        {languageData[language].step} <b>1</b> {languageData[language].of} <b>4</b>
        </span>
        <h1 className="text-[30px] font-semibold mb-3">
          {languageData[language].createPasswordNetflix}
        </h1>
      </div>
      <div>
        <div>
          <span className="font-medium">
            {languageData[language].fewStepsNetflix}
          </span>
        </div>
        <span className="font-medium">
          {languageData[language].paperworkNetflix}
        </span>
        <div className="mt-4 w-full">
          <div className="relative">
            <input
              type="text"
              id="email"
              value={email}
              red={emailRef}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder=" "
              className={`peer w-full px-4 pt-6 pb-2 text-black text-base  bg-transparent border  rounded-md focus:outline-2 ${
                emailError ? "border-[#EB3942]" : "border-black"
              } focus:outline-black focus:border-black focus:outline-offset-2`}
            />
            <label
              htmlFor="email"
              className="peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-xs  absolute left-4 top-1/2 -translate-y-1/2 text-base transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:text-xs "
            >
              {languageData[language].emailOrMobileNetflix}
            </label>
          </div>
          <p
            className={`mt-[6px] text-[13px] text-[rgb(235,57,66)] ${
              emailError ? "flex items-center" : "hidden"
            } items-start justify-start gap-[6px]`}
          >
            <img src={cross} alt="" />{" "}
            {languageData[language].enterValidEmailAndMobile}
          </p>
        </div>
        <div className="mt-4 w-full">
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className={`peer w-full px-4 pt-6 pb-2 text-black text-base  bg-transparent border  rounded-md focus:outline-2 ${
                passwordError ? "border-[#EB3942]" : "border-black"
              } focus:outline-black focus:border-black focus:outline-offset-2`}
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base transition-all duration-300 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base  peer-focus:top-4 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-4 peer-[&:not(:placeholder-shown)]:text-xs"
            >
              {languageData[language].passwordNetflix}
            </label>
          </div>
          <p
            className={`mt-[6px] text-[13px] text-[rgb(235,57,66)] ${
              passwordError ? "flex items-center" : "hidden"
            } items-start justify-start gap-[6px]`}
          >
            <img src={cross} alt="" />
            {languageData[language].passwordLength}
          </p>
        </div>
        <div className="pt-6">
          <button
            className={`w-full border-0 cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] align-text-top text-[24px] font-semibold px-6 py-5 rounded ${
              loading ? "bg-[#732527f8]" : "bg-[#e50914] hover:bg-[#C11119]"
            } text-white`}
            onClick={() => {
              if (password) {
                setTimeout(() => {
                  setLoading(false);
                  setAuthButtonText(languageData[language].signout);
                  emailVerification();
                }, 2000);
              }
            }}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : languageData[language].next}
          </button>
        </div>
      </div>
    </form>
  </div>
);

const Step2 = ({ setStep, email, language }) => (
  <div className="max-w-[404px] mx-auto p-5">
    <div className="pt-16 text-center">
      <div className="h-[51px] w-[51px] border-[3px] border-[#e50914] rounded-full mb-[30px] flex items-center justify-center mx-auto">
        <img src={securityMark} alt="" />
      </div>
      <span>
      {languageData[language].step} <b>2</b> {languageData[language].of} <b>4</b>
      </span>
      <h1 className="mb-3 text-[32px] font-semibold">
        {languageData[language].verifyEmailNetflix}
      </h1>
      <div>
        <span>
          Tap the link we sent to <b>{email}</b> to verify.
          <br />
          <br />
          {languageData[language].verifyingEmailMessage}
        </span>
      </div>
      <div className="pt-6">
        <button
          className="w-full border-0 cursor-pointer transitio-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] align-text-top text-[24px] font-semibold hover:bg-[#E6E6E6] px-6 py-5 rounded bg-[#8080804D] "
          onClick={() => setStep((prevState) => prevState + 1)}
        >
          {languageData[language].skip}
        </button>
      </div>
    </div>
  </div>
);

const Step3 = ({ setStep, Our_Plan_Policy, language }) => (
  <div className="max-w-[404px] mx-auto p-5 ">
    <div className="pt-5 text-center">
      <div className="mb-5 mt-[100px] flex items-center justify-center mx-auto h-[50px] w-[50px]">
        <img src={checkMark} alt="" />
      </div>
      <span>
      {languageData[language].step} <b>3</b> {languageData[language].of} <b>4</b>
      </span>
      <h1 className="mb-3 text-[32px] font-semibold">
        {languageData[language].choosePlanTitle}
      </h1>
      <div className="max-w-[300px] mx-auto my-4 text-left">
        <ul>
          {Our_Plan_Policy.map((about) => (
            <li className="flex justify-start items-start my-4">
              <img className="mr-2" src={check} alt="" />
              <p className="text-base font-medium justify-start">{about[language]}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-6">
        <button
          className="w-full border-0 cursor-pointer transitio-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] align-text-top text-[24px] font-semibold hover:bg-[#C11119] px-6 py-5 rounded bg-[#e50914] text-white"
          onClick={() => setStep((prevState) => prevState + 1)}
        >
          {languageData[language].next}
        </button>
      </div>
    </div>
  </div>
);

const Step3Part2 = ({
  setStep,
  About_Plans,
  planSelected,
  setPlanSelected,
  loading,
  setLoading,
  language,
}) => (
  <div className="xl:pt-5 px-3 xl:pb-16 flex flex-col max-[1050px]:max-w-[570px] max-w-[1100px] mx-auto">
    <div className="xl:mt-6 mt-0 mb-2">
      <span>
      {languageData[language].step} <b>3</b> {languageData[language].of} <b>4</b>
      </span>
      <h1 className="text-[32px] font-semibold mb-3">
        {languageData[language].chooseTheRightPlan}
      </h1>
    </div>
    <div className="mt-[38px]">
      <div className="min-[1050px]:flex hidden">
        {About_Plans.map((plan, index) => (
          <div
            className={`relative font-semibold mr-3 cursor-pointer border border-[#808080B3] ${
              plan.popular ? "rounded-b-[18px]" : "rounded-[18px]"
            } transition-all duration-300 ease-in-out ${
              index == planSelected
                ? "shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]"
                : ""
            }`}
            onClick={() => setPlanSelected(index)}
          >
            {plan.popular && (
              <div className="absolute bottom-full w-full  text-center left-1/2 -translate-x-1/2">
                <p
                  className={`text-white ${
                    index == planSelected ? " bg-[#6D3BE3]" : "bg-[#000000B3]"
                  } rounded-t-xl transition-all ease-in-out duration-300`}
                >
                  {plan.popular}
                </p>
              </div>
            )}
            <div
              className="m-2 py-2.5 px-4 text-white rounded-xl flex flex-col"
              style={{
                background: plan.background,
              }}
            >
              <h3>{plan.type}</h3>
              <p className="text-sm">{plan.quality}</p>
              <div
                className={`self-end ${
                  index == planSelected ? "visible" : "invisible"
                }`}
              >
                <img src={successIcon} alt="" />
              </div>
            </div>
            <div className="my-4 px-[25px]">
              {Object.entries(plan.details).map(([key, value]) => (
                <div className="py-3 not-last:border-b border-[#80808066] ">
                  <h4 className="text-[13px]  text-[#767676]">
                    {key.replaceAll("_", " ")}
                  </h4>
                  <p className="text-base text-[#000000B3]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden max-[1050px]:block">
        <div className="flex gap-2">
          {About_Plans.map((plan, index) => (
            <div
              className={`relative font-semibold cursor-pointer w-[25%] rounded-xl
               transition-all duration-300 ease-in-out ${
                 index == planSelected
                   ? "shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]"
                   : ""
               }`}
              onClick={() => setPlanSelected(index)}
            >
              <div>
                {plan.popular && (
                  <div className="absolute bottom-full w-full  text-center left-1/2 -translate-x-1/2">
                    <p
                      className={`text-white ${
                        index == planSelected
                          ? " bg-[#6D3BE3]"
                          : "bg-[#000000B3]"
                      } rounded-t-xl transition-all ease-in-out duration-300 text-xs py-1.5 px-2`}
                    >
                      {plan.popular}
                    </p>
                  </div>
                )}
                <div
                  className={`p-3   flex flex-col gap-1.5 border border-[#808080B3] min-h-[107px] ${
                    plan.popular ? "rounded-b-xl" : "rounded-xl"
                  } `}
                  style={{
                    background:
                      index == planSelected ? plan.background : "transparent",
                  }}
                >
                  <h2
                    className={` text-xs font-semibold ${
                      index == planSelected ? " text-white" : "text-black"
                    } `}
                  >
                    {plan.type}
                  </h2>
                  <sub
                    className={`text-[10px] font-semibold text-[#676767] ${
                      index == planSelected ? " text-white" : "text-black"
                    } `}
                  >
                    {plan.quality}
                  </sub>
                  <div
                    className={`mt-auto self-end ${
                      index == planSelected ? "visible" : "invisible"
                    } `}
                  >
                    <img src={successIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul>
          {Object.entries(About_Plans[planSelected].details).map(
            ([key, value]) => (
              <li className="py-3 border-b border-[rgba(128,128,128,0.4)]">
                <div className="flex items-center justify-between">
                  <div className="text-[rgb(118,118,118)] font-bold text-[13px] basis-[40%]">
                    {key.replaceAll("_", " ")}
                  </div>
                  <div className="pl-[13px] text-[rgba(0,0,0,0.7)] font-bold text-right">
                    <p>{Array.isArray(value) ? value.join(", ") : value}</p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
    <div className="my-6 text-[#737373] px-4 max-[1050px]:px-0 font-semibold">
      <small className="block">
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
        to your internet service and device capabilities. Not all content is
        available in all resolutions. See our{" "}
        <span className="text-[#0071eb]">Terms of Use</span> for more details.
      </small>
      <small className="block mt-2.5">
        Only people who live with you may use your account. Watch on 4 different
        devices at the same time with Premium, 2 with Standard, and 1 with Basic
        and Mobile.
      </small>
      <small className="mt-2.5">
        Live events are included with any Netflix plan and contain ads.{" "}
      </small>
    </div>
    <div>
      <div className="mb-5 max-w-[440px] mx-auto">
        <button
          className={`w-full border-0 cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] align-text-top text-[24px] font-semibold  px-6 py-5 rounded ${
            loading ? "bg-[#732527f8]" : "bg-[#e50914] hover:bg-[#C11119]"
          } text-white`}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setStep((prevState) => prevState + 1);
              setLoading(false);
            }, 500);
          }}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : languageData[language].next}
        </button>
      </div>
    </div>
  </div>
);

const Step4 = ({ setStep, loading, setLoading, language }) => (
  <div className="max-w-[500px] mx-auto">
    <div className="pt-5 pb-[60px] px-8 text-center max-[600px]:text-left">
      <div className="mb-5 flex flex-col items-center max-[600px]:items-start">
        <div className="my-5  h-[50px] w-[50px]">
          <img src={Lock} alt="" />
        </div>
        <div>
          <div className="mt-5">
            <span>
            {languageData[language].step} <b>4</b> {languageData[language].of} <b>4</b>
            </span>
            <h1 className="mb-3 text-[32px] font-semibold">
              {languageData[language].choosePlanTitle}
            </h1>
          </div>
        </div>
        <div className="mx-[30px] max-[600px]:mx-0 text-lg">
          <p>{languageData[language].paymentSecurityInfo}</p>
          <h3 className="font-semibold">
            {languageData[language].securePeaceOfMind}
          </h3>
          <h3 className="font-semibold">
            {languageData[language].cancelEasilyOnline}
          </h3>
        </div>
      </div>

      <div className="flex justify-end items-start">
        <span className="text-[13px] font-medium">
          {languageData[language].endToEndEncrypted}
        </span>
        <div className="w-4 h-4 ml-0.5">
          <img className="w-full h-full" src={secure} alt="" />
        </div>
      </div>
      <div className={`relative`}>
        <div className="my-[5px]">
          <button
            className="w-full border-2 border-[#ccc] cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] rounded"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setStep((prevState) => prevState + 1);
                setLoading(false);
              }, 1000);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center py-[15px] my-[5px] ml-[15px] max-[450px]:flex-col max-[450px]:items-start">
                <span className="whitespace-nowrap font-medium">
                  {languageData[language].creditOrDebitCard}
                </span>
                <div className="mx-[15px] flex items-center max-[450px]:mx-0">
                  <img className="mt-1 mr-1.5" src={visa} alt="" />
                  <img className="mt-1 mr-1.5" src={mastercard} alt="" />
                </div>
              </div>
              <div>
                <img src={rightAngleBracket} alt="" />
              </div>
            </div>
          </button>
        </div>
        <div className="my-[5px]">
          <button
            className="w-full border-2 border-[#ccc] cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.68,0.06)] rounded"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setStep((prevState) => prevState + 1);
                setLoading(false);
              }, 1000);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center py-[15px] my-[5px] ml-[15px] max-[450px]:flex-col max-[450px]:items-start">
                <span className="whitespace-nowrap font-medium">
                  {languageData[language].upiAutoPay}
                </span>
                <div className="mx-[15px] flex items-center max-[450px]:mx-0 flex-wrap">
                  <img className="mt-1 mr-1.5" src={bhim} alt="" />
                  <img className="mt-1 mr-1.5" src={paytm} alt="" />
                  <img className="mt-1 mr-1.5" src={phonePe} alt="" />
                  <img className="mt-1 mr-1.5" src={amazonPay} alt="" />
                  <img className="mt-1 mr-1.5" src={googlePay} alt="" />
                </div>
              </div>
              <div>
                <img src={rightAngleBracket} alt="" />
              </div>
            </div>
          </button>
        </div>
        <div
          className={`${
            loading ? "absolute" : "hidden"
          } top-1/2 left-1/2 -translate-1/2`}
        >
          <ClipLoader size={50} color="red" />
        </div>
        {loading && <div className="absolute inset-0 bg-[#ffffff48]"></div>}
      </div>
    </div>
  </div>
);

const Step5 = ({ language }) => (
  <div className="max-w-[1000px] mx-auto text-center p-5">
    <div className="py-[35px]">
      <p className="text-xl  min-[960px]:text-9xl min-[600px]:text-5xl font-bold ">
        {languageData[language].paymentCompleted}{" "}
        <span className="text-red-500">!</span>
      </p>
    </div>
    <Link to="/browse">
      <button className="bg-red-500 text-white p-5 rounded-md font-semibold">
        {languageData[language].readyToWatch}
      </button>
    </Link>
  </div>
);
