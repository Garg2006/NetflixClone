import React, { useEffect, useRef, useState } from "react";
import { getMovieLogo } from "../../store/slice/logoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieDetail } from "../../store/slice/movieDetailSlice";
import YouTube from "react-youtube";
import { fetchTrailer, getMovieTrailer } from "../../store/slice/trailerSlice";
import downArrow from "../../src/assets/downArrow.svg";
import play_button from "../../src/assets/play.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import MovieMoreInfoPopUp from "./MovieMoreInfoPopUp";
import AddToWishListButton from "./AddToWishListButton";
import LikeButton from "./LikeButton";

const MovieCard = ({
  movie,
  transformOriginClass,
  setMovieName,
  trailerRef,
  setIsEnded,
  isEnded,
  mainMovieContainerRef,
  setUndoMovie
}) => {
  const dispatch = useDispatch();
  const [showTrailer, setShowTrailer] = useState({});
  const logoList = useSelector(getMovieLogo);
  const movieDetailList = useSelector(getAllMovieDetail);
  const trailerKey = useSelector(getMovieTrailer);
  const [movieMoreDetail, setMovieMoreDetail] = useState(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (trailerRef && trailerRef.current) {
      if (!isEnded) {
        if (
          Object.values(showTrailer)[0] == false &&
          window.scrollY < mainMovieContainerRef.current.clientHeight - 100
        ) {
          setTimeout(() => {
            trailerRef.current?.playVideo();
          }, 0);
        } else {
          setTimeout(() => {
            trailerRef.current.pauseVideo();
          }, 0);
        }
      }
    }
    // }
  }, [showTrailer]);

  const opts2 = {
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
      // showinfo: 0,
    },
  };

  const getMovieRuntime = (movieId) => {
    let hour = Math.floor(movieDetailList?.[movieId]?.runtime / 60);
    let minute = movieDetailList?.[movieId]?.runtime % 60;
    return `${hour}h ${minute}m`;
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setShowTrailer({ [movie.id]: true });
      dispatch(fetchTrailer(movie.id));
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setShowTrailer({ [movie.id]: false });
  };

  const handleClick = () => {
    if (window.innerWidth < 875) setMovieMoreDetail(movie);
  };

  const moviePoster =
    showTrailer?.[movie.id] && trailerKey?.[movie.id] ? (
      <div className="w-full h-full scale-[180%] pointer-events-none">
        <YouTube
          videoId={trailerKey?.[movie.id]}
          opts={opts2}
          className="w-full h-full"
        />
      </div>
    ) : (
      <img
        className="w-full h-full object-cover bg-white  transition-transform duration-300 ease-in-out"
        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
      />
    );

  return (
    <>
      <div
        key={movie.id}
        className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 inline-block relative hover:z-[999] z-10"
      >
        <div
          className={`group relative transition-all duration-300 ease-in-out  
    hover:scale-125 max-[500px]:hover:scale-x-[135%] max-[400px]:hover:scale-x-[170%] hover:-translate-y-[100%] px-1 ${transformOriginClass}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <div className="hover:shadow-[0px_3px_18px_12px_rgba(0,0,0,0.75)] overflow-hidden hover:rounded-tl-md hover:rounded-tr-sm">
            <div className="w-full h-[150px] max-[600px]:h-[120px] cursor-pointer">
              {moviePoster}
            </div>
            {logoList?.[movie.id] && (
              <>
                {showTrailer[movie.id] ? (
                  <div className="absolute bottom-3 left-3 w-[20%]">
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        logoList[movie.id]
                      }`}
                      alt="logo"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="absolute bottom-3 left-3 w-[50%]">
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        logoList[movie.id]
                      }`}
                      alt="logo"
                      className="w-full"
                    />
                  </div>
                )}
              </>
            )}
            {showTrailer?.[movie.id] && (
              <div className="absolute top-full right-0 left-0 mx-1 bg-[#181818] group-hover:rounded-bl-md group-hover:rounded-br-md p-4 group-hover:shadow-[0px_1px_28px_rgba(0,0,0,0.75)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="m-1">
                      <button
                        className="w-7 h-7 bg-white hover:bg-[#FFFFFFBF] flex items-center justify-center rounded-full cursor-pointer border-2 border-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img src={play_button} alt="" className="p-1  w-full" />
                      </button>
                    </div>
                    <AddToWishListButton
                      movie={movie}
                      setMovieName={setMovieName}
                      setUndoMovie={setUndoMovie}
                    />
                    <LikeButton />
                  </div>
                  <div className={`relative ${styles.moreInfoContainer} m-1`}>
                    <button
                      className="w-7 h-7 bg-[#2A2A2A99]  flex items-center justify-center rounded-full cursor-pointer border-2 border-[#FFFFFF80] hover:border-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMovieMoreDetail(movie);
                      }}
                    >
                      <img src={downArrow} alt="" className="p-1  w-full" />
                    </button>
                    <div className={`${styles.moreInfo}`}>More info</div>
                  </div>
                </div>
                <div className="my-3 ml-2">
                  <span className="mr-2">
                    <span className=" text-[#bcbcbc] border border-[#FFFFFF66] px-[6.4px]">
                      {movieDetailList?.[movie.id]?.ageRating || "N/A"}
                    </span>
                  </span>
                  <span className="mr-2">
                    <span className=" text-[#bcbcbc] px-[6.4px]">
                      {getMovieRuntime(movie.id)}
                    </span>
                  </span>
                </div>
                <div>
                  <div className="text-xs flex items-center gap-1 flex-wrap">
                    {movieDetailList?.[movie.id]?.genres?.map((genre) => (
                      <React.Fragment key={genre}>
                        <span>{genre}</span>
                        <span className="text-[#bcbcbc] last:opacity-0">
                          {" "}
                          •{" "}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {movieMoreDetail && (
        <MovieMoreInfoPopUp
          movie={movieMoreDetail}
          onClose={() => {
            setShowTrailer({ [movie.id]: false });
            setMovieMoreDetail(null);
            setIsEnded(false);
          }}
          setIsEnded={setIsEnded}
        />
      )}
    </>
  );
};

export default MovieCard;
