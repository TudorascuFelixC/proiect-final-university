import React from "react";
import { firebaseAuth } from "@/firebase.config";
import {
  User,
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneInfoOptions,
  signInWithCredential,
  signOut,
} from "firebase/auth";
export default function PhoneLogin(props: any) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [verificationCode, setVerificationCode] = React.useState<string>("");
  const [verificationId, setVerificationId] = React.useState<string>("");
  const [codeSent, setCodeSent] = React.useState<boolean>(false);
  const [captchaVerified, setCaptchaVerified] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.setError(error);
  }, [error, props]);

  const signInWithPhone = async () => {
    // setLoading(true);
    // firebaseAuth.useDeviceLanguage();
    // const recaptchaVerifier = new RecaptchaVerifier(
    //   "recaptcha-container",
    //   {
    //     size: "invisible",
    //     callback: (response: any) => {
    //       // console.log(response);
    //       setCaptchaVerified(true);
    //     },
    //   },
    //   firebaseAuth
    // );
    // const provider = new PhoneAuthProvider(firebaseAuth);
    // provider
    //   .verifyPhoneNumber(phoneNumber, recaptchaVerifier)
    //   .then((verificationId) => {
    //     if (verificationId) {
    //       setCodeSent(true);
    //       setVerificationId(verificationId);
    //       setError("");
    //       setLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     // console.log(error.message);
    //     setError(error.code);
    //     setLoading(false);
    //   });
  };

  const verify = async () => {
    setLoading(true);
    const authCredential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    signInWithCredential(firebaseAuth, authCredential) // <-- This line was incorrect
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime,
            lastSignedInAt: user.metadata.lastSignInTime,
          },
          providerData: user.providerData,
        };

        setUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.code);
        setLoading(false);
      });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      signInWithPhone();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <div className="py-5 flex justify-between">
          {codeSent
            ? "Verification code has been sent"
            : "Enter your phone number"}
        </div>

        <div className="flex justify-center w-full">
          <div
            className={`mb-4 w-full transition ease-in-out ${
              codeSent ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Your phone number
            </label>
            <div className="">
              <input
                type="tel"
                id="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="+44 73*** *** ***"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                value={phoneNumber}
                autoFocus
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div
            className={`mb-4 transition w-full ease-in-out ${
              codeSent ? "" : "hidden"
            }`}
          >
            <label
              htmlFor="verificationCode"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              The verification code
            </label>
            <input
              type="number"
              id="verificationCode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="123456"
              required
              value={verificationCode}
              autoFocus
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center border rounded">
          {loading ? (
            <>
              <button className="w-full text-black  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 justify-center">
                Loading... Please wait
              </button>
            </>
          ) : codeSent ? (
            <button
              className="w-full text-black  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 justify-center"
              onClick={verify}
            >
              Verifica
            </button>
          ) : (
            <button
              onClick={signInWithPhone}
              className="w-full text-black  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 justify-center"
            >
              Send the code
            </button>
          )}
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
