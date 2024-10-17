import { useNavigate } from "react-router-dom";
import { useAuthClient } from "../utils/useAuthClient.jsx";
import icpLogo from "../assets/images/ICP.png"

export default function AuthComponent({ closeModal }) {
  const navigate = useNavigate();
  const {login}=useAuthClient();

  async function authenticate() {
    try {
      let resp = await login();
      console.log("login resp : ", resp)
      if(resp){
        closeModal();
        console.log("Authenticated successfully");
        navigate("/activities");
      }
    } catch (error) {
      console.error("Error : ", error)
    }
    
  }

  return (
    <div className="flex justify-center">
      <button
        className="flex flex-row justify-center gap-5 items-center bg-blue-500 text-white rounded-lg w-[90%] mt-4 align-center"
        onClick={() => {
          authenticate();
        }}
      >
        <img src={icpLogo} alt="icp" className="w-12 rounded-full m-1"/>
        Connect with Internet Identity
      </button>
    </div>
  );
}
