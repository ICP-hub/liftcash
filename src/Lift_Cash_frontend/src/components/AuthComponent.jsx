import { useNavigate } from "react-router-dom";
import { useAuthClient } from "../utils/useAuthClient.jsx";
import icpLogo from "../assets/images/ICP.png";
import { useEffect, useState } from "react";
import Modal from "./modal/Modal.jsx";

export default function AuthComponent({ closeModal }) {
  const navigate = useNavigate();
  const { login } = useAuthClient();
  const [isRegistered, setIsRegistered] = useState(false); // Change to `true` if user is  registered initially
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [username, setUsername] = useState(""); // Username input value

  async function authenticate() {
    try {
      let resp = await login();
      console.log("login resp : ", resp);
      if (resp) {
        if (isRegistered) {
          closeModal();
          console.log("Authenticated successfully, navigating...");
          navigate("/activities");
        } else {
          setIsModalOpen(true); // Open modal if user is not registered
        }
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username); // Store username locally
    setIsRegistered(true); // Mark user as registered after submitting
    setIsModalOpen(false); // Close the modal
    console.log("Username registered successfully:", username);
    navigate("/activities");
  };

  return (
    <div className="flex justify-center">
      <button
        className="flex flex-row justify-center gap-5 items-center bg-blue-500 text-white rounded-lg w-[90%] mt-4 align-center"
        onClick={() => {
          authenticate();
        }}
      >
        <img src={icpLogo} alt="icp" className="w-12 rounded-full m-1" />
        Connect with Internet Identity
      </button>

      {/* Conditional Modal for Username Registration */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Register Username
        </h2>
        <form onSubmit={handleUsernameSubmit} className="space-y-8">
          <label className="block">
            <input
              type="text"
              className="mt-1 block w-full py-4 px-3 border border-primary  rounded-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="btn-primary font-semibold text-white bg-primary hover:bg-blue-500 rounded-lg py-2 w-full"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
