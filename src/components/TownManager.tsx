
import { useState, useEffect } from "react";
import { Town } from "@/types/town";
import { Save } from "lucide-react";
import TownForm from "./town/TownForm";
import TownList from "./town/TownList";
import { towns as initialTownsData, updateTowns } from "@/data/townsData";

const TownManager = () => {
  const [towns, setTowns] = useState<Town[]>([...initialTownsData]);
  const [showManager, setShowManager] = useState(false);

  // Update the data source when local state changes
  useEffect(() => {
    updateTowns(towns);
  }, [towns]);

  const handleAddTown = (town: Town) => {
    setTowns([...towns, town]);
  };

  const handleUpdateTown = (updatedTown: Town) => {
    setTowns(towns.map((t) => (t.code === updatedTown.code ? updatedTown : t)));
  };

  const handleDeleteTown = (code: string) => {
    setTowns(towns.filter((t) => t.code !== code));
  };

  const exportTowns = () => {
    const dataStr = JSON.stringify(towns, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "exchanges.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setShowManager(!showManager)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {showManager ? "Hide Exchange Manager" : "Show Exchange Manager"}
      </button>

      {showManager && (
        <div className="mt-4 bg-white p-6 rounded-lg border shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Exchange Manager</h2>
            <button
              onClick={exportTowns}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm flex items-center gap-1"
            >
              <Save size={14} />
              Export Exchanges
            </button>
          </div>

          <TownForm onAddTown={handleAddTown} />

          <TownList 
            towns={towns} 
            onUpdateTown={handleUpdateTown} 
            onDeleteTown={handleDeleteTown} 
          />
        </div>
      )}
    </div>
  );
};

export default TownManager;
