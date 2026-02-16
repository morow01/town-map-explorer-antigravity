
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TownCardHeader } from "./town/TownCardHeader";
import { TownTabsNavigation } from "./town/TownTabsNavigation";
import { LocationTab } from "./town/tabs/LocationTab";
import { SiteDetailsTab } from "./town/tabs/SiteDetailsTab";
import { AddressTab } from "./town/tabs/AddressTab";
import { SecurityTab } from "./town/tabs/SecurityTab";
import { PowerTab } from "./town/tabs/PowerTab";
import { EmergencyTab } from "./town/tabs/EmergencyTab";
import { AdditionalDetailsTab } from "./town/tabs/AdditionalDetailsTab";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface TownCardProps {
  town: any; // Input town from search results
  onClose: () => void;
  onEdit: () => void;
}

const TownCard = ({ town: baseTown, onClose, onEdit }: TownCardProps) => {
  const [showEmptyFields, setShowEmptyFields] = useState(false);

  const { data: town, isLoading } = useQuery({
    queryKey: ['details', baseTown.id],
    queryFn: async () => {
      const response = await fetch(`/api/details/${baseTown.id}`);
      if (!response.ok) throw new Error('Failed to fetch details');
      const data = await response.json();

      // Flatten details into the town object for compatibility with existing tabs
      const flattened = { ...data };
      if (data.details) {
        Object.values(data.details).forEach((category: any) => {
          Object.entries(category).forEach(([key, value]) => {
            // Only assign if the value is not empty or if it's a primary core field
            if (value !== "" || !flattened[key]) {
              flattened[key] = value;
            }
          });
        });
      }

      // Ensure latitude and longitude are numbers
      if (flattened.latitude !== undefined) flattened.latitude = parseFloat(String(flattened.latitude));
      if (flattened.longitude !== undefined) flattened.longitude = parseFloat(String(flattened.longitude));

      return flattened;
    },
    initialData: baseTown, // Use search result data as initial state
  });

  if (isLoading && !town.details) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  const getCoordinates = (link: string) => {
    if (!link) return { latitude: 0, longitude: 0 };
    const parts = link.split(',');
    return { latitude: parseFloat(parts[0]) || 0, longitude: parseFloat(parts[1]) || 0 };
  };

  const { latitude, longitude } = town.latitude && town.longitude ?
    { latitude: town.latitude, longitude: town.longitude } :
    getCoordinates(town.link);

  const shouldShowField = (value: any) => {
    return showEmptyFields || (value !== undefined && value !== null && value !== "");
  };

  return (
    <div className="relative z-20 w-full mx-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="relative p-3 sm:p-6">
        <TownCardHeader
          townName={town.name}
          townCode={town.code}
          showEmptyFields={showEmptyFields}
          onToggleEmptyFields={setShowEmptyFields}
          onClose={onClose}
          onEdit={onEdit}
        />

        <Tabs defaultValue="location" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TownTabsNavigation />
          </div>

          <TabsContent value="location">
            <LocationTab
              town={town}
              latitude={latitude}
              longitude={longitude}
              photoGalleryUrl={town.photo_gallery_url}
              shouldShowField={shouldShowField}
            />
          </TabsContent>

          <TabsContent value="siteDetails">
            <SiteDetailsTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>

          <TabsContent value="additionalDetails">
            <AdditionalDetailsTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>

          <TabsContent value="address">
            <AddressTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>

          <TabsContent value="power">
            <PowerTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyTab town={town} shouldShowField={shouldShowField} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TownCard;
