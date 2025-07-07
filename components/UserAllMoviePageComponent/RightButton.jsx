import React from "react";
import rightAngleBracket from "../../src/assets/rightAngleBracket.svg";

const RightButton = ({ onClick }) => {
  return (
    <div className="absolute w-[4.5%] top-0 -right-[4.5%] h-full transform z-30">
      <button
        className="w-full h-full bg-[hsla(0,0%,8%,0.5)] hover:bg-[#141414B3] text-white  rounded-br-sm rounded-tr-sm  cursor-pointer flex items-center  transition-all duration-300 ease-in-out "
        onClick={onClick}
      >
        <div className="mx-auto w-[30px] hover:w-[60px] h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <img src={rightAngleBracket} alt="" className="w-full h-full" />
        </div>
      </button>
    </div>
  );
};

export default RightButton;
