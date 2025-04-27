export interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
  };
  league: {
    name: string;
    logo: string;
  };
  status: string;
  matchTime: string;
}
