import apiClient from "./apiClient";
import { Match } from "../types/match";
import { League } from "../types/league";
import { Fixture } from "../types/fixtures";
import { LeagueStanding } from "../types/standings";

// Live matches
export const getLiveMatches = async (): Promise<Match[]> => {
  const response = await apiClient.get("/matches/live");

  // Transform API response to match our interfaces
  return response.data.map(
    (match: {
      id: string;
      home_team: { name: string; logo: string };
      away_team: { name: string; logo: string };
      score: { home: number; away: number };
      league: { name: string; logo: string };
      status: { type: string; elapsed: number };
    }) => ({
      id: match.id,
      homeTeam: {
        name: match.home_team.name,
        logo: match.home_team.logo,
        score: match.score.home,
      },
      awayTeam: {
        name: match.away_team.name,
        logo: match.away_team.logo,
        score: match.score.away,
      },
      league: {
        name: match.league.name,
        logo: match.league.logo,
      },
      status: match.status.type,
      matchTime: match.status.elapsed,
    })
  );
};

// League standings
export const getStandings = async (
  leagueId: string
): Promise<LeagueStanding[]> => {
  const response = await apiClient.get(`/leagues/${leagueId}/standings`);

  return response.data.map(
    (team: {
      team: { id: string; name: string; logo: string };
      rank: number;
      points: number;
      played: number;
      win: number;
      draw: number;
      lose: number;
      goals: { for: number; against: number };
    }) => ({
      id: team.team.id,
      name: team.team.name,
      position: team.rank,
      points: team.points,
      played: team.played,
      won: team.win,
      drawn: team.draw,
      lost: team.lose,
      goalsFor: team.goals.for,
      goalsAgainst: team.goals.against,
      logo: team.team.logo,
    })
  );
};

// Fixtures by date
export const getFixtures = async (date: string): Promise<Fixture[]> => {
  const response = await apiClient.get(`/fixtures/date/${date}`);

  return response.data.map(
    (fixture: {
      id: string;
      home_team: { name: string; logo: string };
      away_team: { name: string; logo: string };
      league: { name: string; logo: string };
      date: string;
      time: string;
    }) => ({
      id: fixture.id,
      homeTeam: {
        name: fixture.home_team.name,
        logo: fixture.home_team.logo,
      },
      awayTeam: {
        name: fixture.away_team.name,
        logo: fixture.away_team.logo,
      },
      league: {
        name: fixture.league.name,
        logo: fixture.league.logo,
      },
      matchDate: fixture.date,
      matchTime: fixture.time,
    })
  );
};

// Get leagues
export const getLeagues = async (): Promise<League[]> => {
  const response = await apiClient.get("/leagues");

  return response.data.map(
    (league: { id: string; name: string; logo: string; country: string }) => ({
      id: league.id,
      name: league.name,
      logo: league.logo,
      country: league.country,
    })
  );
};

// Match details
export const getMatchDetails = async (matchId: string): Promise<Match> => {
  const response = await apiClient.get(`/matches/${matchId}`);
  return response.data;
};
