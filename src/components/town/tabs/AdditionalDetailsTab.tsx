
import { Town } from "@/types/town";
import { Paperclip } from "lucide-react";

interface AdditionalDetailsTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function AdditionalDetailsTab({ town, shouldShowField }: AdditionalDetailsTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {shouldShowField(town.additionalDetails) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Site Details</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[100px]">
              {town.additionalDetails || "N/A"}
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
          <div className="flex items-center justify-center h-24 bg-gray-50 rounded border border-gray-200">
            <div className="flex flex-col items-center text-gray-500">
              <Paperclip className="w-8 h-8 mb-2" />
              <span className="text-sm">No attachments available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
