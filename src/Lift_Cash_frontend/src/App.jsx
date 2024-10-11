import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
