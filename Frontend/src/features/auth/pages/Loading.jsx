import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-linear-to-br from-green-950 via-gray-900 to-black">
      {/* Background Glow */}
      <div className="absolute h-80 w-80 rounded-full bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-green-400/40 bg-white/5 backdrop-blur-md">
            <span className="text-3xl font-bold text-green-400">CGSA</span>
          </div>
        </div>

        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-green-800"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-green-400 border-r-green-300"></div>
        </div>

        {/* Text */}
        <h2 className="mt-8 text-2xl font-semibold tracking-wide text-white">
          Loading...
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Preparing your experience
        </p>

        {/* Progress Bar */}
        <div className="mt-8 h-2 w-72 overflow-hidden rounded-full bg-gray-800">
          <div className="h-full animate-[loading_2s_linear_infinite] rounded-full bg-linear-to-r from-green-500 to-emerald-300" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
            width: 30%;
          }
          50% {
            width: 50%;
          }
          100% {
            transform: translateX(350%);
            width: 30%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;