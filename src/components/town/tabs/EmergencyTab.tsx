
import { Town } from "@/types/town";

interface EmergencyTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function EmergencyTab({ town, shouldShowField }: EmergencyTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shouldShowField(town.gardaNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Garda Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.gardaNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.fireBrigadeNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fire Brigade Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.fireBrigadeNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.ambulanceNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ambulance Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.ambulanceNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.waterNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.waterNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.gasBoardNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Board Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.gasBoardNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.specialSafetyIssues) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Safety Issues</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.specialSafetyIssues || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.waterShutOffLocation) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Shut Off Location</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.waterShutOffLocation || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.gasShutOffLocation) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gas Shut Off Location</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.gasShutOffLocation || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
