import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import rightAngleBracket from "../../src/assets/rightAngleBracket.svg";
import cross from "../../src/assets/plus.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogo, getMovieLogo } from "../../store/slice/logoSlice";
import {
  fetchDetail,
  getAllMovieDetail,
} from "../../store/slice/movieDetailSlice";
import { getLanguage } from "../../store/slice/languageSlice";
import languageData from "../../src/language";


const MovieDetailPopUp = ({ movie, onClose }) => {
  const [isNavigating , setisNavigating ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movielogo = useSelector(getMovieLogo);
  const movieDetail = useSelector(getAllMovieDetail);
  const language = useSelector(getLanguage)

  useEffect(() => {
    if (!movielogo?.[movie.id]) dispatch(fetchLogo(movie.id));
    if (!movieDetail?.[movie.id]) dispatch(fetchDetail(movie.id));
  }, [movie.id]);

  useEffect(() => {
    if (isNavigating ) {
      setTimeout(() => {
        navigate("/signup/registration");
      }, 1000);
    }
  }, [isNavigating ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-[#000000B3] max-h-screen z-50"></div>
      <div className={`${styles.popUp} w-[670px] max-[670px]:w-full fixed top-1/2 left-1/2 -translate-1/2  border border-gray-500/40 rounded-md shadow-[0px_4px_8px_0px_rgba(0,0,0,0.8)] overflow-hidden z-50 bg-[#161616] text-white max-h-[700px] overflow-y-scroll`}>
        <div className="relative">
          <div className={styles.popUpImg}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt=""
            />
          </div>
          <div className="absolute bottom-0 left-10 max-[600px]:left-4 z-50 w-[calc(60%-5rem)]">
            <img
              src={`https://image.tmdb.org/t/p/original${
                movielogo?.[movie.id]
              }`}
              alt=""
              className="w-full"
            />
          </div>
          <button
            className="absolute top-4 right-4 cursor-pointer z-[100]"
            onClick={onClose}
          >
            <img className="rotate-z-45" src={cross} alt="" />
          </button>
        </div>
        <div className="px-10 pt-4 max-[600px]:px-4 max-[600px]:pb-6 pb-10">
          <ul className="mb-4 flex items-center gap-2">
            <li className="border border-[#414141] rounded-sm  px-1 py-[3px] bg-[#414141]">
              {movieDetail?.[movie.id]?.releaseDate}
            </li>
            <li className="border border-[#414141] rounded-sm  px-1 py-[3px] bg-[#414141]">
              {movieDetail?.[movie.id]?.ageRating}
            </li>
            <li className="flex gap-2">
              {movieDetail?.[movie.id]?.genres.map((genre,index) => (
                <span key={index} className="border border-[#414141] rounded-sm  px-1 py-[3px] bg-[#414141]">{genre}</span>
              ))}
            </li>
          </ul>
          <div className="pt-4">
            <p>{movie.overview}</p>
          </div>
          <div className="pt-10">
            <button
              className={`flex items-center justify-center cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out text-lg font-semibold rounded-sm ${
                isNavigating  ? "bg-[#e5091466]" : "bg-[#e50914] hover:bg-[#c11119]"
              }`}
              onClick={() => setisNavigating (true)}
            >
              <div className="relative flex items-center w-[110px] h-[28px] justify-center">
                {isNavigating  ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  <span>{languageData[language].getStarted}</span>
                )}
              </div>
              {!isNavigating  && (
                <img className="ml-3" src={rightAngleBracket} alt="" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("movieDetail-root")
  );
};

export default MovieDetailPopUp;
