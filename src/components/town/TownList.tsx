
import { useState } from "react";
import { Town } from "@/types/town";
import { Trash, X, Edit, Check } from "lucide-react";

interface TownListProps {
  towns: Town[];
  onUpdateTown: (updatedTown: Town) => void;
  onDeleteTown: (code: string) => void;
}

const TownList = ({ towns, onUpdateTown, onDeleteTown }: TownListProps) => {
  const [editingTown, setEditingTown] = useState<Town | null>(null);

  const startEditingTown = (town: Town) => {
    setEditingTown({ ...town });
  };

  const updateEditingTown = (field: keyof Town, value: string) => {
    if (editingTown) {
      setEditingTown({ ...editingTown, [field]: value });
    }
  };

  const saveEditingTown = () => {
    if (editingTown) {
      onUpdateTown(editingTown);
      setEditingTown(null);
    }
  };

  const handleDeleteTown = (code: string) => {
    if (confirm("Are you sure you want to delete this exchange?")) {
      onDeleteTown(code);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Exchange List ({towns.length} exchanges)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border">Code</th>
              <th className="p-2 text-left border">Name</th>
              <th className="p-2 text-left border">Link</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {towns.map((town) => (
              <tr key={town.code} className={town.isNew ? "bg-green-50" : ""}>
                {editingTown && editingTown.code === town.code ? (
                  <>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={editingTown.code}
                        onChange={(e) => updateEditingTown("code", e.target.value)}
                        className="w-full p-1 border rounded"
                        maxLength={3}
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={editingTown.name}
                        onChange={(e) => updateEditingTown("name", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={editingTown.link}
                        onChange={(e) => updateEditingTown("link", e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditingTown}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          title="Save"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => setEditingTown(null)}
                          className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2 border">{town.code}</td>
                    <td className="p-2 border">{town.name}</td>
                    <td className="p-2 border">{town.link}</td>
                    <td className="p-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditingTown(town)}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTown(town.code)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TownList;
