"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen p-10 bg-gradient-to-br from-purple-100 to-white">
      <h1 className="text-4xl font-bold text-center mb-8">🔮 Your Daily Fortune</h1>

      {loading ? (
        <p className="text-center text-gray-600">Fetching your luck from the stars...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : fortune ? (
        <pre className="whitespace-pre-wrap text-center text-lg text-purple-700 border rounded-xl bg-purple-50 p-6 max-w-2xl mx-auto shadow-lg">
          {fortune}
        </pre>
      ) : null}
    </div>
  );
};

export default DailyFortunePage;