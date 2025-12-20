"use client"

import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"

const slides = [
    {
        id: 1,
        title: "Your One Stop Shop To Buy",
        subtitle: "necessary interior parts",
        image: "/slider/slider06.jpg",
        link: "/shopview",
    },
    {
        id: 2,
        title: "Modify Your Car",
        subtitle: "With Us",
        image: "/slider/slider05.jpg",
        link: "/shopview",
    },
    {
        id: 3,
        title: "GET FLOOR MATS",
        subtitle: "TREAT YOUR FEET",
        image: "/slider/slider2.jpg",
        link: "/shopview",
    },
    {
        id: 4,
        title: "Create Fashion",
        subtitle: "Car Seat Cover <br> Enjoy The Exquisite Life",
        image: "/slider/slider09.jpg",
        link: "/shopview",
    },
    {
        id: 5,
        title: "Largest Automobiles",
        subtitle: "Parts & Accessories <br> Platform in Bangladesh",
        image: "/slider/slider5.jpg",
        link: "/shopview",
    },
]

export default function HeroCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="w-full relative">
            <Carousel
                className="relative w-full h-[80vh]"
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                    })
                ]}
                setApi={setApi}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="h-[80vh]">
                    {slides.map((slide) => (
                        <CarouselItem
                            key={slide.id}
                            className="relative w-full h-full flex-shrink-0"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute h-full inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30" />
                            {/* Text Content */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-start  text-white px-4">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-2">
                                    {slide.title}
                                </h2>
                                <p
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                                    dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                                />
                                <Button asChild>
                                    <a
                                        href={slide.link}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                                    >
                                        Shop now
                                    </a>
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Prev / Next Controls */}
                {/* <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20">
          ❮
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 z-20">
          ❯
        </CarouselNext> */}

                {/* Dot Indicators with White Active Dot */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`transition-all duration-300 rounded-full ${current === index
                                    ? "bg-red-600 w-4 h-4"  // Active dot: White color
                                    : "bg-white/50 hover:bg-white/80 w-3 h-3"  // Inactive dots: Semi-transparent white
                                }`}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    )
}