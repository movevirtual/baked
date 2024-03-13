"use client";

import React, { Children, ReactNode, useCallback } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useEmblaCarousel from "embla-carousel-react";
import RichText from "./RichText";
import SectionWrapper from "@/components/SectionWrapper";

type CarouselProps = {
    children: ReactNode;
    heading?: string;
    bgColor?: string;
    hasInfiniteScrolling: boolean;
};

export const Carousel = ({
                             children,
                             heading,
                             bgColor = "bg-surface-primary",
                             hasInfiniteScrolling,
                         }: CarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: hasInfiniteScrolling,
        skipSnaps: true,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <SectionWrapper className={`overflow-x-hidden ${bgColor}`}>
            {heading && (
                <div className="mb-12 flex items-center justify-start md:justify-between">
                    <div className="md:w-[70%]">
                        <RichText body={heading} />
                    </div>
                    <div className="hidden md:flex md:items-center md:gap-x-6">
                        <button className="navigation-button" onClick={scrollPrev}>
                            <ArrowBackIcon />
                        </button>
                        <button className="navigation-button" onClick={scrollNext}>
                            <ArrowForwardIcon />
                        </button>
                    </div>
                </div>
            )}

            <div ref={emblaRef}>
                <div className="flex md:mx-auto">
                    {Children.toArray(children).map((child, key) => {
                        return (
                            <div key={key} className="mr-4">
                                {child}
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Carousel;
