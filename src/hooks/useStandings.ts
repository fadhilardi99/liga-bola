import { useState, useEffect } from "react";
import { LeagueStanding } from "../services/types/standings";
import { getStandings } from "../services/api/endpoints";

export const useStandings = (leagueId: string) => {
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getStandings(leagueId);
      setStandings(data);
    } catch (err) {
      let eroorMessage = "Failed to fetch leagues";
      if (err instanceof Error) {
        eroorMessage = err.message;
      } else if (typeof err === "string") {
        eroorMessage = err;
      }
      setError(eroorMessage);
      console.error("Error fetching standings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [leagueId]);

  return { standings, loading, error, refetch: fetchStandings };
};
