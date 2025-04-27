import React from "react";
import { Activity } from "lucide-react";
import { useLiveScores } from "../../hooks/useLiveScores";
import LiveScoresList from "./LiveScoresList";

const LiveScoresTab: React.FC = () => {
  const { liveMatches, loading, error, refetch } = useLiveScores();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Activity size={20} />
        Live Matches
      </h2>

      <LiveScoresList
        matches={liveMatches}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default LiveScoresTab;
