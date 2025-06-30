import { groq } from "next-sanity";
import { client } from "../lib/client";
import { HeroSectionType, ProductType } from "@/typeing";

const options = { next: { revalidate: 5 } };
export const getHeroSection = async () => {
  try {
    const data = await client.fetch(
      groq`*[_type == "hero"]|order(_createdAt  desc){_id, title,subTitle,"imageUrl": mainImage.asset->url,_createdAt }`,
      {},
      options
    );

    return data as HeroSectionType[];
  } catch (error) {
    console.log(error, "ERROR IN GETTING HERO SECTION");
  }
};

export const getProductData = async () => {
  try {
    const data = await client.fetch(
      groq`*[_type == "product"]|order(_createdAt  desc){_id, title,slug,price,"imageUrl": mainImage.asset->url,_createdAt,body,description }`,
      {},
      options
    );

    return data as ProductType[];
  } catch (error) {
    console.log(error, "ERROR IN GETTING product SECTION");
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const data = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0]{_id, title, slug,price, "imageUrl": mainImage.asset->url, _createdAt, body, description }`,
      { slug },
      options
    );
    return data as ProductType | null;
  } catch (error) {
    console.log(error, "ERROR IN GETTING PRODUCT BY SLUG");
    return null;
  }
};

export const getSimilarProducts = async (title: string, excludeId: string) => {
  try {
    // Split the title into keywords, take the first 2-3 for simplicity
    const keywords = title.split(" ").slice(0, 3).join(" ");
    const data = await client.fetch(
      groq`*[_type == "product" && _id != $excludeId && title match $keywords][0...4]{
        _id, title, slug, price, "imageUrl": mainImage.asset->url, _createdAt, description
      }`,
      { keywords: `*${keywords}*`, excludeId },
      options
    );
    return data as ProductType[];
  } catch (error) {
    console.log(error, "ERROR IN GETTING SIMILAR PRODUCTS");
    return [];
  }
};


