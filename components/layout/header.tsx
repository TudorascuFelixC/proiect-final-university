import React from "react";
import Link from "next/link";
import { firebaseAuth } from "@/firebase.config";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = React.useState<User | null>(null); // set the user state to null by default and update it when the user logs in or out using the setUser function from React.useState hook and the User type from firebase.auth module

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []); // use the onAuthStateChanged function from firebase.auth module to check if the user is logged in or not and update the user state accordingly using the setUser function from React.useState hook and the User type from firebase.auth module and use the useEffect hook from React to run this function only once when the component is mounted

  const logOut = async () => {
    await signOut(firebaseAuth);
  }; // create a function to log out the user using the signOut function from firebase.auth module and the firebaseAuth object from firebase.config module and the async/await syntax to wait for the user to be logged out before proceeding to the next step in the function execution flow

  return (
    <header className="flex justify-between items-center p-2 relative z-10 w-full">
      <div className="flex items-center pr-2">
        <img
          src="/slideshow/logo.png"
          alt="Solent University Logo"
          className="w-10 h-10 mr-2"
        />
        <h2 className="text-3xl text-slate-900">
          <Link
            href="/"
            className="header-link max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-back font-display: 'Times New Roman', sans-serif;"
          >
            SOLENT UNIVERSITY LEARNING
          </Link>
        </h2>
      </div>
      <div className="header-right">
        {user && (
          <div className="flex items-center">
            <span className="text-slate-800 mr-2 font-semibold font-display: 'Times New Roman', sans-serif;">
              Welcome, {user.displayName}
            </span>
            <button
              onClick={logOut}
              className="text-slate-800 hover:text-slate-900 font-semibold"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
