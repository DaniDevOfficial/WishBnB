import { Rating } from "./Rating";  
export interface Room {
    id: string;
    title: string;
    location: string;
    description: string;
    creator: string;
    creatorID: string;
    longDescription: string;
    price: string;
    images: string[];
    unavailableDates: { startDate: string; endDate: string }[];
    additionalFeatures: { name: string; pricePerNight: number }[];
};
