import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { getMovieTrailer } from "../../store/slice/trailerSlice";
import YouTube from "react-youtube";
import { getMovieLogo } from "../../store/slice/logoSlice";
import cross from "../../src/assets/plus.svg";
import { getAllMovieDetail } from "../../store/slice/movieDetailSlice";
import play_button from "../../src/assets/play.svg";
import AddToWishListButton from "./AddToWishListButton";
import LikeButton from "./LikeButton";
import volume from "../../src/assets/volume.svg";
import noVolume from "../../src/assets/noVolume.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";

const MovieMoreInfoPopUp = ({ movie, onClose, setIsEnded }) => {
  const trailerKey = useSelector(getMovieTrailer);
  const logoList = useSelector(getMovieLogo);
  const movieDetailList = useSelector(getAllMovieDetail);
  const [keywords, setKeywords] = useState([]);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const movieRef = useRef();

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      playsinline: 1,
      disablekb: 1,
      fs: 0,
      showinfo: 0,
    },
  };

  const onPlayerReady = (event) => {
    movieRef.current = event.target;
  };

  const toggleVolume = useCallback(() => {
    if (!movieRef.current) return;
    isVolumeOn ? movieRef.current.mute() : movieRef.current.unMute();
    setIsVolumeOn(!isVolumeOn);
  });

  const getMovieRuntime = (movieId) => {
    let hour = Math.floor(movieDetailList?.[movieId]?.runtime / 60);
    let minute = movieDetailList?.[movieId]?.runtime % 60;
    return `${hour}h ${minute}m`;
  };

  useEffect(() => {
    const getKeywords = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=ab4277f33df789b3e58cdc46a85b3991`
        );
        const data = await res.json();
        setKeywords(data.keywords.map((k) => k.name));
      } catch (error) {
        console.error("Keyword fetch failed:", error);
      }
    };

    getKeywords();
  }, [movie.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsEnded ? setIsEnded(true) : "";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-[#000000B3] max-h-screen z-30"></div>
      <div
        className={`${styles.popUp} min-[900px]:w-[860px] mx-auto max-[900px]:mx-5 left-0 right-0 fixed top-[75px]  border border-gray-500/40 rounded-md shadow-[0px_3px_10px_rgba(0,0,0,0.75)] h-[80%] overflow-y-scroll z-[100] bg-[#161616] text-white `}
      >
        <div className="relative">
          <div className="relative min-[950px]:h-[500px] min-[600px]:h-[400px] min-[500px]:h-[300px] min-[400px]:h-[250px] h-[200px]  overflow-hidden">
            <div className="h-full after:absolute after:inset-0 after:content-[''] after:bg-[linear-gradient(0deg,_#181818,_transparent_50%)] after:z-10">
              <div className="w-full h-full">
                {trailerKey?.[movie.id] ? (
                  <div className="w-full h-full scale-150">
                    <YouTube
                      videoId={trailerKey?.[movie.id]}
                      opts={opts}
                      onReady={onPlayerReady}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover bg-white  transition-transform duration-300 ease-in-out"
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-[10%] min-[600px]:left-10  left-5 z-20 w-[calc(100%-5rem)]">
            <div className="min-[600px]:mb-6 mb-2  w-32  min-[600px]:w-96">
              <img
                src={`https://image.tmdb.org/t/p/original${logoList[movie.id]}`}
                alt=""
                className="w-full"
              />
            </div>
            <div className="w-full flex mb-4 items-center gap-1">
              <div>
                <button className="bg-white hover:bg-[rgba(255,255,255,0.75)] text-black flex items-center py-2 pr-[23px] max-[600px]:py-1 max-[600px]:px-3 pl-5 rounded-sm gap-3 max-[600px]:gap-2 mr-2.5 mb-2.5 max-[600px]:mb-0 cursor-pointer">
                  <img
                    src={play_button}
                    alt=""
                    className="xl:w-6 min-[950px]:w-5 min-[600px]:w-4 w-3"
                  />
                  <span className="font-semibold xl:text-2xl min-[950px]:text-base min-[600px]:text-xs text-[9px]">
                    Play
                  </span>
                </button>
              </div>
              <AddToWishListButton movie={movie} />
              <LikeButton />
            </div>
          </div>
          <button
            className="absolute top-0 right-0 m-4 cursor-pointer z-[100] bg-[#181818] rounded-full p-2 w-10"
            onClick={onClose}
          >
            <img className="rotate-z-45" src={cross} alt="" />
          </button>
          <div className="absolute min-[600px]:bottom-[15%] bottom-5 min-[600px]:right-4 right-5 z-10">
            <button
              className="border w-10 max-[600px]:w-6 max-[600px]:p-1 border-[rgba(255,255,255,0.7)] p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer active:bg-[rgba(255,255,255,0.7)]"
              onClick={toggleVolume}
            >
              <img src={isVolumeOn ? volume : noVolume} alt="" />
            </button>
          </div>
        </div>
        <div className="px-12">
          <div className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-x-8 font-medium">
            <div>
              <div className="my-3">
                <div className="text-[#bcbcbc]">
                  <span className="mr-2">
                    {movieDetailList?.[movie.id]?.releaseDate}
                  </span>
                  <span className="mr-2">{getMovieRuntime(movie.id)}</span>
                </div>
                <div className="mt-[1px] mb-2">
                  <span className="mr-2">
                    <span className="border border-[#FFFFFF66] px-[6.4px]">
                      {movieDetailList?.[movie.id]?.ageRating || "N/A"}
                    </span>
                  </span>
                  <span className="text-sm">
                    {movieDetailList?.[movie.id]?.genres.join(", ")}
                  </span>
                </div>
              </div>
              <div className="pt-4 mb-[7px] mt-[22px] text-sm">
                <p>{movie.overview}</p>
              </div>
            </div>
            <div className="text-sm">
              <div className="my-[7px] mr-[7px]">
                <span className="text-[#777]">Cast: </span>
                {movieDetailList?.[movie.id]?.castNames.slice(0, 4).join(", ")}
                {movieDetailList?.[movie.id]?.castNames && <span>, more</span>}
              </div>
              <div className="my-[7px] mr-[7px]">
                <span className="text-[#777]">Genres: </span>
                {movieDetailList?.[movie.id]?.genres.join(", ")}
              </div>
              <div className="my-[7px] mr-[7px]">
                <span className="text-[#777]">This movie is: </span>
                {keywords?.slice(0, 4).join(", ")}
                {keywords && <span>, more</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("movieMoreInfo-root")
  );
};

export default MovieMoreInfoPopUp;
