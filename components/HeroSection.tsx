'use client'

import React, { useRef, useEffect } from "react";
import CarouselComponent from "./CarouselComponent";
import { Button } from "./ui/button";
import gsap from "gsap";
import { HeroSectionType } from "@/typeing";

export default function HeroSection({heroSection}:{heroSection:HeroSectionType[] | undefined}) {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (floatRef.current) {
      gsap.to(floatRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });
    }
  }, []);

  if (!heroSection) return null;
  return (
    <section className="bg-gradient-to-r from-primary-50 to-primary-50 text-primary py-12">
      <div className="container mx-auto flex  bg-gradient-to-bl from-[#00b4d8] via-[#00b4d8] to-[#00b4d8] md:flex-row rounded-lg items-center gap-10 flex-col-reverse relative">
        <div
          ref={floatRef}
          className="bg-blue-0 shadow shadow-ring bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 w-fit p-4 flex flex-col items-center justify-center gap-4 absolute top-2 lg:top-6 rounded-tr-lg rounded-md right-6 md:right-12 lg:right-4 z-40 "
        >
          <h1 className="text-xl md:text-2xl capitalize font-extrabold tracking-widest text-blue-950 max-w-3xl leading-tight">
            {heroSection[0]?.title}
          </h1>
          <p className="text-sm lg:text-base text-center text-stone-600 font-semibold">{heroSection[0]?.subTitle}</p>
          <Button className="bg-blue-500 flex text-white  font-semibold px-6 py-2 rounded hover:bg-blue-700 cursor-pointer w-fit items-center justify-center">
            Shop Now
          </Button>
        </div>
        <CarouselComponent heroSection={heroSection} />
      </div>
    </section>
  );
}
