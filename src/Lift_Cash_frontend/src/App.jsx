import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import LandingPage from "./pages/landingPage/LandingPage";
import AfterAuthPage from "./pages/afterAuthPage/AfterAuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/home" element={<AfterAuthPage />} />
    </Routes>
  );
}

export default App;
