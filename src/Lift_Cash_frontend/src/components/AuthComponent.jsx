import { useNavigate } from "react-router-dom";
import { useAuthClient } from "../utils/useAuthClient.jsx";
import icpLogo from "../assets/images/ICP.png";
import { useEffect, useState } from "react";
import Modal from "./modal/Modal.jsx";
import { useSelector } from "react-redux";

export default function AuthComponent({ closeModal }) {
  const navigate = useNavigate();
  const { login } = useAuthClient();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const communityActor = useSelector((state) => state?.actors?.actors?.communityActor);

  useEffect(() => {
    if (communityActor) {
      checkUser();
    }
  }, [communityActor]);

  async function checkUser() {
    try {
      await communityActor.get_user()
        .then((response) => {
          console.log("Username fetched successfully: ", response[0][1]);
          localStorage.setItem("username", response[0][1]);
          setIsRegistered(true);
          closeModal();
          console.log("Authenticated successfully, navigating...");
          navigate("/activities");
        })
        .catch((error) => {
          console.warn("Error while fetching username: ", error);
        });
    } catch (error) {
      console.error("Error while fetching username: ", error);
    }
  }

  async function authenticate() {
    try {
      await login();

      if (!isRegistered) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during authentication: ", error);
    }
  }

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      alert("Username cannot be empty");
      return;
    }
    try {
      const response = await communityActor.set_user(username);
      console.log("Username set successfully: ", response);

      localStorage.setItem("username", username);
      setIsRegistered(true);
      setIsModalOpen(false);

      console.log("Username registered successfully:", username);
      navigate("/activities");
    } catch (error) {
      console.error("Error while setting username: ", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="flex flex-row justify-center gap-5 items-center bg-blue-500 text-white rounded-lg w-[90%] mt-4 align-center"
        onClick={authenticate}
      >
        <img src={icpLogo} alt="ICP" className="w-12 rounded-full m-1" />
        Connect with Internet Identity
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-primary">Register Username</h2>
        <form onSubmit={handleUsernameSubmit} className="space-y-8">
          <label className="block">
            <input
              type="text"
              className="mt-1 block w-full py-4 px-3 border border-primary rounded-lg"
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
