
import { MapPin } from "lucide-react";

interface TownMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const TownMap = ({ latitude, longitude, name }: TownMapProps) => {
  return (
    <div className="bg-gray-200 rounded-xl overflow-hidden h-48 md:h-full min-h-[180px] w-full">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=17&output=embed`}
        title={`Map of ${name}`}
      ></iframe>
    </div>
  );
};

export default TownMap;
