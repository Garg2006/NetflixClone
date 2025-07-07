import React, { useState } from "react";
import tvIcon from "../../src/assets/tv.svg";
import downloadIcon from "../../src/assets/download.svg";
import watchIcon from "../../src/assets/watch.svg";
import profileIcon from "../../src/assets/profile.svg";
import plusIcon from "../../src/assets/plus.svg";
import languageData from "../../src/language";
import { useSelector } from "react-redux";
import { getLanguage } from "../../store/slice/languageSlice";


const Reasons_Data = [
  {
    heading: {
      English: "Enjoy on your TV",
      Hindi: "अपने टीवी पर आनंद लें"
    },
    description: {
      English: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      Hindi: "स्मार्ट टीवी, प्ले स्टेशन, एक्सबॉक्स, क्रोमकास्ट, एप्पल टीवी, ब्लू-रे प्लेयर और अधिक पर देखें।"
    },
    img: tvIcon,
  },
  {
    heading: {
      English: "Download your shows to watch offline",
      Hindi: "ऑफ़लाइन देखने के लिए अपने शो डाउनलोड करें"
    },
    description: {
      English: "Save your favourites easily and always have something to watch.",
      Hindi: "अपने पसंदीदा को आसानी से सहेजें और हमेशा देखने के लिए कुछ रखें।"
    },
    img: downloadIcon,
  },
  {
    heading: {
      English: "Watch everywhere",
      Hindi: "हर जगह देखें"
    },
    description: {
      English: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
      Hindi: "अपने फोन, टैबलेट, लैपटॉप और टीवी पर अनलिमिटेड मूवीज़ और टीवी शो स्ट्रीम करें।"
    },
    img: watchIcon,
  },
  {
    heading: {
      English: "Create profiles for kids",
      Hindi: "बच्चों के लिए प्रोफाइल बनाएं"
    },
    description: {
      English: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
      Hindi: "बच्चों को उनके पसंदीदा पात्रों के साथ रोमांच पर भेजें, जो उनके लिए विशेष रूप से बनाए गए स्थान में — यह आपके सदस्यता के साथ मुफ्त है।"
    },
    img: profileIcon,
  },
];

const Faq_Data = [
  {
    id: "1",
    question: {
      English: "What is Netflix?",
      Hindi: "नेटफ्लिक्स क्या है?"
    },
    answer: {
      English: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. <br> <br> You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
      Hindi: "नेटफ्लिक्स एक स्ट्रीमिंग सेवा है जो हजारों इंटरनेट-संयुक्त उपकरणों पर पुरस्कार विजेता टीवी शो, फिल्में, एनीमे, डॉक्यूमेंट्री और अधिक की एक विस्तृत श्रृंखला प्रदान करती है। <br> <br> आप जितना चाहें, जब चाहें देख सकते हैं, बिना एक भी विज्ञापन के – सब कुछ एक कम मासिक मूल्य पर। हमेशा कुछ नया खोजने के लिए होता है, और हर सप्ताह नए टीवी शो और फिल्में जोड़ी जाती हैं!"
    }
  },
  {
    id: "2",
    question: {
      English: "How much does Netflix cost?",
      Hindi: "नेटफ्लिक्स की कीमत कितनी है?"
    },
    answer: {
      English: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.",
      Hindi: "अपने स्मार्टफोन, टैबलेट, स्मार्ट टीवी, लैपटॉप, या स्ट्रीमिंग डिवाइस पर नेटफ्लिक्स देखें, सभी एक निश्चित मासिक शुल्क के लिए। योजनाएँ ₹149 से ₹649 प्रति माह तक होती हैं। कोई अतिरिक्त शुल्क नहीं, कोई अनुबंध नहीं।"
    }
  },
  {
    id: "3",
    question: {
      English: "Where can I watch?",
      Hindi: "मैं कहाँ देख सकता हूँ?"
    },
    answer: {
      English: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. <br> <br> You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
      Hindi: "कहीं भी, कभी भी देखें। अपने नेटफ्लिक्स खाते में साइन इन करें और वेब पर netflix.com से अपनी व्यक्तिगत कंप्यूटर या किसी भी इंटरनेट-संयुक्त डिवाइस पर नेटफ्लिक्स ऐप के साथ तुरंत देखें, जिसमें स्मार्ट टीवी, स्मार्टफोन, टैबलेट, स्ट्रीमिंग मीडिया प्लेयर और गेम कंसोल शामिल हैं। <br> <br> आप अपने पसंदीदा शो iOS या Android ऐप के साथ भी डाउनलोड कर सकते हैं। डाउनलोड का उपयोग करें ताकि आप यात्रा करते समय और इंटरनेट कनेक्शन के बिना भी देख सकें। नेटफ्लिक्स को कहीं भी ले जाएं।"
    }
  },
  {
    id: "4",
    question: {
      English: "How do I cancel?",
      Hindi: "मैं कैसे रद्द कर सकता हूँ?"
    },
    answer: {
      English: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
      Hindi: "नेटफ्लिक्स लचीला है। कोई झंझट वाले अनुबंध नहीं हैं और कोई प्रतिबद्धताएँ नहीं हैं। आप केवल दो क्लिक में अपना खाता ऑनलाइन रद्द कर सकते हैं। कोई रद्दीकरण शुल्क नहीं – कभी भी अपना खाता शुरू या बंद करें।"
    }
  },
  {
    id: "5",
    question: {
      English: "What can I watch on Netflix?",
      Hindi: "मैं नेटफ्लिक्स पर क्या देख सकता हूँ?"
    },
    answer: {
      English: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
      Hindi: "नेटफ्लिक्स में फीचर फिल्में, डॉक्यूमेंट्री, टीवी शो, एनीमे, पुरस्कार विजेता नेटफ्लिक्स ओरिजिनल्स और बहुत कुछ की एक व्यापक लाइब्रेरी है। जितना चाहें, जब चाहें देख सकते हैं।"
    }
  },
  {
    id: "6",
    question: {
      English: "Is Netflix good for kids?",
      Hindi: "क्या नेटफ्लिक्स बच्चों के लिए अच्छा है?"
    },
    answer: {
      English: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. <br><br> Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
      Hindi: "नेटफ्लिक्स किड्स अनुभव आपकी सदस्यता में शामिल है ताकि माता-पिता को नियंत्रण मिले, जबकि बच्चे परिवार के अनुकूल टीवी शो और फिल्मों का आनंद लें। <br><br> बच्चों के प्रोफाइल में पिन-संरक्षित पैरेंटल कंट्रोल्स होते हैं जो आपको यह निर्धारित करने में मदद करते हैं कि बच्चे कौन सा सामग्री देख सकते हैं और आप जो विशिष्ट टाइटल नहीं चाहते, उसे ब्लॉक कर सकते हैं।"
    }
  }
];


const Faq = () => {
  const [faqActiveState, setFaqActiveState] = useState("");
  const language = useSelector(getLanguage)


  return (
    <div>
      <div className="mb-10">
        <h2 className="  text-white mt-3 text-[32px] max-[1280px]:text-xl font-bold">
        {languageData[language].moreReasons}
        </h2>
        <div className="flex max-[960px]:flex-col mt-3">
          {Reasons_Data.map((reason, index) => {
            return (
              <div
                key={index}
                className="mt-2 ml-2 w-1/4 max-[960px]:w-full rounded-2xl bg-[#ffffff1a] border-2 border-[#ffffff0a] p-4 flex flex-col backdrop-blur-[12px] "
              >
                <h3 className="text-white">{reason.heading[language]}</h3>
                <p className="text-[#c0bfbf] my-3 font-medium text-base">
                  {reason.description[language]}
                </p>
                <div className="flex items-end justify-end flex-grow">
                  <img className="w-[50px]" src={reason.img} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="FREQUENTLY_ASKED_QUESTION mb-10">
        <h1 className="mb-3 text-white text-[32px] max-[1280px]:text-xl font-bold">
        {languageData[language].faq}
        </h1>
        <div className="text-white">
          {Faq_Data.map((faq) => {
            return (
              <div
                key={faq.id}
                className="text-lg max-[960px]:text-sm font-semibold cursor-pointer"
                
              >
                <div className="flex items-center justify-between p-6 max-[960px]:p-4 border-2 border-[#ffffff0a] mb-2 bg-[#ffffff1a] rounded-2xl cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#3f3f3f]"
                onClick={() => {
                  console.log(faq.id)
                  setFaqActiveState((prevState) =>
                    faq.id == prevState ? "0" : faq.id
                  );
                }}
                >
                  <h3 className="flex-grow">{faq.question[language]}</h3>
                  <img
                    className={`w-5 transition-all duration-200 ease-in-out 
                    ${
                      faqActiveState == faq.id ? "rotate-z-45" : "rotate-z-90"
                    }`}
                    src={plusIcon}
                    alt=""
                  />
                </div>
                <p
                  className={`bg-[#ffffff1a] rounded-2xl px-6 transition-all duration-400 ease-in-out ${
                    faqActiveState == faq.id
                      ? "py-6 max-h-[500px] visible mb-2"
                      : "py-0  invisible max-h-0 overflow-hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.answer[language] }}
                ></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
