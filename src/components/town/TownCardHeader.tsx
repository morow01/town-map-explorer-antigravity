import { X, MapPin, Edit2 } from "lucide-react";
import { ToggleEmptyFields } from "@/components/ui/toggle-empty-fields";
import { Button } from "@/components/ui/button";

interface TownCardHeaderProps {
  townName: string;
  townCode: string;
  showEmptyFields: boolean;
  onToggleEmptyFields: (show: boolean) => void;
  onClose: () => void;
  onEdit: () => void;
}

export function TownCardHeader({
  townName,
  townCode,
  showEmptyFields,
  onToggleEmptyFields,
  onClose,
  onEdit
}: TownCardHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Exchange Details</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-8 gap-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Site
          </Button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium">{townName}</h2>
          <div className="mt-1 text-sm text-gray-500">Code: {townCode}</div>
        </div>
        <div className="scale-90 transform-origin-right">
          <ToggleEmptyFields
            showEmpty={showEmptyFields}
            onToggle={onToggleEmptyFields}
          />
        </div>
      </div>
    </div>
  );
}
