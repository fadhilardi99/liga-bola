import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={64} className="text-amber-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          <Home size={18} className="mr-2" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
