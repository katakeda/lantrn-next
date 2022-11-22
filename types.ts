export interface Facility {
  FacilityID: string;
  FacilityName: string;
  FacilityDescription: string;
  FacilityReservationURL: string;
  FacilityLatitude: number;
  FacilityLongitude: number;
  MEDIA?: FacilityMedia[];
}

export interface FacilityMedia {
  URL: string;
}

export interface FacilityResponseData {
  METADATA: {
    RESULTS: {
      CURRENT_COUNT: number;
      TOTAL_COUNT: number;
    };
    SEARCH_PARAMETERS: {
      LIMIT: number;
      OFFSET: number;
      QUERY: string;
    };
  };
  RECDATA: Facility[];
}