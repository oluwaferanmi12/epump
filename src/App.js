import logo from "./logo.svg";
import { useState, useReducer } from "react";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
// import { Provider } from "./context/store";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Store } from "./context/store";
import Home from "./pages/Home";
import Dashboard from "./pages/Auth/Dashboard/Dashboard";

function App() {
  const [userPayload, setUserPayload] = useReducer("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
