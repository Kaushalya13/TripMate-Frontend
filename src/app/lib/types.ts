export interface GeoPoint {
  POI_ID: number;
  Name: string;
  City: string;
  Type: string;
  Category?: string;
}

export interface Stop extends GeoPoint {
  Cost_LKR: number;
  Time_Mins: number;
  ai_score: number;
  Latitude: number;
  Longitude: number;
  selected?: boolean
}

export interface ItineraryResponse {
  itinerary?: {
    [key: string]: Stop[];
  };
  recommendations?: Stop[];
  detail?: string;
}