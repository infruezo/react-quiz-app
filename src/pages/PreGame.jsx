import React, { useState } from "react";
import { categories, difficulties, numbers, types } from "../data/index.js";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const PreGame = () => {
  const [selectedQuestionsNumber, setSelectedQuestionsNumber] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedQuestionsType, setSelectedQuestionsType] = useState("All");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function fetchQuestions() {
    let category =
      selectedCategory === "All"
        ? ""
        : `&category=${selectedCategory.toLowerCase()}`;
    let difficulty =
      selectedDifficulty === "All"
        ? ""
        : `&difficulty=${selectedDifficulty.toLowerCase()}`;
    let type =
      selectedQuestionsType === "All"
        ? ""
        : `&type=${selectedQuestionsType.toLowerCase()}`;
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${selectedQuestionsNumber}${category}${difficulty}${type}`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong...");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchQuestions();
    setLoading(false);
    return navigate("/play", {
      state: response.results,
    });
  };

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center pt-12 md:pt-24 lg:space-y-9 lg:py-36">
      <form
        action="#"
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex w-11/12 flex-col space-y-4 rounded-lg bg-white p-10 drop-shadow-xl filter md:w-10/12 lg:w-[400px]"
      >
        {/* error notification */}
        {location?.state?.text && (
          <div className="absolute -top-4 left-0 right-0 w-full overflow-hidden rounded-lg text-sm text-white shadow-lg md:-top-16 lg:text-base">
            <h1 className="w-full bg-red-400 p-3">{location?.state?.text}</h1>
          </div>
        )}

        <div className="mx-auto flex w-full flex-col space-y-2">
          <label htmlFor="questionsNumber" className="text-lg">
            Number of questions:
          </label>
          <select
            name="questionsNumber"
            id="questionsNumber"
            className="w-full px-4 py-2 text-sm shadow-md outline-none ring-1 ring-blue-200 selection:ring-blue-400"
            value={selectedQuestionsNumber}
            onChange={(e) => setSelectedQuestionsNumber(e.target.value)}
          >
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="category" className="text-lg">
            Select Category:
          </label>
          <select
            name="category"
            id="category"
            className="w-full px-4 py-2 text-sm shadow-md outline-none ring-1 ring-blue-200 selection:ring-blue-400"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="difficulty" className="text-lg">
            Select Difficulty:
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="w-full px-4 py-2 text-sm shadow-md outline-none ring-1 ring-blue-200 selection:ring-blue-400"
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            value={selectedDifficulty}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="type" className="text-lg">
            Select Type:
          </label>
          <select
            name="type"
            id="type"
            className="w-full px-4 py-2 text-sm shadow-md outline-none ring-1 ring-blue-200 selection:ring-blue-400"
            onChange={(e) => setSelectedQuestionsType(e.target.value)}
            value={selectedQuestionsType}
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="!mt-8 flex w-full items-center justify-between space-x-3 md:space-x-4 lg:space-x-8">
          <Link
            className="flex-1 rounded-md bg-white py-2 text-center text-gray-900 shadow-lg ring-2 ring-gray-900 duration-300 hover:text-pink-500 hover:shadow-xl hover:ring-pink-500"
            to="/"
          >
            Main Menu
          </Link>
          <button
            type="submit"
            className={`flex-1 rounded-md bg-white py-2 text-center text-gray-900 shadow-lg ring-2  duration-300 hover:text-blue-500 hover:shadow-xl hover:ring-blue-500 ${
              loading ? "ring-blue-500" : "ring-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? (
              <img
                src="./loader.svg"
                className="mx-auto h-6 w-auto object-cover"
                alt=""
              />
            ) : (
              "Start Playing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreGame;
