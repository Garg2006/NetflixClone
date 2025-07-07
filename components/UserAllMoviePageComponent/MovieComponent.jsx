import { useRef, useState } from "react";
import LeftButton from "./leftButton";
import MovieCard from "./MovieCard";
import RightButton from "./RightButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieComponent = ({ movies, title, trailerRef, setIsEnded, isEnded,mainMovieContainerRef }) => {
  const [leftButtonVisible, setLeftButtonVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const ContainerRef = useRef();


  function transformFunctionRight() {
    const container = ContainerRef?.current?.parentElement;
    const content = ContainerRef?.current;
    if (!container || !content) return;

    const clientWidth = container.clientWidth;
    const scrollWidth = content.scrollWidth;

    const widthLeft = scrollWidth - clientWidth - scrollOffset;

    if (widthLeft > 0) {
      setLeftButtonVisible(true);
      if (widthLeft >= clientWidth) {
        setScrollOffset((prev) => prev + clientWidth);
      } else setScrollOffset((prev) => prev + widthLeft);
    }
  }

  function transformFunctionLeft() {
    const container = ContainerRef.current?.parentElement;
    if (!container) return;

    const clientWidth = container.clientWidth;
    const widthLeft = scrollOffset - clientWidth;

    if (widthLeft > 0) {
      setScrollOffset(widthLeft);
    } else {
      setLeftButtonVisible(false);
      setScrollOffset(0);
    }
  }

  const getItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 6;
    if (width >= 1024) return 5;
    if (width >= 768) return 4;
    if (width >= 640) return 3;
    return 2;
  };

  return (
    <div className="my-8 z-0">
      <h4 className="text-[22px] max-[800px]:text-xs font-semibold mb-3 mx-[4%] w-max">
        {title}
      </h4>
      <div className="relative whitespace-nowrap px-[4%] z-0 hover:z-[999]">
        <div className="relative group">
          <LeftButton
            leftButtonVisible={leftButtonVisible}
            onClick={transformFunctionLeft}
          />
          <div
            className="transition-all duration-1000 ease-in-out "
            style={{ transform: `translateX(-${scrollOffset}px)` }}
            ref={ContainerRef}
          >
            {movies.length
              ? movies.map((movie, index) => {
                  const itemsPerRow = getItemsPerRow();
                  let transformOriginClass = "origin-center";
                  if (index % itemsPerRow === 0)
                    transformOriginClass = "origin-left";
                  else if ((index + 1) % itemsPerRow === 0)
                    transformOriginClass = "origin-right";

                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      transformOriginClass={transformOriginClass}
                      trailerRef={trailerRef}
                      setIsEnded={setIsEnded}
                      isEnded={isEnded}
                      mainMovieContainerRef={mainMovieContainerRef}
                    />
                  );
                })
              : <div className="flex gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="inline"
                    width={290}
                    height={150}
                    baseColor="rgba(255,255,255,0.05)"
                    highlightColor="rgba(255, 255, 255, 0.2)"
                  />

                ))}
                </div>}
          </div>
          <RightButton onClick={transformFunctionRight} />
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
