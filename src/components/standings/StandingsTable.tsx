import React from "react";
import { LeagueStanding } from "../../services/types/standings";

interface StandingsTableProps {
  standings: LeagueStanding[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-50 text-gray-700 text-sm">
            <th className="py-3 px-4 text-left font-medium">Pos</th>
            <th className="py-3 px-4 text-left font-medium">Team</th>
            <th className="py-3 px-4 text-center font-medium">P</th>
            <th className="py-3 px-4 text-center font-medium">W</th>
            <th className="py-3 px-4 text-center font-medium">D</th>
            <th className="py-3 px-4 text-center font-medium">L</th>
            <th className="py-3 px-4 text-center font-medium">GF</th>
            <th className="py-3 px-4 text-center font-medium">GA</th>
            <th className="py-3 px-4 text-center font-medium">GD</th>
            <th className="py-3 px-4 text-center font-medium">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => {
            const goalDifference = team.goalsFor - team.goalsAgainst;
            const positionClass =
              team.position <= 4
                ? "bg-blue-50"
                : team.position >= standings.length - 3
                ? "bg-red-50"
                : "";

            return (
              <tr
                key={team.id}
                className={`border-t border-gray-200 hover:bg-gray-50 ${positionClass}`}
              >
                <td className="py-3 px-4 text-left">{team.position}</td>
                <td className="py-3 px-4 text-left">
                  <div className="flex items-center space-x-2">
                    <img src={team.logo} alt={team.name} className="w-6 h-6" />
                    <span>{team.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{team.played}</td>
                <td className="py-3 px-4 text-center">{team.won}</td>
                <td className="py-3 px-4 text-center">{team.drawn}</td>
                <td className="py-3 px-4 text-center">{team.lost}</td>
                <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                <td
                  className="py-3 px-4 text-center font-medium"
                  style={{
                    color:
                      goalDifference > 0
                        ? "#16a34a"
                        : goalDifference < 0
                        ? "#dc2626"
                        : "#6b7280",
                  }}
                >
                  {goalDifference > 0 ? "+" : ""}
                  {goalDifference}
                </td>
                <td className="py-3 px-4 text-center font-bold">
                  {team.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
