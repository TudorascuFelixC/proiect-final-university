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
  }, []);

  return (
    <main>
      <Layout>{user ? <Dashboard /> : <Login />}</Layout>
    </main>
  );
}
