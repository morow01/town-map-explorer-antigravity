
import { MapPin } from "lucide-react";

interface TownMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const TownMap = ({ latitude, longitude, name }: TownMapProps) => {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={openGoogleMaps}
      className="group w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-200 transition-all duration-200"
    >
      <MapPin className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
      <span className="text-sm font-medium">View on Google Maps</span>
    </button>
  );
};

export default TownMap;
