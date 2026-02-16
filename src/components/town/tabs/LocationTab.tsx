
import { Town } from "@/types/town";
import { Camera, MapPin } from "lucide-react";
import TownMap from "../../TownMap";

interface LocationTabProps {
  town: Town;
  latitude: number;
  longitude: number;
  photoGalleryUrl: string | undefined;
  shouldShowField: (value: any) => boolean;
}

export function LocationTab({ town, latitude, longitude, photoGalleryUrl, shouldShowField }: LocationTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {shouldShowField(town.siteCode) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Code</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
                  {town.siteCode || "N/A"}
                </div>
              </div>
            )}
            {shouldShowField(town.description) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
                  {town.description || "N/A"}
                </div>
              </div>
            )}
            {shouldShowField(latitude) && shouldShowField(longitude) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Coordinates</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
                  {Number(latitude).toFixed(6)}, {Number(longitude).toFixed(6)}
                </div>
              </div>
            )}
            {shouldShowField(town.locationId) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location ID</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
                  {town.locationId || "N/A"}
                </div>
              </div>
            )}
            {shouldShowField(town.notes) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
                  {town.notes || "N/A"}
                </div>
              </div>
            )}
            {shouldShowField(town.mprnNumber) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MPRN Number</label>
                <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[36px]">
                  {town.mprnNumber || "N/A"}
                </div>
              </div>
            )}
          </div>

          {shouldShowField(photoGalleryUrl) && (
            <div className="pt-2">
              <a
                href={photoGalleryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-200 transition-all duration-200 group"
              >
                <Camera className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />
                <span className="text-sm font-medium">View Photo Gallery</span>
              </a>
            </div>
          )}
        </div>

        <div className="min-h-[250px] md:min-h-full">
          <TownMap latitude={latitude} longitude={longitude} name={town.name} />
        </div>
      </div>
    </div>
  );
}
