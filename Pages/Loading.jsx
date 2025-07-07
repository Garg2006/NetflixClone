import styles from "../src/styleSheet/NetflixStartingPage.module.css";


const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className={`${styles.loader} mb-4`}></div>
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
