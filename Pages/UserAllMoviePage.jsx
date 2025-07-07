import { useEffect, useState } from "react";
import Header from "../components/UserAllMoviePageComponent/Header";
import _ from "lodash";
import Footer from "../components/UserAllMoviePageComponent/footer";
import { Outlet, useLocation } from "react-router-dom";
import SearchedMovie from "../components/UserAllMoviePageComponent/SearchedMovie";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchedMovie, getSearchedMovie } from "../store/slice/searchMovieSlice";

const UserAllMoviePage = ({ profileSelected }) => {
  const [headerBackground, setHeaderBackground] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const location = useLocation();
  const [searchBox, setSearchBox] = useState(false);
  const movieSearched = useSelector(getSearchedMovie);
  const dispatch = useDispatch();
  const [searchedMovie, setSearcheMovie] = useState("");


  useEffect(() => {
    dispatch(clearSearchedMovie())
    setPageUrl(location.pathname);
    setSearcheMovie('')
  }, [location]);



  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 1
        ? setHeaderBackground(true)
        : setHeaderBackground(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="text-white min-h-screen font-medium bg-[#141414] overflow-x-hidden"
      onClick={() => {
        setSearchBox(false);
      }}
    >
      <Header
        pageUrl={pageUrl}
        profileSelected={profileSelected}
        headerBackground={headerBackground}
        searchBox={searchBox}
        setSearchBox={setSearchBox}
        searchedMovie={searchedMovie}
        setSearcheMovie={setSearcheMovie}
      />
      {movieSearched.length ? (
        <SearchedMovie movieSearched={movieSearched} />
      ) : (
        <Outlet key={pageUrl}/>
      )}
      <div className="mt-5 px-[4%] max-w-[1092px] mx-auto  text-gray-500">
        <Footer />
      </div>
    </div>
  );
};

export default UserAllMoviePage;
