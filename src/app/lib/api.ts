import { GeoPoint, ItineraryResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const tripService = {
  async getLocations(): Promise<GeoPoint[]> {
    try {
      const res = await fetch(`${API_BASE}/api/locations/`);
      const data = await res.json();
      return data.locations || [];
    } catch (err) {
      console.error("Fetch locations failed", err);
      return [];
    }
  },

  async generateTrip(payload: any): Promise<ItineraryResponse> {
    const res = await fetch(`${API_BASE}/api/trips/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async discoverNearby(payload: any): Promise<ItineraryResponse> {
    const res = await fetch(`${API_BASE}/api/trips/discover`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  }
};