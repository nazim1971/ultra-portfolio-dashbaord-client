"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import { TProject } from "@/types";

const ProjectCardCarousel = ({ project }: { project: TProject }) => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {project.images?.map((img, idx) => (
          <CarouselItem key={idx}>
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]">
              <Image
                src={img}
                alt={`${project.title} - Image ${idx + 1}`}
                fill
                className="object-cover rounded-t-lg"
                priority={idx === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProjectCardCarousel;