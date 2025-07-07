import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyMovieList } from "../../../store/slice/myListSlice";
import MovieCard from "../MovieCard";
import undo from "../../../src/assets/undo.svg";
import { getLanguage } from "../../../store/slice/languageSlice";
import languageData from "../../../src/language";
import { addMovieToList } from "../../../store/slice/myListSlice";
import { addIdToList } from "../../../store/slice/myListIdCheckedSlice";

const MyList = () => {
  const movieList = useSelector(getAllMyMovieList);
  const language = useSelector(getLanguage);
  const [movieName, setMovieName] = useState("");
  const dispatch = useDispatch();
  const [undoMovie, setUndoMovie] = useState("");

  
  useEffect(() => {
    if (!movieName) return;
    const timeout = setTimeout(() => {
      setMovieName("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [movieName]);

  const getItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 6;
    if (width >= 1024) return 5;
    if (width >= 768) return 4;
    if (width >= 640) return 3;
    return 2;
  };

  return (
    <>
      <div className="fixed top-[68px] max-[950px]:top-[41px] px-[60px] max-[875px]:px-[30px] h-[68px] w-full z-20 bg-[#141414]">
        <h1 className="text-3xl font-bold mr-5 max-[875px]:text-xl">
          {languageData[language].myList}
        </h1>
      </div>
      <div className="pt-[132px] h-[1000px] z-10 text-center">
        <div className="xl:mt-[50px] md:pt-[50px]">
          {movieList.length ? (
            <div className="px-[4%] flex flex-wrap gap-y-[5.5vw]">
              {movieList.map((movie, index) => {
                const itemsPerRow = getItemsPerRow();
                let transformOriginClass = "origin-center";
                if (index % itemsPerRow === 0)
                  transformOriginClass = "origin-left";
                else if ((index + 1) % itemsPerRow === 0)
                  transformOriginClass = "origin-right";

                return (
                  <MovieCard
                    key={movie.id}
                    setMovieName={setMovieName}
                    movie={movie}
                    transformOriginClass={transformOriginClass}
                    setUndoMovie={setUndoMovie}
                  />
                );
              })}
            </div>
          ) : (
            <div className="pt-[100px] text-[#666] text-lg max-[875px]:text-sm">
              {languageData[language].noTitlesInList}
            </div>
          )}
        </div>
      </div>
      {movieName && (
        <div className="bg-white md:rounded-full left-0 right-0 text-black fixed bottom-12 md:mx-[22.5%] flex items-center justify-between md:px-11 px-3 text-xl py-3">
          <h1 className="font-bold">
            {movieName}{" "}
            <span className="font-normal">
              {languageData[language].removedFromList}
            </span>
          </h1>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(addIdToList(undoMovie.id));
              dispatch(addMovieToList(undoMovie));
              setMovieName("");
            }}
          >
            <div className="w-6">
              <img src={undo} alt="" className="w-full" />
            </div>
            <h3>{languageData[language].undo}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default MyList;
