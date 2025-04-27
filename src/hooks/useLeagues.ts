import { useState, useEffect } from "react";
import { League } from "../services/types/league";
import { getLeagues } from "../services/api/endpoints";

export const useLeagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getLeagues();
      setLeagues(data);
    } catch (err) {
      let eroorMessage = "Failed to fetch leagues";
      if (err instanceof Error) {
        eroorMessage = err.message;
      } else if (typeof err === "string") {
        eroorMessage = err;
      }
      setError(eroorMessage);

      console.error("Error fetching leagues:", err);

      // Fallback data if API fails
      setLeagues([
        {
          id: "premier-league",
          name: "Premier League",
          logo: "",
          country: "England",
        },
        { id: "la-liga", name: "La Liga", logo: "", country: "Spain" },
        { id: "serie-a", name: "Serie A", logo: "", country: "Italy" },
        { id: "bundesliga", name: "Bundesliga", logo: "", country: "Germany" },
        { id: "ligue-1", name: "Ligue 1", logo: "", country: "France" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  return { leagues, loading, error, refetch: fetchLeagues };
};
