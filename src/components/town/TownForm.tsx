
import { useState } from "react";
import { Plus } from "lucide-react";
import { Town } from "@/types/town";

interface TownFormProps {
  onAddTown: (town: Town) => void;
}

const TownForm = ({ onAddTown }: TownFormProps) => {
  const [newTown, setNewTown] = useState<Partial<Town>>({
    code: "",
    name: "",
    link: "",
  });

  const updateNewTown = (field: keyof Town, value: string) => {
    setNewTown({ ...newTown, [field]: value });
  };

  const handleAddTown = () => {
    if (
      newTown.code &&
      newTown.name &&
      newTown.link
    ) {
      const townToAdd: Town = {
        code: newTown.code as string,
        name: newTown.name as string,
        link: newTown.link as string,
        isNew: true,
      };
      onAddTown(townToAdd);
      
      // Reset the form
      setNewTown({
        code: "",
        name: "",
        link: "",
      });
    } else {
      alert("Please fill in all required fields (Code, Name, and Link)");
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-2">Add New Exchange</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code*</label>
          <input
            type="text"
            value={newTown.code}
            onChange={(e) => updateNewTown("code", e.target.value)}
            className="w-full p-2 border rounded"
            maxLength={3}
            placeholder="3-letter code"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
          <input
            type="text"
            value={newTown.name}
            onChange={(e) => updateNewTown("name", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Exchange name"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Link (format: latitude,longitude)*</label>
          <input
            type="text"
            value={newTown.link}
            onChange={(e) => updateNewTown("link", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="53.511972,-6.395443"
          />
        </div>
      </div>
      <button
        onClick={handleAddTown}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
      >
        <Plus size={16} />
        Add Exchange
      </button>
    </div>
  );
};

export default TownForm;
