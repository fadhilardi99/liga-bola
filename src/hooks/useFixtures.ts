import { useState, useEffect } from "react";
import { Fixture } from "../services/types/fixtures";
import { getFixtures } from "../services/api/endpoints";

export const useFixtures = (date: string) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFixtures = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFixtures(date);
      setFixtures(data);
    } catch (err) {
      let eroorMessage = "Failed to fetch leagues";

      if (err instanceof Error) {
        eroorMessage = err.message;
      } else if (typeof err === "string") {
        eroorMessage = err;
      }
      setError(eroorMessage);
      console.error("Error fetching fixtures:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [date]);

  return { fixtures, loading, error, refetch: fetchFixtures };
};
