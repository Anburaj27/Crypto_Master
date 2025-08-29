import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./features/coins";
import Coin from "./features/coin";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coin/:id" element={<Coin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
