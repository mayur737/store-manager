import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      <h1 className="text-white text-9xl font-extrabold drop-shadow-lg">404</h1>
      <p className="mt-4 text-white text-2xl sm:text-3xl font-semibold tracking-wide">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-purple-100 max-w-md text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-8 inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-100 transition"
      >
        Return
      </Link>
    </div>
  );
}
