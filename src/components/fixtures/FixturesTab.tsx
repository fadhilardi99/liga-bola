import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { useFixtures } from "../../hooks/useFixtures";
import FixturesList from "./FixturesList";
import { formatDateLong } from "../../services/utils/date";

const FixturesTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { fixtures, loading, error, refetch } = useFixtures(selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar size={20} />
          Fixtures
        </h2>
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

      <FixturesList
        fixtures={fixtures}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default FixturesTab;
