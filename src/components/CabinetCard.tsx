
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, X, Server, MapPin, Info, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CabinetCardProps {
  cabinet: any; // Input cabinet from search results
  onClose: () => void;
  onEdit: () => void;
}

const CabinetCard = ({ cabinet: baseCabinet, onClose, onEdit }: CabinetCardProps) => {
  const { data: cabinet, isLoading } = useQuery({
    queryKey: ['details', baseCabinet.id],
    queryFn: async () => {
      const response = await fetch(`/api/details/${baseCabinet.id}`);
      if (!response.ok) throw new Error('Failed to fetch details');
      const data = await response.json();

      // Ensure numeric coordinates
      if (data.latitude !== undefined) data.latitude = parseFloat(String(data.latitude));
      if (data.longitude !== undefined) data.longitude = parseFloat(String(data.longitude));

      return data;
    },
    initialData: baseCabinet,
  });

  const getCoordinates = (link: string) => {
    if (!link) return { lat: 0, lng: 0 };
    const parts = link.split(',');
    return { lat: parseFloat(parts[0]) || 0, lng: parseFloat(parts[1]) || 0 };
  };

  const { lat, lng } = cabinet.latitude && cabinet.longitude ?
    { lat: cabinet.latitude, lng: cabinet.longitude } :
    getCoordinates(cabinet.link);

  return (
    <div className="w-full mx-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{cabinet.mdf}</h2>
              <div className="flex gap-2">
                <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">CCP: {cabinet.ccp_no}</span>
                <span className="text-sm font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">IPID: {cabinet.ipid}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-9 gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4"
            >
              <Edit2 className="w-4 h-4" />
              Edit Site
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <MapPin className="w-4 h-4" />
                Location
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">MDF Name</span>
                  <span className="font-medium text-gray-900">{cabinet.mdf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CCP Number</span>
                  <span className="font-medium text-gray-900">{cabinet.ccp_no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Coordinates</span>
                  <span className="font-medium text-gray-900">{Number(lat).toFixed(6)}, {Number(lng).toFixed(6)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-3">
                <Info className="w-4 h-4" />
                Status
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-900">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl overflow-hidden h-48 md:h-full min-h-[180px]">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=17&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinetCard;
