import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./styles.css";

function App() {
  return (
    <Router>

      <nav className="navbar">
        <div className="nav-logo">AuthenticityCheck</div>

        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>

          <NavLink to="/about" className="nav-item">
            About
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </Router>
  );
}

export default App;