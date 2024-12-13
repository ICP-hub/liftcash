import { useNavigate } from "react-router-dom";
import { useAuthClient } from "../utils/useAuthClient.jsx";
import icpLogo from "../assets/images/ICP.png";
import { useEffect, useState } from "react";
import Modal from "./modal/Modal.jsx";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

export default function AuthComponent({ closeModal }) {
  const navigate = useNavigate();
  const { login, principal } = useAuthClient();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const communityActor = useSelector(
    (state) => state?.actors?.actors?.communityActor
  );
  const economyActor = useSelector(
    (state) => state?.actors?.actors?.economyActor
  );

  useEffect(() => {
    if (communityActor && economyActor) {
      checkUserAndRecords();
    }
  }, [communityActor, economyActor]);

  async function checkUserAndRecords() {
    try {
      // Fetch user record from economy canister
      const userRecords = await economyActor.fetch_all_user_records();
      const userFound = userRecords.some((record) => record[0] === principal);

      console.log("Principal : ", principal.toText()); 
      console.log("User Found : ", userFound);

      if (!userFound) {
        console.log("User record not found. Creating a new record...");
        await createUserRecords();
      } else {
        console.log("User record exists.");
      }

      // Fetch username from community canister
      const usernameResponse = await communityActor.get_user();
      if (usernameResponse && usernameResponse.length > 0) {
        const fetchedUsername = usernameResponse[0][1];
        console.log("Username fetched successfully: ", fetchedUsername);
        localStorage.setItem("username", fetchedUsername);
        setIsRegistered(true);
        closeModal();
        navigate("/activities");
      } else {
        console.log("Username not found. Opening registration modal...");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during user and record checks: ", error);
    } 
  }

  async function createUserRecords() {
    try {
      await economyActor
        .create_user_record()
        .then((response) => {
          console.log("User record created successfully: ", response);
        })
        .catch((error) => {
          console.log("Error while creating user record: ", error);
        });
    } catch (error) {
      console.error("Error while creating user record: ", error);
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
    setIsSubmitting(true);
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
      setIsSubmitting(false);

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
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Register Username
        </h2>
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
            disabled={isSubmitting}
            type="submit"
            className="btn-primary flex justify-center font-semibold text-white bg-primary hover:bg-blue-500 rounded-lg py-2 w-full"
          >
            {isSubmitting ? (
              <ThreeDots
                visible={true}
                height="30"
                width="40"
                color="white"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "Submit "
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
