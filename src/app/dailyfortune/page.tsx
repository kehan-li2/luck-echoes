"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/header";

const DailyFortunePage = () => {
  const { data: session, status } = useSession();
  const [fortune, setFortune] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFortune = async () => {
      if (!session?.user?.email) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        const userRes = await fetch(`/api/users/info`);
        const user = await userRes.json();

        const res = await fetch("/api/users/dailyFortune", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: session.user.name,
            bday: user.bday,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setFortune(data.fortune);
        } else {
          setError(data.message || "Failed to fetch fortune.");
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchFortune();
  }, [status, session]);

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          padding: "2.5rem", // equals p-10 (40px)
          background: "linear-gradient(to bottom right, #e9d5ff, #ffffff)", // approximate gradient from purple-100 to white
          fontFamily: 'var(--font-main)', 
          color: 'var(--foreground)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem", // text-4xl
            fontWeight: "700",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          🔮 Your Daily Fortune
        </h1>

        {loading && (
          <p style={{ textAlign: "center", color: "gray" }}>
            Fetching your luck from the stars...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", color: "red" }}>
            {error}
          </p>
        )}

        {fortune && (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "center",
              fontSize: "1.125rem", // text-lg
              color: "#6b21a8", // purple-700
              border: "1px solid #ddd",
              borderRadius: "1rem",
              backgroundColor: "#f5f3ff", // purple-50
              padding: "1.5rem",
              maxWidth: "42rem", // max-w-2xl
              boxShadow: "0 10px 15px rgba(99, 102, 241, 0.1)",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {fortune}
          </pre>
        )}
      </main>
    </>
  );
};

export default DailyFortunePage;
