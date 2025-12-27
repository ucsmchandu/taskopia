import React from "react";
export default function FullscreenLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50">
      <div className="relative mb-6">
        <div className="h-24 w-24 rounded-full border-8 border-gray-200"></div>
        <div className="absolute inset-0 h-24 w-24 rounded-full border-8 border-blue-500 border-t-transparent animate-spin"></div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
        Loading your experience…
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Please wait a moment
      </p>
    </div>
  );
}
