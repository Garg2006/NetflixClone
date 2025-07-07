import MovieCard from "./MovieCard";

const SearchedMovie = ({ movieSearched }) => {
  return (
    <div className="py-[68px] min-h-[700px] ">
      <div className="px-[4%] flex flex-wrap gap-y-[4vw] pt-[4%] mt-[16px]">
        {movieSearched.map((movie, index) => {
          let transformOriginClass = "origin-center";
          if (index % 6 === 0) transformOriginClass = "origin-left";
          else if ((index + 1) % 6 === 0) transformOriginClass = "origin-right";

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              transformOriginClass={transformOriginClass}
            />
          );
        })}{" "}
      </div>
    </div>
  );
};

export default SearchedMovie;
