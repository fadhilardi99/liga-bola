import React from "react";
import { Match } from "../../services/types/match";
import LiveScoreCard from "./LiveScoreCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

interface LiveScoresListProps {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const LiveScoresList: React.FC<LiveScoresListProps> = ({
  matches,
  loading,
  error,
  refetch,
}) => {
  if (error) {
    return <ErrorMessage message={error} retry={refetch} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">No live matches at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <LiveScoreCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default LiveScoresList;
