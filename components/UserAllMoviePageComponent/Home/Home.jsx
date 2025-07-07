import YouTube from "react-youtube";
import play_button from "../../../src/assets/play.svg";
import info from "../../../src/assets/info.svg";
import MovieComponent from "../MovieComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrailer,
  getMovieTrailer,
} from "../../../store/slice/trailerSlice";
import { fetchPoster, getMovie } from "../../../store/slice/posterSlice";
import { fetchLogo, getMovieLogo } from "../../../store/slice/logoSlice";
import { useEffect, useState } from "react";
import {
  getAllMoviesList,
  movieThunks,
} from "../../../store/slice/allCategoriesSlice";
import {
  fetchDetail,
  getAllMovieDetail,
} from "../../../store/slice/movieDetailSlice";
import noVolume from "../../../src/assets/noVolume.svg";
import volume from "../../../src/assets/volume.svg";
import repeat from "../../../src/assets/repeat.svg";
import { useRef } from "react";
import MovieMoreInfoPopUp from "../MovieMoreInfoPopUp";
import { getLanguage } from "../../../store/slice/languageSlice";
import languageData from "../../../src/language";

const titleList = [
  "Today's Top Pick for You",
  "Popular Movies Right Now",
  "UpComing Movies",
  "Top Rated's",
  "Romantic Tv Shows",
  "Crime",
  "Animation",
];

const Home = () => {
  const dispatch = useDispatch();
  const trailerKey = useSelector(getMovieTrailer);
  const movie = useSelector(getMovie);
  const [isEnded, setIsEnded] = useState(true);
  const logoList = useSelector(getMovieLogo);
  const AllmoviesList = useSelector(getAllMoviesList);
  const featuredMovie = "911430";
  const movieDetailList = useSelector(getAllMovieDetail);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [replay, setReplay] = useState(false);
  const [movieMoreDetail, setMovieMoreDetail] = useState(null);
  const language = useSelector(getLanguage);
  const mainMovieContainerRef = useRef(null);
  const trailerRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (trailerRef.current) {
        window.scrollY > mainMovieContainerRef?.current.clientHeight - 100
          ? trailerRef.current.pauseVideo()
          : trailerRef.current.playVideo()
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("load", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchLogo(featuredMovie));
    dispatch(fetchPoster(featuredMovie));
    dispatch(fetchTrailer(featuredMovie));
    dispatch(fetchDetail(featuredMovie));
    Object.keys(movieThunks).forEach((name) =>
      dispatch(movieThunks[name](language))
    );
    setTimeout(() => {
      setIsEnded(false);
    }, 1000);
  }, []);

  const handleEnd = () => {
    setIsEnded(true);
    setReplay(true);
  };

  useEffect(() => {
    if (!isEnded) {
      const timeout = setTimeout(() => {
        setFadeOut(true);
      }, 10000);
      return () => {
        clearTimeout(timeout);
        setFadeOut(false);
      };
    }
  }, [isEnded]);

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

  useEffect(() => {
    let timeout;
    if (!isEnded && trailerRef.current) {
      timeout = setTimeout(() => {
        if (isVolumeOn) {
          trailerRef.current.unMute();
        } else {
          trailerRef.current.mute();
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isEnded]);

  const toggleVolume = () => {
    if (!trailerRef.current) return;
    isVolumeOn ? trailerRef.current.mute() : trailerRef.current.unMute();
    setIsVolumeOn(!isVolumeOn);
  };

  const onPlayerReady = (event) => {
    trailerRef.current = event.target;
  };

  useEffect(() => {
    if (!AllmoviesList || !AllmoviesList.Trending?.data?.length) return;

    const flatMovies = Object.values(AllmoviesList)
      .map((list) => list.data)
      .flat();
    const uniqueMovieIds = new Set(flatMovies.map((m) => m.id));

    uniqueMovieIds.forEach((id) => {
      dispatch(fetchLogo(id));
      dispatch(fetchDetail(id));
    });
  }, [AllmoviesList.Trending.data]);

  return (
    <>
      <div className="relative w-full flex items-center justify-center aspect-video overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 right-[26.09%] opacity-100 transition-opacity duration-[0.5s] [background:linear-gradient(77deg,_rgba(0,_0,_0,_0.7),_transparent_80%)] z-[10]"></div>
        <div className="bg-[linear-gradient(180deg,hsla(0,0%,8%,0)_0,hsla(0,0%,8%,.15)_15%,hsla(0,0%,8%,.35)_29%,hsla(0,0%,8%,.58)_44%,#141414_68%,#141414)] bg-repeat-x bg-[length:100%_100%] bg-[position:0_top] bg-transparent opacity-100 w-full h-[14.7vw] absolute -bottom-px top-auto z-10"></div>
        {isEnded ? (
          <div className="w-full" ref={mainMovieContainerRef}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt=""
              className="w-full"
            />
          </div>
        ) : (
          <div className="w-[90%] h-full scale-150" ref={mainMovieContainerRef}>
            <YouTube
              videoId={trailerKey?.[featuredMovie]}
              opts={opts}
              className="w-full h-full object-cover"
              onReady={onPlayerReady}
              onEnd={handleEnd}
            />
          </div>
        )}
        <div className="absolute xl:bottom-56 xl:left-24 min-[950px]:bottom-32 min-[950px]:left-16 min-[750px]:bottom-32  min-[750px]:left-8 left-[15px] bottom-12  max-[700px]:w-[50%] w-[30%] z-[10]">
          <div className=" max-[400px]:w-[40%] max-[700px]:w-[60%] w-full max-[700px]:mb-2 mb-[15px] cursor-none">
            <img
              src={`https://image.tmdb.org/t/p/original${logoList?.[featuredMovie]}`}
              alt="logo"
              className="w-full"
            />
          </div>
          <div
            className={`transition-all duration-1000 ease-in-out overflow-hidden cursor-none  ${
              fadeOut ? "opacity-0 max-h-0 " : "opacity-100 max-h-[500px]"
            }`}
            ref={descriptionRef}
          >
            <p className="xl:text-xl min-[950px]:text-base min-[600px]:text-xs text-[6px] min-[400px]:text-[8px]">
              {movie.overview}
            </p>
          </div>
          <div className="flex items-center mt-5 max-[600px]:mt-1">
            <div>
              <button className="bg-white hover:bg-[rgba(255,255,255,0.75)] text-black flex items-center py-2 pr-[23px] max-[600px]:py-1 max-[600px]:px-3 pl-5 rounded-sm gap-3 max-[600px]:gap-2 mr-2.5 mb-2.5 cursor-pointer">
                <img
                  src={play_button}
                  alt=""
                  className="xl:w-6 min-[950px]:w-5 min-[600px]:w-4 w-3"
                />
                <span className="font-semibold xl:text-2xl min-[950px]:text-base min-[600px]:text-xs text-[9px]">
                  {languageData[language].play}
                </span>
              </button>
            </div>
            <div>
              <button
                className="text-white bg-[#6D6D6EB3] hover:bg-[#6d6d6e70] flex items-center py-2 pr-[23px] pl-5 rounded-sm gap-3 max-[600px]:gap-2 max-[600px]:py-1 max-[600px]:px-3 mr-2.5 mb-2.5 cursor-pointer"
                onClick={() => setMovieMoreDetail(movie)}
              >
                <img
                  src={info}
                  alt=""
                  className="xl:w-6 min-[950px]:w-5 min-[600px]:w-4 w-3"
                />
                <span className="font-semibold whitespace-nowrap xl:text-2xl min-[950px]:text-base min-[600px]:text-xs text-[9px]">
                  {languageData[language].moreInfo}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-[35%] flex items-center">
          <div className="mr-[1vw]">
            {isEnded ? (
              replay && (
                <button
                  className="max-[600px]:w-6 max-[600px]:p-1 border border-[rgba(255,255,255,0.7)] p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer active:bg-[rgba(255,255,255,0.7)]"
                  onClick={() => {
                    setIsEnded(false);
                  }}
                >
                  <img src={repeat} alt="" className="w-full" />
                </button>
              )
            ) : (
              <button
                className="w-10 max-[600px]:w-6 max-[600px]:p-1 border border-[rgba(255,255,255,0.7)] p-2.5 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer active:bg-[rgba(255,255,255,0.7)]"
                onClick={toggleVolume}
              >
                <img
                  src={isVolumeOn ? volume : noVolume}
                  alt=""
                  className="w-full"
                />
              </button>
            )}
          </div>
          <div className="bg-[rgba(51,51,51,0.6)] border-l-[3px] border-[#dcdcdc] py-[.5vw] pr-[3.5vw] pl-[.8vw] min-[950px]:text-2xl min-[600px]:text-xl text-xs max-[600px]:pl-[3vw] ">
            {movieDetailList?.[featuredMovie]?.ageRating}
          </div>
        </div>
      </div>
      <div className="-mt-[150px] max-[750px]:-mt-10 pb-[70px] z-10 relative">
        {Object.values(AllmoviesList).map((list, index) => (
          <MovieComponent
            key={index}
            title={titleList[index]}
            movies={list.data}
            trailerRef={trailerRef}
            setIsEnded={setIsEnded}
            isEnded={isEnded}
            mainMovieContainerRef={mainMovieContainerRef}
          />
        ))}
      </div>
      {movieMoreDetail && (
        <MovieMoreInfoPopUp
          movie={movieMoreDetail}
          onClose={() => setMovieMoreDetail(null)}
          setIsEnded={setIsEnded}
        />
      )}
    </>
  );
};

export default Home;
