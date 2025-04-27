import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { useStandings } from "../../hooks/useStandings";
import { useLeagues } from "../../hooks/useLeagues";
import StandingsTable from "./StandingsTable";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const StandingsTab: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("premier-league");
  const { leagues } = useLeagues();
  const { standings, loading, error, refetch } = useStandings(selectedLeague);

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeague(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Trophy size={20} />
          Standings
        </h2>
        <select
          value={selectedLeague}
          onChange={handleLeagueChange}
          className="bg-white border border-gray-300 rounded px-3 py-2 text-sm"
        >
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage message={error} retry={refetch} />}

      {loading ? (
        <LoadingSpinner />
      ) : standings.length > 0 ? (
        <StandingsTable standings={standings} />
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No standings data available</p>
        </div>
      )}
    </div>
  );
};

export default StandingsTab;
