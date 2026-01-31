import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* Big 404 */}
      <h1 className="text-8xl font-extrabold text-indigo-600">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page not found
      </h2>

      <p className="mt-2 max-w-md text-center text-gray-500">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="rounded-lg cursor-pointer bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="rounded-lg cursor-pointer border border-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
