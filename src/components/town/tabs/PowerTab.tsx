
import { Town } from "@/types/town";

interface PowerTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function PowerTab({ town, shouldShowField }: PowerTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shouldShowField(town.hasGenerator) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Generator On Site</label>
            <div className="flex space-x-4 text-sm bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${town.hasGenerator ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <span>{town.hasGenerator ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}
        {shouldShowField(town.hasMaxDemand) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Demand</label>
            <div className="flex space-x-4 text-sm bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${town.hasMaxDemand ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <span>{town.hasMaxDemand ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}
        {shouldShowField(town.hasAutoCutIn) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto Cut In</label>
            <div className="flex space-x-4 text-sm bg-gray-50 p-2 rounded border border-gray-200">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${town.hasAutoCutIn ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <span>{town.hasAutoCutIn ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        )}
        {shouldShowField(town.generatorInfo) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Generator Info</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.generatorInfo || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.esbPhone) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ESB Phone</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.esbPhone || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.esbAccount) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ESB Account</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.esbAccount || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.esbDistrict) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ESB District</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.esbDistrict || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.powerRemarks) && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Power Remarks</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
              {town.powerRemarks || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
