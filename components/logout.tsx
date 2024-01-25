"use client";

import { useAuth } from "@/context/auth.context";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <div>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
