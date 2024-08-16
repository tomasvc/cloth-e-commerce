import React from "react";

export const Home: React.FC = () => {
  return (
    <div className="font-['Oswald'] pt-14 w-full min-h-screen">
      <div className="bg-[url('assets/images/clothing-store.jpg')] bg-center bg-cover relative w-full h-full min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div className="w-full min-h-screen flex flex-col gap-10 justify-center items-center">
          <h1 className="text-white text-5xl lg:text-7xl text-center drop-shadow-lg">
            New items — {new Date().getFullYear()}
          </h1>
          <button
            className="px-10 py-3 text-white tracking-wider uppercase drop-shadow-lg rounded bg-gray-900 hover:bg-amber-600 hover:scale-110 transition-all duration-300 ease-out"
            onClick={() => (document.location.href = "/products/27110")}
          >
            Browse store
          </button>
        </div>
      </div>
    </div>
  );
};
