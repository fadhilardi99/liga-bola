export interface Fixture {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  league: {
    name: string;
    logo: string;
  };
  matchDate: string;
  matchTime: string;
}
