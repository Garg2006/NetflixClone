import Language_logo from "../src/assets/LanguageImg.svg";
import languageData from "../src/language";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../store/slice/languageSlice";

const full_Data = [
  {
    English: "FAQ",
    Hindi: "सामान्य प्रश्न",
  },
  {
    English: "Help Centre",
    Hindi: "मदद केंद्र",
  },
  {
    English: "Account",
    Hindi: "खाता",
  },
  {
    English: "Media Centre",
    Hindi: "मीडिया केंद्र",
  },
  {
    English: "Investor Relations",
    Hindi: "निवेशक संबंध",
  },
  {
    English: "Jobs",
    Hindi: "नौकरियाँ",
  },
  {
    English: "Way to Watch",
    Hindi: "देखने का तरीका",
  },
  {
    English: "Terms Of Use",
    Hindi: "उपयोग की शर्तें",
  },
  {
    English: "Privacy",
    Hindi: "गोपनीयता",
  },
  {
    English: "Cookie Preferences",
    Hindi: "कुकी प्राथमिकताएँ",
  },
  {
    English: "Corporate Information",
    Hindi: "कॉर्पोरेट जानकारी",
  },
  {
    English: "Contact Us",
    Hindi: "संपर्क करें",
  },
  {
    English: "Speed Test",
    Hindi: "स्पीड टेस्ट",
  },
  {
    English: "Legal Notices",
    Hindi: "कानूनी सूचना",
  },
  {
    English: "Only on Netflix",
    Hindi: "केवल नेटफ्लिक्स पर",
  },
];

const limited_Data = [
  {
    English: "FAQ",
    Hindi: "सामान्य प्रश्न",
  },
  {
    English: "Help Centre",
    Hindi: "मदद केंद्र",
  },
  {
    English: "Terms Of Use",
    Hindi: "उपयोग की शर्तें",
  },
  {
    English: "Privacy",
    Hindi: "गोपनीयता",
  },
  {
    English: "Cookie Preferences",
    Hindi: "कुकी प्राथमिकताएँ",
  },
  {
    English: "Corporate Information",
    Hindi: "कॉर्पोरेट जानकारी",
  },
];

const Footer = ({ displayFull }) => {
  const language = useSelector(getLanguage);
  const dispatch = useDispatch()

  const data = displayFull ? full_Data : limited_Data;
  return (
    <>
      <p className="p-[3px]">
        Questions? Call <span>000-800-919-1743</span>
      </p>
      <ul className="mt-[30px] p-1 mb-3.5 underline decoration-[#ffffffb3] rounded-xs text-sm  grid min-[960px]:grid-cols-4 min-[600px]:grid-cols-3 grid-cols-1">
        {data.map((footer, index) => (
          <li
            key={index}
            className="list-none mt-3 ml-3 whitespace-nowrap font-normal"
          >
            {footer[language]}
          </li>
        ))}
      </ul>
      <div
        className={`mt-9 p-[3px] relative border ${
          displayFull ? "rounded-[30px]" : "rounded-[4px]"
        } border-[#605F5F] w-min`}
      >
        <div className="absolute top-1/2 left-[15px] -translate-y-1/2">
          <img src={Language_logo} alt="" />
        </div>
        <select
          value={language}
          className={`py-1.5 pr-4 pl-[34px] cursor-pointer bg-transparent text-[16px] font-medium ${
            displayFull
              ? "rounded-[30px] focus-visible:outline-white focus-visible:outline-offset-8"
              : "rounded-[1px] focus-visible:outline focus-visible:outline-offset-4"
          }`}
          onChange={(e) => {
            dispatch(setLanguage(e.target.value));
          }}
        >
          <option value="English" className="text-black ">
            English
          </option>
          <option value="Hindi" className="text-black">
            हिन्दी
          </option>
        </select>
      </div>

      <p className={`mt-9 p-[3px] text-sm ${displayFull ? "" : "hidden"}`}>
        {languageData[language].netflixIndia}
      </p>
    </>
  );
};

export default Footer;
