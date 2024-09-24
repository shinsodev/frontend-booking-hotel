// Import icons
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from 'react-icons/fa';

// export const roomData = [
//     {
//       "id": 1,
//       "name": "Deluxe Suite",
//       "price": 120,
//       "capacity": 2,
//       "size": 50, // chỉ số diện tích
//       "description": "A luxurious suite with elegant furnishings and a beautiful view.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Mini Bar", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 2,
//       "name": "Standard Room",
//       "price": 80,
//       "capacity": 2,
//       "size": 30,
//       "description": "A comfortable standard room perfect for short stays.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 3,
//       "name": "Family Room",
//       "price": 150,
//       "capacity": 4,
//       "size": 60,
//       "description": "Spacious room ideal for families with children.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Mini Bar", "Television", "Kitchenette"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 4,
//       "name": "Luxury Suite",
//       "price": 200,
//       "capacity": 3,
//       "size": 70,
//       "description": "An opulent suite with a jacuzzi and private balcony.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Jacuzzi", "Television", "Private Balcony"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 5,
//       "name": "Single Room",
//       "price": 60,
//       "capacity": 1,
//       "size": 20,
//       "description": "A cozy room designed for solo travelers.",
//       "amenities": ["Wi-Fi", "Air Conditioning"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 6,
//       "name": "Double Room",
//       "price": 90,
//       "capacity": 2,
//       "size": 30,
//       "description": "A comfortable room with double occupancy.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 7,
//       "name": "Presidential Suite",
//       "price": 300,
//       "capacity": 5,
//       "size": 100,
//       "description": "The ultimate in luxury, featuring a private pool and chef service.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Private Pool", "Television", "Private Chef"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 8,
//       "name": "Economy Room",
//       "price": 50,
//       "capacity": 2,
//       "size": 25,
//       "description": "An affordable room with essential amenities.",
//       "amenities": ["Wi-Fi", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 9,
//       "name": "Studio Apartment",
//       "price": 100,
//       "capacity": 2,
//       "size": 40,
//       "description": "A self-contained apartment with kitchenette.",
//       "amenities": ["Wi-Fi", "Kitchenette", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 10,
//       "name": "Penthouse",
//       "price": 350,
//       "capacity": 6,
//       "size": 150,
//       "description": "A luxurious penthouse with stunning views and exclusive amenities.",
//       "amenities": ["Wi-Fi", "Private Pool", "Rooftop Access", "Jacuzzi"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 11,
//       "name": "Superior Room",
//       "price": 110,
//       "capacity": 2,
//       "size": 35,
//       "description": "A superior room offering more space and comfort.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 12,
//       "name": "Junior Suite",
//       "price": 140,
//       "capacity": 3,
//       "size": 45,
//       "description": "A cozy suite with modern amenities and a relaxing atmosphere.",
//       "amenities": ["Wi-Fi", "Air Conditioning", "Mini Bar", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 13,
//       "name": "Family Suite",
//       "price": 170,
//       "capacity": 5,
//       "size": 80,
//       "description": "Spacious suite designed for family gatherings and comfort.",
//       "amenities": ["Wi-Fi", "Kitchenette", "Television", "Mini Bar"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 14,
//       "name": "Business Room",
//       "price": 130,
//       "capacity": 2,
//       "size": 35,
//       "description": "A room tailored for business travelers with a workspace.",
//       "amenities": ["Wi-Fi", "Workspace", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 15,
//       "name": "Classic Room",
//       "price": 75,
//       "capacity": 2,
//       "size": 30,
//       "description": "A classic room with timeless decor and comfort.",
//       "amenities": ["Wi-Fi", "Air Conditioning"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 16,
//       "name": "Garden Suite",
//       "price": 180,
//       "capacity": 4,
//       "size": 70,
//       "description": "A peaceful suite surrounded by beautiful gardens.",
//       "amenities": ["Wi-Fi", "Private Garden", "Air Conditioning", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 17,
//       "name": "Beachfront Villa",
//       "price": 400,
//       "capacity": 6,
//       "size": 120,
//       "description": "An exclusive villa right on the beach with stunning views.",
//       "amenities": ["Wi-Fi", "Private Pool", "Beach Access", "Television"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 18,
//       "name": "Budget Room",
//       "price": 40,
//       "capacity": 1,
//       "size": 15,
//       "description": "A budget-friendly room with essential amenities.",
//       "amenities": ["Wi-Fi"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 19,
//       "name": "Romantic Suite",
//       "price": 250,
//       "capacity": 2,
//       "size": 55,
//       "description": "A romantic suite with a jacuzzi and private balcony for couples.",
//       "amenities": ["Wi-Fi", "Jacuzzi", "Private Balcony", "Air Conditioning"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     },
//     {
//       "id": 20,
//       "name": "Adventure Cabin",
//       "price": 90,
//       "capacity": 2,
//       "size": 25,
//       "description": "A cozy cabin ideal for adventure seekers.",
//       "amenities": ["Wi-Fi", "Fireplace"],
//       "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
//     }
//   ];
  





export const roomData = 
[
  {
    "id": 1,
    "name": "Superior Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 30,
    "maxPerson": 1,
    "price": 115,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  },
  {
    "id": 2,
    "name": "Signature Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 70,
    "maxPerson": 2,
    "price": 220,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  },
  {
    "id": 3,
    "name": "Deluxe Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 50,
    "maxPerson": 3,
    "price": 265,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  },
  {
    "id": 4,
    "name": "Luxury Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 50,
    "maxPerson": 4,
    "price": 289,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  },
  {
    "id": 5,
    "name": "Luxury Suite Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 90,
    "maxPerson": 5,
    "price": 320,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  },
  {
    "id": 6,
    "name": "Deluxe Room",
    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat eos sed voluptas unde veniam eligendi a. Quaerat molestiae hic omnis temporibus quos consequuntur nam voluptatum ea accusamus, corrupti nostrum eum placeat quibusdam quis beatae quae labore earum architecto aliquid debitis.",
    "facilities": [
      { "name": "Wifi", "icon": "FaWifi" },
      { "name": "Coffee", "icon": "FaCoffee" },
      { "name": "Bath", "icon": "FaBath" },
      { "name": "Parking Space", "icon": "FaParking" },
      { "name": "Swimming Pool", "icon": "FaSwimmingPool" },
      { "name": "Breakfast", "icon": "FaHotdog" },
      { "name": "GYM", "icon": "FaStopwatch" },
      { "name": "Drinks", "icon": "FaCocktail" }
    ],
    "size": 45,
    "maxPerson": 6,
    "price": 344,
    "image": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg",
    "imageLg": "https://sthotelsmalta.com/wp-content/uploads/2022/06/modern-luxury-bedroom-suite-and-bathroom-with-working-table-scaled.jpg"
  }
];
