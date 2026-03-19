import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import "@neondatabase/neon-js/ui/css";

import App from "./App.jsx";
import Home from "./components/home";
import Explore from "./components/explore";
import Details from "./components/details";

import { authClient } from "./lib/auth";

import "./scss/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NeonAuthUIProvider emailOTP authClient={authClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="details/:imageIndex?" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ,
  </NeonAuthUIProvider>,
);
