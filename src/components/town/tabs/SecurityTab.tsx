
import { Town } from "@/types/town";

interface SecurityTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function SecurityTab({ town, shouldShowField }: SecurityTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shouldShowField(town.hasWatchman) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Watchman On Site</label>
            <div className="flex space-x-4 text-sm bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${town.hasWatchman ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <span>{town.hasWatchman ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}
        {shouldShowField(town.watchmanHours) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Watchman Hours</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.watchmanHours || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.watchmanPhone) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Watchman Phone</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.watchmanPhone || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.keyCentres) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Centres</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.keyCentres || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.keys) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keys</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.keys || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.keys2) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keys 2</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.keys2 || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.doorCode) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Door Code</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.doorCode || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.intruderAlarmCode) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intruder Alarm Code</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.intruderAlarmCode || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.locationOfRecords) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location of Records</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.locationOfRecords || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.securityRemarks) && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Remarks</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
              {town.securityRemarks || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
