
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, Save, Trash2, Edit2, X, LayoutGrid, List, Database, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_FIELDS: Record<string, string[]> = {
    location: ['townName', 'siteCode', 'link', 'latitude', 'longitude', 'mprnNumber', 'photo_gallery_url'],
    siteDetails: ['siteCode', 'parentSiteCode', 'parentSiteName', 'xCoordinate', 'yCoordinate', 'siteType', 'area', 'numberRange', 'numberOfCustomers', 'skillType', 'isAdvantexSite', 'alcatelSiteCode', 'notes'],
    address: ['addressLine1', 'addressLine2', 'addressLine3', 'town', 'county', 'eircode', 'directions'],
    security: ['accessType', 'keyCode', 'securityCompany', 'contactNumber', 'alarmDetails', 'cctvStatus'],
    power: ['utilityProvider', 'mprn', 'meterSerial', 'fuseSize', 'batteryBackup', 'upsStatus'],
    emergency: ['nearestPoliceStation', 'nearestFireStation', 'emergencyProcedures', 'assemblyPoint']
};

const AdminDashboard = ({ onBack, initialSiteId }: { onBack: () => void, initialSiteId?: number }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"exchange" | "cabinet">("exchange");
    const [editingSite, setEditingSite] = useState<any>(null);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // Load initial site if provided
    useEffect(() => {
        if (initialSiteId) {
            handleEdit({ id: initialSiteId });
        }
    }, [initialSiteId]);

    const { data: results = [], isLoading } = useQuery({
        queryKey: ['admin-search', searchQuery, activeTab],
        queryFn: async () => {
            if (!searchQuery) return [];
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=${activeTab}`);
            return response.json();
        },
        enabled: !!searchQuery,
    });

    const saveDetailsMutation = useMutation({
        mutationFn: async ({ id, details }: { id: number, details: any }) => {
            const response = await fetch(`/api/details/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ details }),
            });
            return response.json();
        },
        onSuccess: () => {
            toast({ title: "Success", description: "Site details saved successfully." });
        },
    });

    const handleEdit = (site: any) => {
        fetch(`/api/details/${site.id}`)
            .then(r => r.json())
            .then(data => {
                // Initialize details object with all default fields
                const initializedDetails = { ...data.details };
                Object.keys(DEFAULT_FIELDS).forEach(category => {
                    if (!initializedDetails[category]) {
                        initializedDetails[category] = {};
                    }
                    DEFAULT_FIELDS[category].forEach(field => {
                        if (initializedDetails[category][field] === undefined) {
                            initializedDetails[category][field] = data[field] || "";
                        }
                    });
                });
                setEditingSite({ ...data, details: initializedDetails });
            });
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-500">Manage sites, exchanges, and cabinets</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Plus className="w-4 h-4" />
                            New Site
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Search */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                            <h2 className="font-semibold flex items-center gap-2">
                                <Database className="w-4 h-4 text-blue-600" />
                                Data Explorer
                            </h2>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setActiveTab("exchange")}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'exchange' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    Exchanges
                                </button>
                                <button
                                    onClick={() => setActiveTab("cabinet")}
                                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'cabinet' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                                >
                                    Cabinets
                                </button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder={`Search ${activeTab}s...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-11 bg-gray-50/50 border-gray-200"
                                />
                            </div>

                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {results.map((result: any) => (
                                    <div
                                        key={result.id}
                                        onClick={() => handleEdit(result)}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 group ${editingSite?.id === result.id ? 'border-blue-400 bg-blue-50' : 'border-gray-100'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{result.name || result.mdf}</div>
                                                <div className="text-xs text-gray-500 group-hover:text-blue-500">{result.code || `IPID: ${result.ipid}`}</div>
                                            </div>
                                            <Edit2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400" />
                                        </div>
                                    </div>
                                ))}
                                {!searchQuery && (
                                    <div className="text-center py-8 text-gray-400">
                                        <LayoutGrid className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-xs italic">Enter search term to explore</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {editingSite ? (
                            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-300">
                                <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{editingSite.name || editingSite.mdf}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{editingSite.type} Management</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-9 gap-2">
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                            Delete
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-9 bg-blue-600 hover:bg-blue-700 gap-2"
                                            onClick={() => saveDetailsMutation.mutate({ id: editingSite.id, details: editingSite.details })}
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <Tabs defaultValue="location">
                                        <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 mb-6 gap-6">
                                            {Object.keys(DEFAULT_FIELDS).map((tab) => (
                                                <TabsTrigger
                                                    key={tab}
                                                    value={tab}
                                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-2 capitalize font-semibold text-gray-500"
                                                >
                                                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>

                                        {Object.keys(DEFAULT_FIELDS).map((tab) => (
                                            <TabsContent key={tab} value={tab} className="mt-0">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {Object.entries(editingSite.details[tab]).map(([key, value]) => (
                                                        <div key={key} className="space-y-1">
                                                            <label className="text-xs font-bold text-gray-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                                            <Input
                                                                value={value as string}
                                                                className="h-10 bg-gray-50/50 focus:bg-white"
                                                                onChange={(e) => {
                                                                    const newSite = { ...editingSite };
                                                                    newSite.details[tab][key] = e.target.value;
                                                                    setEditingSite(newSite);
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center bg-gray-50/30 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                                <Database className="w-16 h-16 text-gray-200 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No Site Selected</h3>
                                <p className="text-gray-500 max-w-sm">Select a site from the lists on the left to edit its configuration or create a new entry.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
