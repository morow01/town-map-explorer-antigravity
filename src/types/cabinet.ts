
export interface Cabinet {
  IPID: number;
  MDF: string;
  CCP_NO: string;
  link: string;
  // These will be calculated from the link string when needed
  latitude?: number;
  longitude?: number;
  description?: string;
  notes?: string;
  isNew?: boolean;
}
