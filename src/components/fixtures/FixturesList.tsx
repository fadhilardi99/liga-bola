import React from "react";
import { Fixture } from "../../services/types/fixtures";
import FixtureCard from "./FixtureCard";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

interface FixturesListProps {
  fixtures: Fixture[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const FixturesList: React.FC<FixturesListProps> = ({
  fixtures,
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

  if (fixtures.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">No fixtures found for this date</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fixtures.map((fixture) => (
        <FixtureCard key={fixture.id} fixture={fixture} />
      ))}
    </div>
  );
};

export default FixturesList;