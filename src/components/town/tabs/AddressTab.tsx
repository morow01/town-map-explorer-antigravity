
import { Town } from "@/types/town";

interface AddressTabProps {
  town: Town;
  shouldShowField: (value: any) => boolean;
}

export function AddressTab({ town, shouldShowField }: AddressTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shouldShowField(town.street) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.street || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.city) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.city || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.state) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.state || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.country) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.country || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.zipCode) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.zipCode || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.county) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.county || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.district) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.district || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.region) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.region || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.timeZone) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.timeZone || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.exchangeTeleNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Telephone</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.exchangeTeleNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.outOfAreaNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Out of Area Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.outOfAreaNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.receptionPhone) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reception Phone</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.receptionPhone || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.faxNumber) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fax Number</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.faxNumber || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.address1) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.address1 || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.address2) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.address2 || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.address3) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address 3</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
              {town.address3 || "N/A"}
            </div>
          </div>
        )}
        {shouldShowField(town.directionsToBuilding) && (
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Directions to Building</label>
            <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
              {town.directionsToBuilding || "N/A"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
