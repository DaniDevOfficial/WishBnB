import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function ImageDisplay({ slides }) {
    return (
        <Carousel infiniteLoop>
            {slides.map((slide) => {
                console.log(slide);
                return (
                    <>
                        <Image src={slide} height={{ base: "auto", md: "300px" }} width="5xl" objectFit="cover" borderRadius={10}/>
                    </>
                )
            })}
        </Carousel>
    );
};

