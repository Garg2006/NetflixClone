import { Link } from "react-router-dom";

export default function ComingSoon({
  title = "Coming Soon",
  subtitle = "This section is still under construction.",
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-600">
        {title}
      </h1>
      <p className="text-center max-w-md mb-8 text-gray-400">{subtitle}</p>

      <Link
        to="/browse"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
