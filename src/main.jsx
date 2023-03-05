import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import HowToPlay from "./pages/HowToPlay";
import PreGame from "./pages/PreGame";
import Game from "./pages/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/how-to-play",
    element: <HowToPlay />,
  },
  {
    path: "/prepare",
    element: <PreGame />,
  },
  {
    path: "/play",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
