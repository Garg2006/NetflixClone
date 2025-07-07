import React, { useState } from "react";
import { useSelector } from "react-redux";
import rightAngleBracket from "../../src/assets/rightAngleBracket.svg";
import leftAngleBracket from "../../src/assets/leftAngleBracket.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import MovieDetailPopUp from "./MovieDetailPopUp";
import { getAllMoviesList } from "../../store/slice/allCategoriesSlice";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NetflixTrendingContent = () => {
  const [transformWidth, setTransformWidth] = useState(0);
  const [totalWidthLeft, setTotalWidthLeft] = useState(null);
  const [newStyle, setNewStyle] = useState("");
  const [leftAngleOpener, setLeftAngleOpener] = useState(false);
  const [rightAngleOpener, setRightAngleOpener] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const AllMovieList = useSelector(getAllMoviesList);
  const language = useSelector(getLanguage);

  const right = (scrollWidth, clientWidth) => {
    let width =
      totalWidthLeft !== null
        ? totalWidthLeft - clientWidth
        : scrollWidth - clientWidth;
    if (width <= 0) {
      width = 0;
      setNewStyle("fullyRight");
      setRightAngleOpener(false);
    } else {
      setNewStyle("right");
      setLeftAngleOpener(true);
    }
    setTotalWidthLeft(width);
    let transformingWidth = scrollWidth - width;
    setTransformWidth(transformingWidth);
  };

  const left = (scrollWidth, clientWidth) => {
    let width =
      totalWidthLeft >= 0 ? totalWidthLeft + clientWidth : scrollWidth;
    if (width >= scrollWidth) {
      width = scrollWidth;
      setNewStyle("fullyLeft");
      setLeftAngleOpener(false);
    } else {
      setNewStyle("left");
      setRightAngleOpener(true);
    }
    setTotalWidthLeft(width);
    let transformingWidth = scrollWidth - width;
    setTransformWidth(transformingWidth);
  };

  return (
    <div>
      <h2 className="text-[#c2b7b9] mt-3 text-[32px] max-[1280px]:text-xl font-bold">
        {languageData[language].trendingNow}
      </h2>
      <div className="relative">
        {AllMovieList.Trending.status && (
          <div
            className={`z-10 cursor-pointer top-1/2 -translate-y-1/2 absolute h-20 w-6 rounded-[256px] border-none flex items-center justify-center bg-[#80808066] transition-all duration-1000 ease-in-out ${
              leftAngleOpener
                ? "opacity-100 -left-8 max-[960px]:left-0 "
                : "opacity-0 -left-[100px]"
            }`}
            onClick={(e) => {
              const clientWidth = e.currentTarget.nextSibling.clientWidth;
              const scrollWidth =
                e.currentTarget.nextSibling.scrollWidth - clientWidth;
              left(scrollWidth, clientWidth);
            }}
          >
            <img src={leftAngleBracket} alt="" />
          </div>
        )}

        <div
          className={`${styles.InnertrendingContentContainer} ${styles[newStyle]}`}
        >
          {AllMovieList.Trending.status
            ? AllMovieList.Trending.data?.map((movie, index) => {
                return (
                  <div
                    key={index}
                    className="relative group w-1/2 sm:w-1/3 md:w-1/4  lg:w-1/5 xl:w-1/6 shrink-0"
                    style={{
                      transform: `translate(-${transformWidth}px)`,
                      transition: "all 0.7s ease-in-out",
                    }}
                    onClick={() => {
                      setSelectedMovie(movie);
                      setIsOpen(true);
                    }}
                  >
                    <div className="w-full">
                      <img
                        className="w-full group-hover:scale-[1.07] object-cover bg-white rounded-2xl aspect-[2/3.5] transition-transform duration-300 ease-in-out cursor-pointer"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <h1
                      className="group-hover:scale-[1.07] absolute top-[30px] -left-[18px] text-[72px] font-black text-black/80 drop-shadow-[0_0_1.5rem_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out"
                      style={{
                        WebkitTextStroke: "0.125rem white",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {index + 1}
                    </h1>
                  </div>
                );
              })
            : Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={350}
                  width={200}
                  baseColor="rgba(255, 255, 255, 0.05)"
                  highlightColor="rgba(255, 255, 255, 0.2)"
                  borderRadius={16}
                />
              ))}
        </div>

        {AllMovieList.Trending.status && (
          <div
            className={`z-10 cursor-pointer top-1/2 -translate-y-1/2 absolute h-20 w-6 rounded-[256px] border-none flex items-center justify-center bg-[#80808066] transition-all duration-1000 ease-in-out ${
              rightAngleOpener
                ? "opacity-100 -right-8 max-[960px]:right-0"
                : "opacity-0 -right-[100px]"
            }`}
            onClick={(e) => {
              const clientWidth = e.currentTarget.previousSibling.clientWidth;
              const scrollWidth =
                e.currentTarget.previousSibling.scrollWidth - clientWidth;
              right(scrollWidth, clientWidth);
            }}
          >
            <img src={rightAngleBracket} alt="" />
          </div>
        )}
      </div>

      {isOpen && (
        <MovieDetailPopUp
          movie={selectedMovie}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NetflixTrendingContent;
