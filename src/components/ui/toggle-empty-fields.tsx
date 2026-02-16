
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleEmptyFieldsProps {
  showEmpty: boolean;
  onToggle: (show: boolean) => void;
}

export const ToggleEmptyFields = ({ showEmpty, onToggle }: ToggleEmptyFieldsProps) => {
  return (
    <div className="flex items-center space-x-1">
      <Label htmlFor="show-empty" className="text-xs whitespace-nowrap">
        {showEmpty ? "Hide empty fields" : "Show empty fields"}
      </Label>
      <Switch
        checked={showEmpty}
        onCheckedChange={onToggle}
        id="show-empty"
        className="h-3.5 w-7"
      />
    </div>
  );
};
