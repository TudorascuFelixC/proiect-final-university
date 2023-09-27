import React from "react";
import Link from "next/link";
import { firebaseAuth } from "@/firebase.config";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logOut = async () => {
    await signOut(firebaseAuth);
  };

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
