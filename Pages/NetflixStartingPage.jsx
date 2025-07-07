import React, { useEffect, useState } from "react";
import NetflixPageHeader from "../components/NetflixStartingPageComponents/NetflixPageHeader";
import NetflixMainContent from "../components/NetflixStartingPageComponents/NetflixMainContent";
import NetflixTrendingContent from "../components/NetflixStartingPageComponents/NetflixTrendingContent";
import { useDispatch, useSelector } from "react-redux";
import Faq from "../components/NetflixStartingPageComponents/Faq";
import GetStarted from "../components/NetflixStartingPageComponents/GetStarted";
import Footer from "../components/Footer";
import styles from "../src/styleSheet/NetflixStartingPage.module.css";
import { movieThunks } from "../store/slice/allCategoriesSlice";
import { getLanguage } from "../store/slice/languageSlice";

const NetflixStartingPage = () => {
  const dispatch = useDispatch();
  const language=  useSelector(getLanguage)

  useEffect(() => {
    dispatch(movieThunks.Trending(language));
  }, [dispatch,language]);
  
  return (
    <div className={styles.container_Top}>
      <div className="xl:px-12 lg:px-9 sm:px-8 p-6 py-[25px] overflow-x-hidden">
        <NetflixPageHeader  />
        <NetflixMainContent />
        <div className="w-[85%] mx-auto max-[960px]:w-full ">
          <NetflixTrendingContent />
          <Faq />
          <GetStarted settingWidth="w-[680px] mx-auto" />
          <div className="text-[#FFFFFFB3] pt-[68px] font-semibold">
            <Footer
              displayFull={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixStartingPage;
