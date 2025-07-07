import React from "react";
import bg_img from "../../src/assets/background_img.jpg";
import GetStarted from "./GetStarted";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import languageData from "../../src/language";
import { useSelector } from "react-redux";
import { getLanguage } from "../../store/slice/languageSlice";

const NetflixMainContent = () => {
  const language = useSelector(getLanguage);

  return (
    <div className={styles.NetflixPageMainContentContainer}>
      <div className={styles.background}>
        <img src={bg_img} alt="background" />
        <img src={bg_img} alt="background" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/90"></div>
      <div className="z-10 w-full text-center flex items-center justify-center flex-col  mt-20 px-3">
        <div className="xl:w-[600px] min-[960px]:w-[586px] min-[600px]:w-[394px] w-full">
          <h1 className="font-black xl:text-[56px] min-[600px]:text-[32px] text-2xl min-[960px]:text-5xl leading-tightmb-2">
            {languageData[language].title}
          </h1>
          <p className="mb-6 xl:text-2xl min-[960px]:text-lg text-base  font-medium">
            {languageData[language].subtitle}
          </p>
        </div>
        <GetStarted />
      </div>
    </div>
  );
};

export default NetflixMainContent;
