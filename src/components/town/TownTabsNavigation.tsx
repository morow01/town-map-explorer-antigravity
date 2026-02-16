
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, FileBarChart, Building, Shield, Zap, Phone, FileText } from "lucide-react";

export function TownTabsNavigation() {
  return (
    <TabsList className="flex w-max min-w-full mb-4 sm:mb-6">
      <TabsTrigger value="location" className="text-xs whitespace-nowrap">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Location</span>
        <span className="sm:hidden">Loc</span>
      </TabsTrigger>
      <TabsTrigger value="siteDetails" className="text-xs whitespace-nowrap">
        <FileBarChart className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Site Details</span>
        <span className="sm:hidden">Details</span>
      </TabsTrigger>
      <TabsTrigger value="address" className="text-xs whitespace-nowrap">
        <Building className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Address</span>
        <span className="sm:hidden">Addr</span>
      </TabsTrigger>
      <TabsTrigger value="security" className="text-xs whitespace-nowrap">
        <Shield className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Security</span>
        <span className="sm:hidden">Sec</span>
      </TabsTrigger>
      <TabsTrigger value="power" className="text-xs whitespace-nowrap">
        <Zap className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Power</span>
        <span className="sm:hidden">Pwr</span>
      </TabsTrigger>
      <TabsTrigger value="emergency" className="text-xs whitespace-nowrap">
        <Phone className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Emergency</span>
        <span className="sm:hidden">Emrg</span>
      </TabsTrigger>
      <TabsTrigger value="additionalDetails" className="text-xs whitespace-nowrap">
        <FileText className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Additional</span>
        <span className="sm:hidden">More</span>
      </TabsTrigger>
    </TabsList>
  );
}
