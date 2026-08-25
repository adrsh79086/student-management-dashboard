"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
  email === "admin@gmail.com" &&
  password === "123456"
) {
  localStorage.setItem(
    "isLoggedIn",
    "true"
  );

  localStorage.setItem(
    "adminName",
    "Adarsh"
  );

  router.push("/dashboard");
}
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "35px",
          background: "white",
          borderRadius: "12px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Student Management</h1>

        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Login
          </button>
        </form>

        <p>
          Demo: admin@gmail.com / 123456
        </p>
      </div>
    </div>
  );
}