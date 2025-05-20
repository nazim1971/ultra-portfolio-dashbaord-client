"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import { TProject } from "@/types";

const ProjectCardCarousel = ({ project }: { project: TProject }) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full h-full mx-auto px-6 flex justify-center mb-auto">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-7xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {project.images &&
            project.images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-[300px] md:h-[250px] lg:h-[250px] rounded-2xl"
              >
                <Image
                  src={img}
                  alt={`Project Image ${idx + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectCardCarousel;
