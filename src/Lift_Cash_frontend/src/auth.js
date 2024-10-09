import { useState } from 'react';
import { Lift_Cash_backend } from 'declarations/Lift_Cash_backend';

import { AuthClient } from '@dfinity/auth-client'
import { NFID } from "@nfid/embed"
import { canisterId, createActor } from '../../declarations/Lift_Cash_backend';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { idlFactory } from '../../declarations/Lift_Cash_backend/Lift_Cash_backend.did.js';


function App() {
  const [greeting, setGreeting] = useState('');
  const [actor, setActor] = useState(null)

  async function authenticate() {
    try {
      const authclient = await AuthClient.create({})
      authclient.login({
        identityProvider:
          process.env.DFX_NETWORK === 'ic'
            ? 'https://identity.ic0.app'
            : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,

        onSuccess: () => alert("authenticated"),
      });
      const agent = new HttpAgent({ identity: authclient.getIdentity() })
      let actor = createActor(process.env.CANISTER_ID_LIFT_CASH_BACKEND, { agent: agent })
      setActor(actor)

      const res = await actor.whami()
      console.log(res)
      setGreeting(res)
      alert("hello ", res)
    } catch (err) {
      console.log(err)
    }

  }

  async function handleClick() {
    try {
      console.log("clicked")
      let res = await ttearn_backend.click()
      console.log("total clicks :", res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <button onClick={authenticate}>Internet identity connectyes</button>
      <div className="clicker" onClick={handleClick}>Click me</div>
    </main>
  );
}


export default App;
