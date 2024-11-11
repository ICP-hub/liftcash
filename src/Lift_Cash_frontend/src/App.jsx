import { Routes, Route } from "react-router-dom";
import InfoPage from "./pages/infoPage/InfoPage";
import MintPage from "./pages/mintpage/MintPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useAuthClient } from "./utils/useAuthClient";
import LandingPage from "./pages/landingPage/LandingPage";
import Transferpage from "./pages/transferPage/Transferpage";
import AfterAuthPage from "./pages/afterAuthPage/AfterAuthPage";
import ActivitiesPage from "./pages/activitiesPage/ActivitiesPage";
import ClaimAndAssets from "./pages/claimAndAssetsPage/ClaimAndAssets";


function App() {

  const { isAuthenticated } = useAuthClient();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated
        ? <AfterAuthPage>
          <ActivitiesPage />
        </AfterAuthPage>
        : <LandingPage />}
      />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/claim"
        element={
          <AfterAuthPage>
            <ClaimAndAssets />
          </AfterAuthPage>
        }
      />
      <Route path="/activities"
        element={
          <AfterAuthPage>
            <ActivitiesPage />
          </AfterAuthPage>
        }
      />
      <Route path="/transfer"
        element={
          <AfterAuthPage>
            <Transferpage />
          </AfterAuthPage>
        }
      />
      <Route path="/mint"
        element={
          <AfterAuthPage>
            <MintPage />
          </AfterAuthPage>
        }
      />
      <Route path="/info"
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
