export interface Town {
  code: string;
  name: string;
  county: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export const romanianTowns: Town[] = [
  { code: "BUC01", name: "București", county: "București", coordinates: { lat: 44.4268, lon: 26.1025 } },
  { code: "CLJ01", name: "Cluj-Napoca", county: "Cluj", coordinates: { lat: 46.7712, lon: 23.6236 } },
  { code: "TIM01", name: "Timișoara", county: "Timiș", coordinates: { lat: 45.7489, lon: 21.2087 } },
  { code: "IAS01", name: "Iași", county: "Iași", coordinates: { lat: 47.1585, lon: 27.6014 } },
  { code: "CTA01", name: "Constanța", county: "Constanța", coordinates: { lat: 44.1598, lon: 28.6348 } },
  { code: "CRV01", name: "Craiova", county: "Dolj", coordinates: { lat: 44.3302, lon: 23.7949 } },
  { code: "BRS01", name: "Brașov", county: "Brașov", coordinates: { lat: 45.6427, lon: 25.5887 } },
  { code: "GLT01", name: "Galați", county: "Galați", coordinates: { lat: 45.4353, lon: 28.0080 } },
  { code: "PLO01", name: "Ploiești", county: "Prahova", coordinates: { lat: 44.9432, lon: 26.0226 } },
  { code: "ORD01", name: "Oradea", county: "Bihor", coordinates: { lat: 47.0465, lon: 21.9189 } },
  { code: "BCU01", name: "Bacău", county: "Bacău", coordinates: { lat: 46.5670, lon: 26.9146 } },
  { code: "PTI01", name: "Pitești", county: "Argeș", coordinates: { lat: 44.8565, lon: 24.8692 } },
  { code: "SBU01", name: "Sibiu", county: "Sibiu", coordinates: { lat: 45.7983, lon: 24.1256 } },
  { code: "TGM01", name: "Târgu Mureș", county: "Mureș", coordinates: { lat: 46.5427, lon: 24.5574 } },
  { code: "BAI01", name: "Baia Mare", county: "Maramureș", coordinates: { lat: 47.6567, lon: 23.5676 } },
  { code: "BZU01", name: "Buzău", county: "Buzău", coordinates: { lat: 45.1500, lon: 26.8203 } },
  { code: "BTU01", name: "Botoșani", county: "Botoșani", coordinates: { lat: 47.7486, lon: 26.6619 } },
  { code: "STU01", name: "Satu Mare", county: "Satu Mare", coordinates: { lat: 47.7914, lon: 22.8854 } },
  { code: "RMV01", name: "Râmnicu Vâlcea", county: "Vâlcea", coordinates: { lat: 45.1000, lon: 24.3667 } },
  { code: "SUC01", name: "Suceava", county: "Suceava", coordinates: { lat: 47.6514, lon: 26.2538 } },
];

export const findTownByCode = (code: string): Town | undefined => {
  return romanianTowns.find(town => town.code.toLowerCase() === code.toLowerCase());
};

// Find closest town based on IP geolocation coordinates
export const findClosestTown = (lat: number, lon: number): Town | null => {
  if (!lat || !lon) return null;
  
  let closestTown: Town | null = null;
  let minDistance = Infinity;
  
  romanianTowns.forEach(town => {
    if (town.coordinates) {
      // Calculate simple Euclidean distance
      const distance = Math.sqrt(
        Math.pow(town.coordinates.lat - lat, 2) + 
        Math.pow(town.coordinates.lon - lon, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestTown = town;
      }
    }
  });
  
  return closestTown;
};
