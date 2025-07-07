import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import RightAngleBracket from "../../src/assets/rightAngleBracket.svg";
import emailCross from "../../src/assets/emailCross.svg";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../store/slice/emailSlice";
import languageData from "../../src/language";
import { getLanguage } from "../../store/slice/languageSlice";


const GetStarted = () => {
  const [emailCorrect, setEmailCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage)


  const [emailValue, setEmailValue] = useState("");

  function SignUpProcess(e) {
    e.preventDefault();
    setIsTouched(true);

    if (!emailValue.trim()) {
      inputRef.current.focus();
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(emailValue)) {
        setLoading(true);
        setIsSubmitted(false);
        setEmailCorrect(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setEmailCorrect(false);
        setIsSubmitted(true);
      }
    }
  }

  useEffect(() => {
    if (emailCorrect && !loading) {
      navigate("/signup/registration");
    }
  }, [emailCorrect, loading, navigate]);

  return (
    <div className="flex flex-col items-center xl:w-[780px] min-[960px]:w-[643px] min-[600px]:w-[540px] w-[95%] mx-auto">
      <h3 className="text-white text-center min-[960px]:text-base min-[600px]:text-sm text-xs font-medium">
        {languageData[language].description}
      </h3>
      <form className="pt-4  w-full" onSubmit={SignUpProcess} noValidate>
        <div className="w-full flex justify-center text-base max-[600px]:flex-col">
          <div className="flex w-full max-w-[900px] items-start max-[600px]:flex-col gap-4">
            <div className="flex flex-col w-full">
              <input
                className={`w-full px-4 rounded-[50px] bg-[#454546] text-white border-2 font-semibold placeholder:text-[#c8c7c7] placeholder:tracking-[1px] placeholder:font-medium focus:outline-2 focus:outline-white focus:outline-offset-1 h-[56px] ${
                  isTouched
                    ? emailCorrect
                      ? "border-green-500"
                      : "border-red-600"
                    : "border-[#6e6d6e]"
                }`}
                type="email"
                ref={inputRef}
                placeholder={languageData[language].email}
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  dispatch(setEmail(e.target.value));
                }}
              />
              <p
                className={`items-center gap-[5px] text-xs text-[rgb(235,57,66)] mt-2 ${
                  isSubmitted ? "flex" : "hidden"
                }`}
              >
                {emailValue ? (
                  emailCorrect ? (
                    "correct"
                  ) : (
                    <>
                      <img
                        src={emailCross}
                        alt="email-cross"
                        className="mr-1"
                      />
                     {languageData[language].validEmail}
                    </>
                  )
                ) : (
                  <>
                    <img src={emailCross} alt="email-cross" className="mr-1" />
                    {languageData[language].requiredEmail}
                  </>
                )}
              </p>
            </div>
            <button
              className={`flex-grow rounded-[50px] ${
                loading ? "bg-[#e5091466]" : "bg-[#e50914] hover:bg-[#c11119]"
              } text-white px-[30px] py-3 max-[600px]:py-2 border-none text-2xl font-bold cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out min-w-[260px] max-[600px]:w-full h-[56px]`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : languageData[language].getStarted }
              {!loading && (
                <img className="ml-3" src={RightAngleBracket} alt="" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetStarted;
