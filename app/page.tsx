"use client";
import Login from "@/components/login";
import Logout from "@/components/logout";
import { useAuth } from "@/context/auth.context";

export default function Home() {
  const { user } = useAuth();
  return (
    <main>
      {user ? <h1>Hi, {user.username}</h1> : <h1>Hi, guest</h1>}
      <Logout />
      <Login />
    </main>
  );
}
