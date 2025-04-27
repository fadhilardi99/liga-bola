import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextState {
  selectedLeague: string;
  setSelectedLeague: (leagueId: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  favoriteTeams: string[];
  addFavoriteTeam: (teamId: string) => void;
  removeFavoriteTeam: (teamId: string) => void;
  recentlyViewedMatches: string[];
  addRecentlyViewedMatch: (matchId: string) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize with current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [selectedLeague, setSelectedLeague] = useState("premier-league");
  const [selectedDate, setSelectedDate] = useState(today);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [recentlyViewedMatches, setRecentlyViewedMatches] = useState<string[]>(
    []
  );

  const addFavoriteTeam = (teamId: string) => {
    setFavoriteTeams((prev) => {
      if (prev.includes(teamId)) return prev;
      return [...prev, teamId];
    });
  };

  const removeFavoriteTeam = (teamId: string) => {
    setFavoriteTeams((prev) => prev.filter((id) => id !== teamId));
  };

  const addRecentlyViewedMatch = (matchId: string) => {
    setRecentlyViewedMatches((prev) => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter((id) => id !== matchId);
      // Add to beginning of array (most recent first)
      // Limit to 10 recent matches
      return [matchId, ...filtered].slice(0, 10);
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedLeague,
        setSelectedLeague,
        selectedDate,
        setSelectedDate,
        favoriteTeams,
        addFavoriteTeam,
        removeFavoriteTeam,
        recentlyViewedMatches,
        addRecentlyViewedMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
