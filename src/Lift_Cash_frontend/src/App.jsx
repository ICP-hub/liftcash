import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header/>} />
      <Route path="/signup" element={<LoginPage/>} />
    </Routes>
  );
}


export default App;
