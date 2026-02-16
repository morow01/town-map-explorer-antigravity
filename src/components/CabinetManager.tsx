
import { useState, useEffect } from "react";
import { Cabinet } from "@/types/cabinet";
import { Plus, Trash, X, Edit, Check } from "lucide-react";

interface CabinetManagerProps {
  initialCabinets: Cabinet[];
  onUpdateCabinets: (cabinets: Cabinet[]) => void;
}

const CabinetManager = ({ initialCabinets, onUpdateCabinets }: CabinetManagerProps) => {
  const [cabinets, setCabinets] = useState<Cabinet[]>([...initialCabinets]);
  const [editingCabinet, setEditingCabinet] = useState<Cabinet | null>(null);
  const [showManager, setShowManager] = useState(false);
  const [newCabinet, setNewCabinet] = useState<Partial<Cabinet>>({
    IPID: 0,
    MDF: "",
    CCP_NO: "",
    link: "",
  });

  // Sync local state with parent state
  useEffect(() => {
    setCabinets([...initialCabinets]);
  }, [initialCabinets]);

  // Update parent state when local state changes
  useEffect(() => {
    onUpdateCabinets(cabinets);
  }, [cabinets, onUpdateCabinets]);

  const startEditingCabinet = (cabinet: Cabinet) => {
    setEditingCabinet({ ...cabinet });
  };

  const updateEditingCabinet = (field: keyof Cabinet, value: string | number) => {
    if (editingCabinet) {
      setEditingCabinet({ ...editingCabinet, [field]: value });
    }
  };

  const saveEditingCabinet = () => {
    if (editingCabinet) {
      setCabinets(cabinets.map((c) => (c.IPID === editingCabinet.IPID ? editingCabinet : c)));
      setEditingCabinet(null);
    }
  };

  const updateNewCabinet = (field: keyof Cabinet, value: string | number) => {
    setNewCabinet({ ...newCabinet, [field]: value });
  };

  const addNewCabinet = () => {
    if (
      newCabinet.IPID &&
      newCabinet.MDF &&
      newCabinet.CCP_NO &&
      newCabinet.link
    ) {
      const cabinetToAdd: Cabinet = {
        IPID: newCabinet.IPID as number,
        MDF: newCabinet.MDF as string,
        CCP_NO: newCabinet.CCP_NO as string,
        link: newCabinet.link as string,
        isNew: true,
      };
      setCabinets([...cabinets, cabinetToAdd]);
      
      // Reset the form
      setNewCabinet({
        IPID: 0,
        MDF: "",
        CCP_NO: "",
        link: "",
      });
    } else {
      alert("Please fill in all required fields (IPID, MDF, CCP_NO, and Link)");
    }
  };

  const deleteCabinet = (IPID: number) => {
    if (confirm("Are you sure you want to delete this cabinet?")) {
      setCabinets(cabinets.filter((c) => c.IPID !== IPID));
    }
  };

  const exportCabinets = () => {
    const dataStr = JSON.stringify(cabinets, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "cabinets.json";

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
        {showManager ? "Hide Cabinet Manager" : "Show Cabinet Manager"}
      </button>

      {showManager && (
        <div className="mt-4 bg-white p-6 rounded-lg border shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Cabinet Manager</h2>
            <button
              onClick={exportCabinets}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
            >
              Export Cabinets
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Add New Cabinet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IPID*</label>
                <input
                  type="number"
                  value={newCabinet.IPID || ""}
                  onChange={(e) => updateNewCabinet("IPID", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                  placeholder="IPID number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MDF*</label>
                <input
                  type="text"
                  value={newCabinet.MDF}
                  onChange={(e) => updateNewCabinet("MDF", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="MDF"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CCP_NO*</label>
                <input
                  type="text"
                  value={newCabinet.CCP_NO}
                  onChange={(e) => updateNewCabinet("CCP_NO", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="CCP_NO"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (format: latitude,longitude)*</label>
                <input
                  type="text"
                  value={newCabinet.link}
                  onChange={(e) => updateNewCabinet("link", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="53.511972,-6.395443"
                />
              </div>
            </div>
            <button
              onClick={addNewCabinet}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Cabinet
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Cabinet List ({cabinets.length} cabinets)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">IPID</th>
                    <th className="p-2 text-left border">MDF</th>
                    <th className="p-2 text-left border">CCP_NO</th>
                    <th className="p-2 text-left border">Link</th>
                    <th className="p-2 text-left border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cabinets.map((cabinet) => (
                    <tr key={cabinet.IPID} className={cabinet.isNew ? "bg-green-50" : ""}>
                      {editingCabinet && editingCabinet.IPID === cabinet.IPID ? (
                        <>
                          <td className="p-2 border">
                            <input
                              type="number"
                              value={editingCabinet.IPID}
                              onChange={(e) => updateEditingCabinet("IPID", parseInt(e.target.value) || 0)}
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={editingCabinet.MDF}
                              onChange={(e) => updateEditingCabinet("MDF", e.target.value)}
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={editingCabinet.CCP_NO}
                              onChange={(e) => updateEditingCabinet("CCP_NO", e.target.value)}
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="text"
                              value={editingCabinet.link}
                              onChange={(e) => updateEditingCabinet("link", e.target.value)}
                              className="w-full p-1 border rounded"
                            />
                          </td>
                          <td className="p-2 border">
                            <div className="flex gap-2">
                              <button
                                onClick={saveEditingCabinet}
                                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                title="Save"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => setEditingCabinet(null)}
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
                          <td className="p-2 border">{cabinet.IPID}</td>
                          <td className="p-2 border">{cabinet.MDF}</td>
                          <td className="p-2 border">{cabinet.CCP_NO}</td>
                          <td className="p-2 border">{cabinet.link}</td>
                          <td className="p-2 border">
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEditingCabinet(cabinet)}
                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteCabinet(cabinet.IPID)}
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
        </div>
      )}
    </div>
  );
};

export default CabinetManager;
