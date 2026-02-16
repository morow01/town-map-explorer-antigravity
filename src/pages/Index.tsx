
import { useState } from "react";
import TownSearch from "@/components/TownSearch";
import TownCard from "@/components/TownCard";
import CabinetSearch from "@/components/CabinetSearch";
import CabinetCard from "@/components/CabinetCard";
import AdminDashboard from "@/components/AdminDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Server, Settings } from "lucide-react";

const Index = () => {
  const [selectedTown, setSelectedTown] = useState<any | null>(null);
  const [selectedCabinet, setSelectedCabinet] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("towns");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editSiteId, setEditSiteId] = useState<number | undefined>();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSelectTown = (town: any) => {
    setSelectedTown(town);
    setSelectedCabinet(null);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleSelectCabinet = (cabinet: any) => {
    setSelectedCabinet(cabinet);
    setSelectedTown(null);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleCloseTownCard = () => {
    setSelectedTown(null);
  };

  const handleCloseCabinetCard = () => {
    setSelectedCabinet(null);
  };

  const handleEditSite = (id: number) => {
    setEditSiteId(id);
    setIsAdmin(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedTown(null);
    setSelectedCabinet(null);
    setIsSearchFocused(false);
  };

  if (isAdmin) {
    return (
      <AdminDashboard
        onBack={() => {
          setIsAdmin(false);
          setEditSiteId(undefined);
        }}
        initialSiteId={editSiteId}
      />
    );
  }

  const shouldHideHeader = searchQuery.length > 0 || !!selectedTown || !!selectedCabinet || isSearchFocused;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className={`flex flex-col items-center relative transition-all duration-500 ease-in-out ${shouldHideHeader ? 'mb-4 md:mb-12 pt-0' : 'mb-12'}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdmin(true)}
            className={`absolute top-0 right-0 gap-2 text-gray-400 hover:text-blue-600 transition-opacity duration-300 ${shouldHideHeader ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Admin</span>
          </Button>
          <div
            className="text-center transition-all duration-500 ease-in-out cursor-pointer group"
            onClick={handleReset}
          >
            <h1 className={`font-extrabold tracking-tight text-gray-700 transition-all duration-500 ${shouldHideHeader ? 'text-xl md:text-4xl mb-0 md:mb-2' : 'text-4xl mb-2'}`}>
              Exchange Finder
            </h1>
            <p className={`text-gray-600 font-medium overflow-hidden transition-all duration-500 ${shouldHideHeader ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
              Explore and manage network infrastructure with ease.
            </p>
          </div>
        </header>

        <Tabs
          defaultValue="towns"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setSelectedTown(null);
            setSelectedCabinet(null);
            setSearchQuery("");
            setIsSearchFocused(false);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-md p-1 rounded-xl border border-gray-200 shadow-sm">
            <TabsTrigger value="towns" className="flex items-center gap-2 py-3 rounded-lg transition-all">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Exchanges</span>
            </TabsTrigger>
            <TabsTrigger value="cabinets" className="flex items-center gap-2 py-3 rounded-lg transition-all">
              <Server className="w-5 h-5" />
              <span className="font-semibold">Cabinets</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="towns" className="mt-2 outline-none">
            <div className="mb-10">
              <TownSearch
                onSelectTown={handleSelectTown}
                onSearchQueryChange={setSearchQuery}
                onFocusChange={setIsSearchFocused}
              />
            </div>

            {selectedTown ? (
              <div className="mt-8">
                <TownCard
                  town={selectedTown}
                  onClose={handleCloseTownCard}
                  onEdit={() => handleEditSite(selectedTown.id)}
                />
              </div>
            ) : (
              <div className={`text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 ${shouldHideHeader ? 'hidden md:block' : 'block'}`}>
                <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to explore?</h2>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Search for an exchange name or code above to view detailed site information.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cabinets" className="mt-2 outline-none">
            <div className="mb-10">
              <CabinetSearch
                onSelectCabinet={handleSelectCabinet}
                onSearchQueryChange={setSearchQuery}
                onFocusChange={setIsSearchFocused}
              />
            </div>

            {selectedCabinet ? (
              <div className="mt-8">
                <CabinetCard
                  cabinet={selectedCabinet}
                  onClose={handleCloseCabinetCard}
                  onEdit={() => handleEditSite(selectedCabinet.id)}
                />
              </div>
            ) : (
              <div className={`text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 ${shouldHideHeader ? 'hidden md:block' : 'block'}`}>
                <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Server className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Cabinet Finder</h2>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Search by IPID, MDF, or CCP number to locate specific network cabinets.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
