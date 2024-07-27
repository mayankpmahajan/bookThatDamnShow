import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Signup from "./components/Signup";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </div>
    </Router>
  );
}