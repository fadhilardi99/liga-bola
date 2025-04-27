import React from "react";

interface ErrorMessageProps {
  message: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, retry }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-4">
      <div className="flex flex-col items-center justify-center">
        <p className="mb-3">{message}</p>
        {retry && (
          <button
            onClick={retry}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md text-sm"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
