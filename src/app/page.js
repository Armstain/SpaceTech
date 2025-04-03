import Banner from "@/components/HomeContents/Banner";
import FeaturedProducts from "@/components/HomeContents/FeaturedProducts";
import LimitedOffer from "@/components/HomeContents/LimitedOffer";
import NewsLetter from "@/components/HomeContents/NewsLetter";
import TopCategory from "@/components/HomeContents/TopCategory";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-base-200">
      <div className="">
      <Banner />
      <TopCategory />
      <FeaturedProducts />
      <LimitedOffer />
      <NewsLetter />
      </div>
    </div>
  );
}

