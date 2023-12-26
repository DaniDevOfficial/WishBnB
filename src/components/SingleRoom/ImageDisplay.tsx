import { Image, Skeleton } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function ImageDisplay({ slides  }) {
    return (
        <Carousel showThumbs={false} infiniteLoop>
            {slides.map((slide: string) => {
                return (
                    <>
                        <Image src={slide} height={{ base: "auto", md: "300px" }} width="5xl" objectFit="cover" borderRadius={10} fallback={<Skeleton height={{ base: "auto", md: "300px" }} width="5xl" borderRadius={10}/>}/>
                    </>
                )
            })}
        </Carousel>
    );
};

