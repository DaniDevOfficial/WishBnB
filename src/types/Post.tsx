import { Image } from "./Image";

export interface Post {
    id: string;
    article_id?: string;
    image?: string;
    title: string;
    description: string;
    price: string;
    location: string;

}


export interface FirestorePost {
    id: string;
    article_id: string;
    image?: Image;
    title: string;
    description: string;
    price: string;
    location: string;
}
