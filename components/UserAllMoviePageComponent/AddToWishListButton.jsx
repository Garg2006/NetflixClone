import addToWishList from "../../src/assets/addToWishList.svg";
import WhiteCheckMark from "../../src/assets/WhiteCheckMark.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addIdToList,
  getAllAddToListId,
  removeIdFromList,
} from "../../store/slice/myListIdCheckedSlice";
import {
  addMovieToList,
  removeMovieFromList,
} from "../../store/slice/myListSlice";

const AddToWishListButton = ({ movie, setMovieName, setUndoMovie }) => {
  const dispatch = useDispatch();
  const allIds = useSelector(getAllAddToListId);
  const isSelected = allIds.includes(movie.id);

  return (
    <div className={`${styles.addToWishListContainer}`}>
      <button
        className="w-7 h-7 bg-[#2A2A2A99] flex items-center justify-center rounded-full cursor-pointer border-2 border-[#FFFFFF80] hover:border-white hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.7)]"
        onClick={(e) => {
          e.stopPropagation();
          if (isSelected) {
            dispatch(removeIdFromList(movie.id));
            dispatch(removeMovieFromList(movie));
            setUndoMovie(movie);
          } else {
            dispatch(addIdToList(movie.id));
            dispatch(addMovieToList(movie));
          }
          if (setMovieName) {
            setMovieName(movie.title);
          }
        }}
      >
        <img
          src={isSelected ? WhiteCheckMark : addToWishList}
          alt=""
          className="p-1 w-full"
        />
      </button>
      <div className={`${styles.addToWishList}`}>
        {isSelected ? "Remove from My List" : "Add to My List"}
      </div>
    </div>
  );
};

export default AddToWishListButton;
