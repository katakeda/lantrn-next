export interface Facility {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  facilityId: string;
  primaryImg: string;
}

export interface GetMetadata {
  page: number;
  total: number;
}

export interface FacilitiesResponse {
  data: Facility[];
  metadata: GetMetadata;
}
