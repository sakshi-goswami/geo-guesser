/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 * 
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  
  // Convert degrees to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

/**
 * Convert degrees to radians
 * 
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculate score based on distance
 * Maximum score is 5000 points for perfect guess (0 km)
 * Score decreases exponentially with distance
 * 
 * @param {number} distance - Distance in kilometers
 * @returns {number} Score points (0-5000)
 */
export const calculateScore = (distance) => {
  const maxScore = 5000;
  const maxDistance = 20000; // Maximum distance for scoring (20,000 km ~ half Earth circumference)
  
  if (distance === 0) return maxScore;
  if (distance >= maxDistance) return 0;
  
  // Exponential decay formula for more realistic scoring
  // Score decreases more rapidly at first, then slower
  const score = Math.round(maxScore * Math.exp(-distance / 2000));
  
  return Math.max(0, Math.min(maxScore, score));
};