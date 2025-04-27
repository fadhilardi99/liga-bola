import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getMatchDetails } from "../services/api/endpoints";
import { Match } from "../services/types/match";
import { useAppContext } from "../context/AppContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

interface MatchEvent {
  time: string;
  type: "goal" | "yellow" | "red" | "substitution";
  team: "home" | "away";
  player: string;
  detail?: string;
}

const MatchDetailsPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { addRecentlyViewedMatch } = useAppContext();

  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock match events (in a real app, these would come from the API)
  const [events] = useState<MatchEvent[]>([
    {
      time: "12'",
      type: "goal",
      team: "home",
      player: "Player Name",
      detail: "1-0",
    },
    { time: "34'", type: "yellow", team: "away", player: "Player Name" },
    {
      time: "45'",
      type: "goal",
      team: "away",
      player: "Player Name",
      detail: "1-1",
    },
    {
      time: "67'",
      type: "substitution",
      team: "home",
      player: "Player Out → Player In",
    },
    {
      time: "76'",
      type: "goal",
      team: "home",
      player: "Player Name",
      detail: "2-1",
    },
    { time: "88'", type: "red", team: "away", player: "Player Name" },
  ]);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!matchId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getMatchDetails(matchId);
        setMatch(data);
        // Add to recently viewed
        addRecentlyViewedMatch(matchId);
      } catch (err) {
        let errorMessage = "Failed to fetch match details";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return <span className="text-green-500">⚽</span>;
      case "yellow":
        return <span className="bg-yellow-400 w-4 h-5 inline-block"></span>;
      case "red":
        return <span className="bg-red-500 w-4 h-5 inline-block"></span>;
      case "substitution":
        return <span className="text-blue-500">↔️</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <button
          onClick={handleGoBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="p-4">
        <button
          onClick={handleGoBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Match not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={handleGoBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      {/* Match Header */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <img
              src={match.league.logo}
              alt={match.league.name}
              className="w-8 h-8"
            />
            <span className="font-medium">{match.league.name}</span>
          </div>
          <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {match.status === "LIVE" ? "LIVE" : match.status}
          </div>
        </div>

        {/* Score Section */}
        <div className="flex justify-between items-center py-6">
          {/* Home Team */}
          <div className="flex flex-col items-center w-1/3">
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-16 h-16 mb-2"
            />
            <span className="font-semibold text-center">
              {match.homeTeam.name}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center w-1/3">
            <div className="text-4xl font-bold mb-2">
              {match.homeTeam.score} - {match.awayTeam.score}
            </div>
            <span className="text-sm text-gray-500">
              {match.status === "LIVE"
                ? `${match.matchTime}'`
                : match.matchTime}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center w-1/3">
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-16 h-16 mb-2"
            />
            <span className="font-semibold text-center">
              {match.awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Match Information</h2>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Calendar size={18} className="mr-2" />
            <span>Date: April 27, 2025</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock size={18} className="mr-2" />
            <span>Kick-off: 20:00</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🏟️</span>
            <span>Venue: Anfield Stadium</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2">🔔</span>
            <span>Referee: Michael Oliver</span>
          </div>
        </div>
      </div>

      {/* Match Events */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Match Events</h2>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center">
              <div className="w-12 font-semibold text-gray-500">
                {event.time}
              </div>
              <div className="mx-2">{renderEventIcon(event.type)}</div>
              <div
                className={`flex-grow ${
                  event.team === "home" ? "text-left" : "text-right"
                }`}
              >
                <span className="font-medium">{event.player}</span>
                {event.detail && (
                  <span className="ml-2 text-gray-500">({event.detail})</span>
                )}
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No events recorded for this match
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
