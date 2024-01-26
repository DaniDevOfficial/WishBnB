import { Image, Skeleton } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";

export function ImageDisplay({ slides }) {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <Carousel showThumbs={false} infiniteLoop>
      {slides.map((slide, index) => {
        return (
          <div key={index} onClick={toggleFullscreen} style={{ cursor: 'pointer' }}>
            <Image
              src={slide}
              height={fullscreen ? "90vh" : { base: "auto", md: "300px" }}
              width={fullscreen ? "90vw" : "5xl"}
              objectFit="cover"
              borderRadius={fullscreen ? 0 : 10}
              fallback={<Skeleton height={{ base: "auto", md: "300px" }} width="5xl" borderRadius={10} />}
            />
          </div>
        );
      })}
    </Carousel>
  );
}
