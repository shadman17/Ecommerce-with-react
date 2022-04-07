import "./App.css";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/404" element={<PageNotFound />} />
        <Route exact path="*" element={<Navigate to="/404"></Navigate>} />

      </Routes>
    </div>
  );
}

export default App;
