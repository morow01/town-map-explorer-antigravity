import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface TownMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const TownMap = ({ latitude, longitude, name }: TownMapProps) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay map rendering to ensure layout transitions (header resize) are complete
    const timer = setTimeout(() => setIsReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-48 md:h-full min-h-[180px] bg-gray-200 rounded-xl overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      {isReady && (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=17&output=embed`}
          title={`Map of ${name}`}
          className="w-full h-full pointer-events-auto"
        ></iframe>
      )}

      {/* Mobile-only external link hint */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-gray-100"
        aria-label="Open in Google Maps"
      >
        <MapPin className="w-4 h-4 text-gray-600" />
      </a>
    </div>
  );
};

export default TownMap;
