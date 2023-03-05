import { Link } from "react-router-dom";

function App() {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center space-y-6 pt-24 md:pt-36 lg:space-y-9 lg:pt-48 xl:pt-64">
      <p className="absolute bottom-2 text-sm text-gray-400">
        Questions are fetched from
        <a
          href="https://opentdb.com/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300 underline duration-300 hover:text-pink-500"
        >
          Open Trivia DB
        </a>
      </p>
      <h1 className="text-7xl font-semibold  text-gray-900 drop-shadow-md filter">
        QuizU
      </h1>

      <div className="flex flex-col space-y-6">
        <Link
          to="./prepare"
          className="rounded-md bg-white py-2 px-6 text-gray-900 shadow-lg ring-2 ring-gray-900 duration-300 hover:text-pink-500 hover:shadow-xl hover:ring-pink-500"
        >
          Start Game
        </Link>
        <Link
          to="./how-to-play"
          className="rounded-md bg-white py-2 px-6 text-gray-900 shadow-lg ring-2 ring-gray-900 duration-300 hover:text-blue-500 hover:shadow-xl hover:ring-blue-500"
        >
          How To Play
        </Link>
      </div>
    </div>
  );
}

export default App;
