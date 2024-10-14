import { useState } from "react";
import { Lift_Cash_backend } from "declarations/Lift_Cash_backend";
import { AuthClient } from "@dfinity/auth-client";
import {
  canisterId,
  createActor,
} from "../../../declarations/Lift_Cash_backend/index.js";
import { HttpAgent } from "@dfinity/agent";
import { useNavigate } from "react-router-dom";

export default function AuthComponent({ closeModal }) {
  const [actor, setActor] = useState(Lift_Cash_backend);
  const navigate = useNavigate();

  async function authenticate() {
    try {
      const authclient = await AuthClient.create({});
      authclient.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,

        onSuccess: () => {
          closeModal();
          const agent = new HttpAgent({ identity: authclient.getIdentity() });
          let actor = createActor(process.env.CANISTER_ID_LIFT_CASH_BACKEND, {
            agent: agent,
          });
          setActor(actor);
          console.log("Authenticated successfully");
          navigate("/home");
        },
        onError:(e)=>{
          console.log("error in authentication")
          console.log(e);
        }
      });
    } catch (err) {
      console.log(err);
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
        <img src="favicon.ico" alt="" srcset="" />
        Connect with Internet Identity
      </button>
    </div>
  );
}
