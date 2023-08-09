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
    <header className="flex justify-between items-center  shadow-md p-2 relative z-10 w-full">
      <div className=" pr-2">
        <h2 className="text-3xl text-slate-800">
          <Link href="/" className="header-link">
            SOLENT UNIVERSITY LEARNING
          </Link>
        </h2>
      </div>
      <div className="header-right">
        {user && (
          <div className="flex items-center">
            <span className="text-slate-800 mr-2">
              Welcome, {user.displayName}
            </span>
            <button
              onClick={logOut}
              className="text-slate-800 hover:text-slate-900"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
