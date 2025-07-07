import React from "react";
import leftAngleBracket from "../../src/assets/leftAngleBracket.svg";

const LeftButton = ({ onClick, leftButtonVisible }) => {
  return (
    <div
      className={`absolute w-[4.5%] top-0 -left-[4.5%] h-full transform z-30 ${
        leftButtonVisible ? "visible" : "invisible"
      }`}
    >
      <button
        className="w-full h-full   bg-[#14141480] hover:bg-[#141414B3] text-white  rounded-br-sm rounded-tr-sm  cursor-pointer flex items-center  transition-all duration-300 ease-in-out "
        onClick={onClick}
      >
        <div className="mx-auto w-[30px] hover:w-[60px] h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <img src={leftAngleBracket} alt="" className="w-full h-full" />
        </div>
      </button>
    </div>
  );
};

export default LeftButton;
