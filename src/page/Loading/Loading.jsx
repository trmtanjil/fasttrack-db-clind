import React from "react";
import { Loader2 } from "lucide-react";

function LoadingId({ message = "Generating ID..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[150px] p-6 border rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <div className="animate-spin text-blue-500">
        <Loader2 size={48} />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
        {message}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Please wait a moment...
      </p>
    </div>
  );
}

export default LoadingId;
