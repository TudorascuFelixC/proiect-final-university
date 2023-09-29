import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "@/components/login/login";
import { firebaseAuth } from "@/firebase.config";
import { User, onAuthStateChanged } from "firebase/auth";
import Dashboard from "@/components/dashboard/dashboard";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []); // use the onAuthStateChanged function from firebase.auth module to check if the user is logged in or not and update the user state accordingly using the setUser function from React.useState hook and the User type from firebase.auth module and use the useEffect hook from React to run this function only once when the component is mounted

  return (
    <main>
      <Layout>{user ? <Dashboard /> : <Login />}</Layout>
    </main>
  );
} // create a function to display the home page with the login component if the user is not logged in and the dashboard component if the user is logged in using the user state and the setUser function from React.useState hook and the User type from firebase.auth module and the Login component and the Dashboard component from components/login/login.tsx and components/dashboard/dashboard.tsx respectively and the Layout component from components/layout/index.tsx
