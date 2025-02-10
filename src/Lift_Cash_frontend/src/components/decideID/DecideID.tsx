import { requestVerifiablePresentation, VerifiablePresentationResponse } from "@dfinity/verifiable-credentials/request-verifiable-presentation";
import { Principal } from "@dfinity/principal";

const requestVerification = async (verifyPrincipal: Principal): Promise<void> => {
    try {
      const jwt: string = await new Promise((resolve, reject) => {
        requestVerifiablePresentation({
          onSuccess: async (verifiablePresentation: VerifiablePresentationResponse) => {
            if ('Ok' in verifiablePresentation) {
              resolve(verifiablePresentation.Ok);
            } else {
              reject(new Error(verifiablePresentation.Err));
            }
          },
          onError(err) {
            reject(new Error(err));
          },
          issuerData: {
            origin: 'https://id.decideai.xyz',
            canisterId: Principal.fromText('qgxyr-pyaaa-aaaah-qdcwq-cai'),
          },
          credentialData: {
            credentialSpec: {
              credentialType: 'ProofOfUniqueness',
              arguments: {
                // Specify the minimum date when the user's Decide ID verification must have occurred
                // Format: ISO 8601 timestamp
                minimumVerificationDate: "2024-12-01T00:00:00Z",
              },
            },
            credentialSubject: verifyPrincipal,
          },
          identityProvider: new URL('https://identity.ic0.app/'),
          derivationOrigin: window.location.origin,
        });
      });
  
      // Verify the JWT credentials received
    //   await verifyCredentials(jwt);
    console.log("Final JWT: ", jwt);
  
    } catch (error) {
      console.error('Verification failed:', error);
      throw error;
    }
  };

export default requestVerification;