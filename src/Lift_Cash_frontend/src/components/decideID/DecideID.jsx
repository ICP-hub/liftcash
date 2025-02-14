import { requestVerifiablePresentation } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { useAuthClient } from "../../utils/useAuthClient";
import { HttpAgent } from '@dfinity/agent';


// const getUserPrincipal = async () => {
//   const authClient = await AuthClient.create();

//   // Ensure the user logs in first
//   await new Promise((resolve, reject) => {
//     authClient.login({
//       identityProvider: "https://identity.ic0.app", // Mainnet Internet Identity provider
//       onSuccess: () => {
//         console.log("User logged in.");
//         resolve();
//       },
//       onError: (err) => {
//         console.error("Login failed:", err);
//         reject(err);
//       },
//     });
//   });

//   // Fetch identity and principal after login completes
//   const identity = authClient.getIdentity();
//   const userPrincipal = identity.getPrincipal();
//   console.log("Generated Principal after login:", userPrincipal.toText());
//   return userPrincipal;
// };


// let internet_identity_canister_id = CanisterId::from_text("4agml-qgeiw-cd6gc-bafgz-nybm6-a3ewj-7z2kl-sam4k-i2cny-hb67w-bae").unwrap();
export const requestVerification = async (verifyPrincipal,communityActor,principalText) => {
// const [principal,setPrincipal]=useState(null);
// const { principal } = useAuthClient();
// console.log("principal =>" , principal)
const agent = new HttpAgent({ host: "http://localhost:8000" });
var rootKey;
agent.fetchRootKey().then(() => {
  console.log("Fetched root key:", agent.rootKey);
   rootKey =agent.rootKey;

});

console.log("principal in request >",principalText);
const internet_identity_canister_id=Principal.fromText("rdmx6-jaaaa-aaaaa-aaadq-cai");
const website_canister_id=Principal.fromText(process.env.CANISTER_ID_LIFT_CASH_FRONTEND);
console.log("website canister id",website_canister_id)
const ic_root_key=rootKey;
const time= Date.now();
console.log("time",time);
console.log(" root_key:", agent.rootKey);
const now =time;
  try {
    console.log("connected",communityActor);
    const jwt = await new Promise((resolve, reject) => {
      requestVerifiablePresentation({
        onSuccess: async (verifiablePresentation) => {
          if ("Ok" in verifiablePresentation) {
            resolve(verifiablePresentation.Ok);
          } else {
            reject(new Error(verifiablePresentation.Err));
          }
        },
        onError(err) {
          reject(new Error(err));
        },
        issuerData: {
          origin: "https://id.decideai.xyz",
          canisterId: Principal.fromText("qgxyr-pyaaa-aaaah-qdcwq-cai"),
        },
        credentialData: {
          credentialSpec: {
            credentialType: "ProofOfUniqueness",
            arguments: {
              minimumVerificationDate: "2024-12-10T00:00:00Z",
            },
          },
          credentialSubject: verifyPrincipal,
        },
        identityProvider: new URL("https://identity.ic0.app/"),
        derivationOrigin: window.location.origin, // Ensure this matches the credential's origin
      });
    });
    console.log("communityActor",communityActor);
    await communityActor.verify_proof_of_unique_personhood(verifyPrincipal,internet_identity_canister_id,website_canister_id,jwt,rootKey,now);
    // Principal.fromText(principalText)
  } catch (error) {
    console.error("Verification failed:", error);
    throw error;
  }
};



