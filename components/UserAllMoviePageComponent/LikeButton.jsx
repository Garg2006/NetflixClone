import dislike from "../../src/assets/dislike.svg";
import like from "../../src/assets/like.svg";
import doubleLike from "../../src/assets/doubleLike.svg";
import styles from "../../src/styleSheet/NetflixStartingPage.module.css";


const LikeButton = () => {
  return (
    <div className={`relative m-1 ${styles.feedbackContainer}`} onClick={(e)=> e.stopPropagation()}>
      <button className=" w-7 h-7 bg-[#2A2A2A99] flex items-center justify-center rounded-full cursor-pointer border-2 border-[#FFFFFF80] hover:border-white">
        <img src={like} alt="" className="p-1  w-full" />
      </button>
      <div
        className={`absolute py-1 px-[7px] -top-1  -left-[130%] rounded-full flex items-center justify-between bg-[#232323]  shadow-[0_0_2px_0_rgba(0,0,0,0.6),0_8px_16px_0_rgba(0,0,0,0.5)] ${styles.feedback}`}
      >
        <button className="w-7 h-7 bg-transparent mx-[2px] cursor-pointer hover:bg-[#363636] rounded-full">
          <img src={dislike} alt="" className="w-full" />
        </button>
        <button className="w-7 h-7 mx-[2px] bg-transparent cursor-pointer  hover:bg-[#363636] rounded-full">
          <img src={like} alt="" className="w-full object-cover p-1" />
        </button>
        <button className="w-7 h-7 mx-[2px] bg-transparent cursor-pointer  hover:bg-[#363636] rounded-full">
          <img src={doubleLike} alt="" className="w-full" />
        </button>
      </div>
    </div>
  );
};

export default LikeButton;
