"use client";

import { useAuth } from "@/context/auth.context";

export default function Login() {
  const { login } = useAuth();
  return (
    <div>
      <h1>Log in</h1>
      <form action={login}>
        <label htmlFor="username">Username</label>
        <input type="username" id="username" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
