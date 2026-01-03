
import HeroSection from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import TrendingProducts from '@/components/TrendingProducts';
import TrustBadges from '@/components/TrustBadges';
import { Button } from '@/components/ui/button';
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function EnhancedHomePage() {

   const hotProducts = await preloadQuery(
      api.product.getHotProducts,
      {}
    );
  
    const dealProducts = await preloadQuery(
      api.product.getDealsProducts,
      {}
    );
     const trendingProductsFirstPage = await fetchQuery(
    api.product.getProductsWithImagePaginated,
    { paginationOpts: { numItems: 12 } }
  );
  

  return (
    <div className="min-h-screen bg-white">
      {/* SEO - Hidden H1 */}
      <h1 className="sr-only">Easyfix - Buy and Sell Electronics in Rwanda - Phones, Laptops & More</h1>
      {/* Hero Section */}
      <HeroSection
        hotProducts={hotProducts}
        dealsProducts={dealProducts}
      />

      {/* Trust Badges */}
      <div className='hidden md:block'>
        <TrustBadges/>
      </div>


      {/* Trending Products */}
      <section className="py-4 lg:py-20 px-4 bg-gray-50">
        <TrendingProducts initialPage={trendingProductsFirstPage} />
        <div className="max-w-7xl mx-auto">
          
        </div>
      </section>

      <SocialProof/>

       <div className='inline-block md:hidden w-full justify-center items-center'>
        <TrustBadges/>
      </div>
    </div>
  );
}