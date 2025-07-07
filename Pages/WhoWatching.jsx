import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../store/slice/userSlice";
import profileBlue from "../src/assets/profilePics/ProfilePic.png";
import profileYellow from "../src/assets/profilePics/profilepicYellow.png";
import profileDarkBlue from "../src/assets/profilePics/profilepicBlue.png";
import profileGreen from "../src/assets/profilePics/profilePicGreen.png";
import profileChildren from "../src/assets/profilePics/ProfilePicChildren.png";
import plus from "../src/assets/plus.svg";
import UserAllMoviePage from "./UserAllMoviePage";
import { getLanguage } from "../store/slice/languageSlice";
import languageData from "../src/language";

const WhoWatching = () => {
  const userName = useSelector(getUserData);
  const [pic, setPic] = useState({});
  const [addProfile, setAddProfile] = useState(false);
  const [profileSelected, setProfileSelected] = useState("");
  const language = useSelector(getLanguage);

  const watchingProfiles = [
    { name: userName, profilepic: profileBlue },
    { name: "children", profilepic: profileChildren },
  ];

  const profilePics = [profileYellow, profileDarkBlue, profileGreen];

  useEffect(() => {
    function randomImg() {
      const randomNumber = Math.floor(Math.random() * profilePics.length);
      if (!pic[randomNumber])
        setPic((prev) => ({
          ...prev,
          [randomNumber]: profilePics[randomNumber],
        }));
      else randomImg();
    }

    if (addProfile) randomImg();
  }, [addProfile]);

  return (
    <>
      {profileSelected ? (
        <UserAllMoviePage profileSelected={profileSelected} />
      ) : (
        <div className="bg-[#141414] h-screen">
          <div
            className="h-[41px]"
            style={{
              background: "linear-gradient(180deg, #000000B3 10%, #00000000)",
            }}
          ></div>
          <div className="flex items-center justify-center text-white h-[calc(100%-41px)] text-center">
            <div>
              <h1 className="text-5xl my-5 font-medium">{languageData[language].whoIsWatching}</h1>
              <ul className="flex mt-[15px] pb-[15px] justify-center">
                {watchingProfiles.map((profile, index) => (
                  <li
                    className="mr-4 cursor-pointer transition-all duration-100 ease-in-out"
                    onClick={() => setProfileSelected(profile)}
                    key={index}
                  >
                    <div className="flex flex-col items-center group">
                      <div className="w-[10vw] h-[10vw]  max-h-[150px] max-w-[150px] min-h-[84px] min-w-[84px] border-transparent group-hover:border-white rounded-md border-2">
                        <img
                          className="w-full rounded-sm"
                          src={profile.profilepic}
                          alt=""
                        />
                      </div>
                      <p className="my-3 group-hover:text-white text-[#808080]">
                        {profile.name}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="cursor-pointer">
                  <div className="flex flex-col items-center group">
                    <div
                      className="w-[10vw] h-[10vw] max-h-[150px] max-w-[150px] min-h-[84px] min-w-[84px] rounded-md flex items-center justify-center group-hover:bg-white"
                      onClick={() => setAddProfile(true)}
                    >
                      <img
                        src={plus}
                        alt=""
                        className="bg-[#4d4d4d] rounded-full p-5"
                      />
                    </div>
                    <p className="my-3 text-[#808080] group-hover:text-white">
                     {languageData[language].addProfile}
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-[22px] mb-[11px]">
                <span className="cursor-pointer border border-gray-500 hover:border-white hover:text-white text-gray-500 px-4 py-[5px] tracking-[2px]">
                  {languageData[language].manageProfiles}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhoWatching;
