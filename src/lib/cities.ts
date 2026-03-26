export interface City {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  state: string;
}

export const topCities: City[] = [
  { name: 'Indore', slug: 'indore', lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
  { name: 'Delhi', slug: 'delhi', lat: 28.7041, lng: 77.1025, state: 'Delhi' },
  { name: 'Mumbai', slug: 'mumbai', lat: 19.0760, lng: 72.8777, state: 'Maharashtra' },
  { name: 'Jaipur', slug: 'jaipur', lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
  { name: 'Bangalore', slug: 'bangalore', lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  { name: 'Chennai', slug: 'chennai', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  { name: 'Kolkata', slug: 'kolkata', lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
  { name: 'Ahmedabad', slug: 'ahmedabad', lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
  { name: 'Pune', slug: 'pune', lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  { name: 'Hyderabad', slug: 'hyderabad', lat: 17.3850, lng: 78.4867, state: 'Telangana' }
];

export function getCityBySlug(slug: string): City | undefined {
  return topCities.find((city) => city.slug === slug);
}
