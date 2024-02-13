
import PageNav from "../src/components/PageNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/FakeAuthContext";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main
      style={{
        margin: "2.5rem",
        padding: "2.5rem 5rem",
        backgroundColor: "var(--color-dark--1)",
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <PageNav />
      <form
        style={{
          backgroundColor: "var(--color-dark--2)",
          borderRadius: "7px",
          padding: "2rem 3rem",
          width: "48rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          margin: "8rem auto",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={(e) => login(email, e, password)}>Login</button>
        </div>
      </form>
    </main>
  );
}
