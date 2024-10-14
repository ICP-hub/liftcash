import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import LandingPage from "./pages/landingPage/LandingPage";
import AfterAuthPage from "./pages/afterAuthPage/AfterAuthPage";
import ClaimAndAssets from "./pages/claimAndAssetsPage/ClaimAndAssets";
import ActivitiesPage from "./pages/activitiesPage/ActivitiesPage";
import Transferpage from "./pages/transferPage/Transferpage";
import InfoPage from "./pages/infoPage/InfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/home" element={<AfterAuthPage />} />
      <Route
        path="/claim"
        element={
          <AfterAuthPage>
            <ClaimAndAssets />
          </AfterAuthPage>
        }
      />
      <Route
        path="/activities"
        element={
          <AfterAuthPage>
            <ActivitiesPage />
          </AfterAuthPage>
        }
      />
      <Route
        path="/transfer"
        element={
          <AfterAuthPage>
            <Transferpage />
          </AfterAuthPage>
        }
      />
      <Route
        path="/info"
        element={
          <AfterAuthPage>
            <InfoPage />
          </AfterAuthPage>
        }
      />
    </Routes>
  );
}

export default App;
