import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Home from "./components/home";
import Explore from "./components/explore";
import Details from "./components/details";
import Ticket from "./components/ticket";
import Settings from "./components/settings.jsx";
import Checkout from "./components/checkout.jsx";

import "./scss/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="ticket/:id" element={<Ticket />} />
        <Route path="settings" element={<Settings />} />
        { <Route path="checkout" element={<Checkout />} />}
      </Route>
    </Routes>
  </BrowserRouter>,
);
