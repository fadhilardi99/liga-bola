import { useState, useEffect } from "react";
import { Match } from "../services/types/match";
import { getLiveMatches } from "../services/api/endpoints";

export const useLiveScores = (pollingInterval = 60000) => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      const matches = await getLiveMatches();
      setLiveMatches(matches);
    } catch (err) {
      let eroorMessage = "Failed to fetch leagues";
      if (err instanceof Error) {
        eroorMessage = err.message;
      } else if (typeof err === "string") {
        eroorMessage = err;
      }
      setError(eroorMessage);
      console.error("Error fetching live matches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchLiveMatches();
    }, pollingInterval);

    // Clean up
    return () => clearInterval(intervalId);
  }, [pollingInterval]);

  return { liveMatches, loading, error, refetch: fetchLiveMatches };
};
