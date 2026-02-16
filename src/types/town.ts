
export interface Town {
  code: string;
  name: string;
  link: string;
  // These will be calculated from the link string when needed
  latitude?: number;
  longitude?: number;
  mprnNumber?: string;
  description?: string;
  notes?: string;
  photoGalleryUrl?: string;
  isNew?: boolean;
  
  // Address Information Tab
  street?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  timeZone?: string;
  receptionPhone?: string;
  faxNumber?: string;
  locationId?: string;
  
  // Site Details Tab
  siteCode?: string;
  parentSiteCode?: string;
  parentSiteName?: string;
  xCoordinate?: string;
  yCoordinate?: string;
  siteType?: string;
  area?: string;
  numberRange?: string;
  numberOfCustomers?: string;
  skillType?: string;
  isAdvantexSite?: boolean;
  alcatelSiteCode?: string;
  
  // Additional Details Tab
  additionalDetails?: string;
  
  // Address Secondary Tab
  exchangeTeleNumber?: string;
  outOfAreaNumber?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  county?: string;
  district?: string;
  region?: string;
  directionsToBuilding?: string;
  
  // Security Tab
  hasWatchman?: boolean;
  watchmanHours?: string;
  watchmanPhone?: string;
  keyCentres?: string;
  keys?: string;
  keys2?: string;
  doorCode?: string;
  intruderAlarmCode?: string;
  locationOfRecords?: string;
  securityRemarks?: string;
  
  // Power Details Tab
  hasGenerator?: boolean;
  hasMaxDemand?: boolean;
  hasAutoCutIn?: boolean;
  generatorInfo?: string;
  esbPhone?: string;
  esbAccount?: string;
  esbDistrict?: string;
  powerRemarks?: string;
  
  // Emergency Tab
  gardaNumber?: string;
  fireBrigadeNumber?: string;
  ambulanceNumber?: string;
  specialSafetyIssues?: string;
  waterNumber?: string;
  waterShutOffLocation?: string;
  gasBoardNumber?: string;
  gasShutOffLocation?: string;
  
  // History Tab (optional - not implementing full history functionality)
  historyEntries?: {
    incidentNo: string;
    incidentType: string;
    priority: string;
    siteCode: string;
    reportedDate: string;
    status: string;
    assignee?: string;
    summary: string;
  }[];
}
