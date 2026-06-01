import { useState } from 'react';

export interface GeocodeData {
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  displayName?: string;
}

export const useGeocoding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Reverse geocodes a longitude/latitude coordinate using OpenStreetMap Nominatim
   */
  const reverseGeocode = async (lng: number, lat: number): Promise<GeocodeData | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`, {
        headers: {
          // Nominatim requires a user-agent
          'User-Agent': 'IllegalSandMiningApp/1.0'
        }
      });
      
      if (!res.ok) throw new Error("Failed to reverse geocode");
      
      const data = await res.json();
      
      return {
        city: data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.suburb || data.address.neighbourhood || data.address.county || 'Rural Area',
        district: data.address.county || data.address.state_district,
        state: data.address.state,
        country: data.address.country,
        displayName: data.display_name
      };
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all named rivers intersecting a given bounding box using Overpass API
   * bbox format: [minLng, minLat, maxLng, maxLat]
   */
  const fetchRiversInROI = async (bbox: [number, number, number, number]) => {
    setLoading(true);
    setError(null);
    try {
      // Overpass bbox format is [minLat, minLng, maxLat, maxLng]
      const overpassBbox = `${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]}`;
      
      // Query for waterways (rivers, canals, riverbanks) inside ROI
      const query = `
        [out:json][timeout:25];
        (
          way["waterway"="river"](${overpassBbox});
          way["waterway"="riverbank"](${overpassBbox});
          way["waterway"="canal"](${overpassBbox});
        );
        out geom;
      `;
      
      // Use Kumi Systems public overpass instance which does not block browser user-agents
      const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ data: query })
      });
      
      if (!res.ok) throw new Error("Failed to fetch rivers from Overpass");
      
      const data = await res.json();
      
      // Convert Overpass geometry to GeoJSON
      const features = data.elements.map((el: any) => {
        const coordinates = el.geometry.map((g: any) => [g.lon, g.lat]);
        return {
          type: "Feature",
          properties: {
            id: el.id,
            name: el.tags.name || el.tags.name_en || el.tags.official_name || 'Unnamed Waterway',
            waterway: el.tags.waterway
          },
          geometry: {
            type: "LineString",
            coordinates: coordinates
          }
        };
      });
      
      return {
        type: "FeatureCollection",
        features: features
      };
      
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all nearby cities (up to 50km) and towns/villages (up to 20km) using Overpass API
   */
  const fetchNearbyPlaces = async (lng: number, lat: number) => {
    setLoading(true);
    setError(null);
    try {
      const query = `
        [out:json][timeout:15];
        (
          node["place"="city"](around:50000, ${lat}, ${lng});
          node["place"~"town|village"](around:20000, ${lat}, ${lng});
        );
        out body;
      `;
      
      // Use Kumi Systems public overpass instance which does not block browser user-agents
      const res = await fetch('https://overpass.kumi.systems/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ data: query })
      });
      
      if (!res.ok) throw new Error("Failed to fetch nearby places");
      
      const data = await res.json();
      
      // Calculate distances and map to clean object
      const places = data.elements.map((el: any) => {
        const pLat = el.lat;
        const pLng = el.lon;
        
        // Simple Haversine distance calculation
        const R = 6371; // Earth radius in km
        const dLat = (pLat - lat) * Math.PI / 180;
        const dLon = (pLng - lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat * Math.PI / 180) * Math.cos(pLat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // Distance in km
        
        return {
          name: el.tags.name || el.tags.name_en || 'Unnamed Settlement',
          type: el.tags.place, // 'city', 'town', or 'village'
          distance: parseFloat(distance.toFixed(1))
        };
      });
      
      // Segregate places
      const cities = places
        .filter((p: any) => p.type === 'city')
        .sort((a: any, b: any) => a.distance - b.distance);
      
      const townsVillages = places
        .filter((p: any) => p.type === 'town' || p.type === 'village')
        .sort((a: any, b: any) => a.distance - b.distance);
      
      // Combine: cities sorted by proximity first, then padded with towns/villages sorted by proximity
      const sortedPlaces = [...cities, ...townsVillages].slice(0, 5);
      
      return sortedPlaces;
    } catch (err: any) {
      console.error("Error fetching nearby places:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { reverseGeocode, fetchRiversInROI, fetchNearbyPlaces, loading, error };
};
