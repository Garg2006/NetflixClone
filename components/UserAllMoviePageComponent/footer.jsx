import React from "react";
import facebook from "../../src/assets/facebook.svg";
import instagram from "../../src/assets/instagram.svg";
import twitter from "../../src/assets/twitter.svg";
import youtube from "../../src/assets/youtube.svg";
import languageData from "../../src/language";
import { useSelector } from "react-redux";
import { getLanguage } from "../../store/slice/languageSlice";

const logos = [facebook, instagram, twitter, youtube];

const footerLinks = {
  English: [
    "Audio Description",
    "Help Center",
    "Gift Cards",
    "Media Centre",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us"
  ],
  Hindi: [
    "ऑडियो विवरण",
    "सहायता केंद्र",
    "उपहार कार्ड",
    "मीडिया केंद्र",
    "निवेशक संबंध",
    "नौकरियाँ",
    "उपयोग की शर्तें",
    "गोपनीयता",
    "कानूनी नोटिस",
    "कुकी प्राथमिकताएँ",
    "कॉर्पोरेट जानकारी",
    "हमसे संपर्क करें"
  ]
};


const Footer = () => {
 const language = useSelector(getLanguage)

  return (
    <div className="text-[13px]">
      <ul className="flex mb-4">
        {logos.map((logo,index) => (
          <li key={index} className="mr-[15px]">
            <img src={logo} alt="" />
          </li>
        ))}
      </ul>
      <ul className="grid min-[950px]:grid-cols-4 min-[600px]:grid-cols-3 min-[400px]:grid-cols-2 mb-3.5 ">
        {footerLinks[language].map((link,index) => (
          <li key={index} className="mb-4 pr-[22px]">{link}</li>
        ))}
      </ul>
      <div>
        <button className="border border-gray-500 bg-transparent p-2 mb-5 cursor-pointer">{languageData[language].serviceCode}</button>
      </div>
      <div className="mb-[15px] text-[11px]">
        <span>© 1997-2025 Netflix, Inc.</span>
      </div>
    </div>
  );
};

export default Footer;
