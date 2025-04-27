import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Activity } from "lucide-react";
import { useLiveScores } from "../hooks/useLiveScores";
import { useStandings } from "../hooks/useStandings";
import { useFixtures } from "../hooks/useFixtures";
import { useLeagues } from "../hooks/useLeagues";
import LiveScoreCard from "../components/live/LiveScoreCard";
import StandingsTable from "../components/standings/StandingsTable";
import FixtureCard from "../components/fixtures/FixtureCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { formatDateLong } from "../services/utils/date";

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedLeague, setSelectedLeague] = useState("premier-league");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { leagues } = useLeagues();
  const {
    liveMatches,
    loading: liveLoading,
    error: liveError,
    refetch: refetchLive,
  } = useLiveScores();
  const {
    standings,
    loading: standingsLoading,
    error: standingsError,
    refetch: refetchStandings,
  } = useStandings(selectedLeague);
  const {
    fixtures,
    loading: fixturesLoading,
    error: fixturesError,
    refetch: refetchFixtures,
  } = useFixtures(selectedDate);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLeague(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Activity size={16} />
            Live Scores
          </TabsTrigger>
          <TabsTrigger value="standings" className="flex items-center gap-2">
            <Trophy size={16} />
            Standings
          </TabsTrigger>
          <TabsTrigger value="fixtures" className="flex items-center gap-2">
            <Calendar size={16} />
            Fixtures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-4">
          <h2 className="text-xl font-semibold mb-4">Live Matches</h2>

          {liveError && (
            <ErrorMessage message={liveError} retry={refetchLive} />
          )}

          {liveLoading ? (
            <LoadingSpinner />
          ) : liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <LiveScoreCard key={match.id} match={match} />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No live matches at the moment</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="standings" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Standings</h2>
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

          {standingsError && (
            <ErrorMessage message={standingsError} retry={refetchStandings} />
          )}

          {standingsLoading ? (
            <LoadingSpinner />
          ) : standings.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No standings data available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fixtures" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Fixtures</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-white border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              {formatDateLong(selectedDate)}
            </h3>
          </div>

          {fixturesError && (
            <ErrorMessage message={fixturesError} retry={refetchFixtures} />
          )}

          {fixturesLoading ? (
            <LoadingSpinner />
          ) : fixtures.length > 0 ? (
            fixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No fixtures for this date</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
