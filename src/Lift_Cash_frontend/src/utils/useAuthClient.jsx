import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor as createCommunityActor } from "../../../declarations/Community_Backend";
import { createActor as createEconomyActor } from "../../../declarations/Economy_Backend";
import { createActor as createLiftActor } from "../../../declarations/LedgerDid/lift";
import { createActor as createPromoActor } from "../../../declarations/LedgerDid/promo";

const AuthContext = createContext();

export const useAuthClient = () => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [actors, setActors] = useState(null);

  const clientInfo = async (client) => {
    console.log("client auth status : ", await client.isAuthenticated());
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
      let economoyActor = createEconomyActor(
        process.env.CANISTER_ID_ECONOMY_BACKEND,
        {
          agent: agent,
        }
      );
      let liftLedgerActor = createLiftActor(
        process.env.CANISTER_ID_LIFT_LEDGER_CANISTER,
        {
          agent: agent,
        }
      );
      let promoLedgerActor = createPromoActor(
        process.env.CANISTER_ID_PROMO_LEDGER_CANISTER,
        {
          agent: agent,
        }
      );
      setActors({
        communityActor,
        economoyActor,
        liftLedgerActor,
        promoLedgerActor,
      });
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
    setIsAuthenticated(false);
  };

  return {
    login,
    logout,
    authClient,
    isAuthenticated,
    identity,
    principal,
    actors,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
