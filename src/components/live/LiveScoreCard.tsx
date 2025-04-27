import React from "react";
import { Match } from "../../services/types/match";

interface LiveScoreCardProps {
  match: Match;
}

const LiveScoreCard: React.FC<LiveScoreCardProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img
            src={match.league.logo}
            alt={match.league.name}
            className="w-6 h-6"
          />
          <span className="text-sm font-medium">{match.league.name}</span>
        </div>
        <div className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-medium">
          {match.status === "LIVE" ? match.matchTime : match.status}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={match.homeTeam.logo}
            alt={match.homeTeam.name}
            className="w-8 h-8"
          />
          <span className="font-semibold">{match.homeTeam.name}</span>
        </div>
        <div className="font-bold text-lg">{match.homeTeam.score}</div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-3">
          <img
            src={match.awayTeam.logo}
            alt={match.awayTeam.name}
            className="w-8 h-8"
          />
          <span className="font-semibold">{match.awayTeam.name}</span>
        </div>
        <div className="font-bold text-lg">{match.awayTeam.score}</div>
      </div>
    </div>
  );
};

export default LiveScoreCard;
