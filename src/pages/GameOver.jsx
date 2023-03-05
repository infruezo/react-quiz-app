import React from "react";
import { Link } from "react-router-dom";

const GameOver = ({ score, size }) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center pt-12 text-gray-800 md:pt-24 lg:space-y-9 lg:py-36">
      <div className="relative flex w-11/12 flex-col space-y-4 rounded-lg bg-transparent p-4 py-8 drop-shadow-xl filter md:w-10/12 md:p-6 lg:w-[650px] lg:p-10">
        {score / size < 0.5 ? (
          <div className="space-y-4 text-center font-bold md:space-y-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl">Nice Try 👏</h3>
            <h5 className="text-2xl md:text-3xl lg:text-4xl">
              You got {score} / {size}{" "}
              <span className="hidden lg:inline-block">points</span>
            </h5>
            <img
              src="./mitsuri.jpg"
              alt=""
              className="h-auto w-auto object-cover lg:h-96"
            />
          </div>
        ) : (
          <div className="mx-auto space-y-4 text-center font-bold md:space-y-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl">
              👏 Well Played 👏
            </h3>
            <h5 className="text-2xl md:text-3xl lg:text-4xl">
              You got {score} / {size}
            </h5>
            <img
              src="./thumb-up.jpg"
              alt=""
              className="h-96 w-auto object-cover"
            />
          </div>
        )}

        <div className="mx-auto mt-4 flex w-full justify-center">
          <Link
            to="/prepare"
            className="rounded-md bg-white py-2 px-6 text-gray-900 shadow-lg ring-2 ring-gray-900 duration-300 hover:text-pink-500 hover:shadow-xl hover:ring-pink-500"
          >
            Play Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
