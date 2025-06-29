import { groq } from "next-sanity";
import { client } from "../lib/client";
import { HeroSectionType } from "@/typeing";

const options = { next: { revalidate: 5 } }
export const getHeroSection = async()=>{
    try {
        
        const data = await client.fetch(
            groq`*[_type == "hero"]|order(_createdAt  desc)[0]{_id, title,subTitle,"imageUrl": mainImage.asset->url,_createdAt }`,{},
            options
        );
        
        return data as HeroSectionType;
        
    } catch (error) {
        console.log(error,'ERROR IN GETTING HERO SECTION');
        
    }
}