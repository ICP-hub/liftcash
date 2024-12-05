import React, { createContext, useContext, useEffect, useState } from "react";
import { clearActors, setActors } from "./redux/actorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor as createCommunityActor } from "../../../declarations/Community_Backend";
import { createActor as createEconomyActor } from "../../../declarations/Economy_Backend";

const AuthContext = createContext();

export const useAuthClient = () => {
  const dispatch = useDispatch();

  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);

  const clientInfo = async (client) => {
    console.log("client auth status : ", await client.isAuthenticated());
    console.log("client : ", await client);
    const authStatus = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    console.log("principal : ", principal);

    setAuthClient(client);
    setIsAuthenticated(authStatus);
    setIdentity(identity);
    setPrincipal(principal);

    if (
      authStatus &&
      identity &&
      principal &&
      principal.isAnonymous() === false
    ) {
      const agent = new HttpAgent({ identity: client.getIdentity() });
      let communityActor = createCommunityActor(
        process.env.CANISTER_ID_COMMUNITY_BACKEND,
        {
          agent: agent,
        }
      );
      let economyActor = createEconomyActor(
        process.env.CANISTER_ID_ECONOMY_BACKEND,
        {
          agent: agent,
        }
      );

      dispatch(
        setActors({
          communityActor: communityActor,
          economyActor: economyActor,
          economyActor,
        })
      );
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const authClient = await AuthClient.create();
      clientInfo(authClient);
    })();
  }, []);

  const login = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
            false
        ) {
          resolve(clientInfo(authClient));
        } else {
          await authClient.login({
            identityProvider:
              process.env.DFX_NETWORK === "ic"
                ? "https://identity.ic0.app/"
                : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
            onError: (error) => reject(error),
            onSuccess: () => resolve(clientInfo(authClient)),
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = async () => {
    await authClient?.logout();
    dispatch(clearActors());
    setIsAuthenticated(false);
  };

  return {
    login,
    logout,
    authClient,
    isAuthenticated,
    identity,
    principal,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
