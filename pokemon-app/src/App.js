import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokedex from "./pages/Pokedex";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Pokedex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
