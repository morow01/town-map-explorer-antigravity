
import { Town } from "@/types/town";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField } from "@/components/town/FormField";

interface SiteDetailsTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function SiteDetailsTab({ town, shouldShowField }: SiteDetailsTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shouldShowField(town.siteCode) && (
          <FormField label="Site Code" value={town.siteCode} />
        )}
        {shouldShowField(town.parentSiteCode) && (
          <FormField label="Parent Site Code" value={town.parentSiteCode} />
        )}
        {shouldShowField(town.parentSiteName) && (
          <FormField label="Parent Site Name" value={town.parentSiteName} />
        )}
        {shouldShowField(town.xCoordinate) && (
          <FormField label="X Co-ordinate" value={town.xCoordinate} />
        )}
        {shouldShowField(town.yCoordinate) && (
          <FormField label="Y Co-ordinate" value={town.yCoordinate} />
        )}
        {shouldShowField(town.siteType) && (
          <FormField label="Site Type" value={town.siteType} />
        )}
        {shouldShowField(town.area) && (
          <FormField label="Area" value={town.area} />
        )}
        {shouldShowField(town.numberRange) && (
          <FormField label="Number Range" value={town.numberRange} />
        )}
        {shouldShowField(town.numberOfCustomers) && (
          <FormField label="Number of Customers" value={town.numberOfCustomers} />
        )}
        {shouldShowField(town.skillType) && (
          <FormField label="Skill Type" value={town.skillType} />
        )}
        
        {shouldShowField(town.isAdvantexSite) !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advantex/Broker Site</label>
            <RadioGroup
              defaultValue={town.isAdvantexSite ? "yes" : "no"}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {shouldShowField(town.alcatelSiteCode) && (
          <FormField label="Alcatel Site Code" value={town.alcatelSiteCode} />
        )}
        
        {shouldShowField(town.notes) && (
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
              {town.notes || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
