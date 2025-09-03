"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Add hydration handling
const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
};

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  onVideoEnter?: () => void;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  onVideoEnter?: () => void;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  onVideoEnter: undefined,
});

export const Carousel = ({ items, initialScroll = 0, onVideoEnter }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, onVideoEnter }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none] md:py-12"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex, onVideoEnter } = useContext(CarouselContext);
  const hydrated = useHydrated();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    // Removed dialog opening functionality
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  // Don't render motion components until hydrated
  if (!hydrated) {
    return (
      <div className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="relative z-40 p-8">
          <p className="text-left font-sans text-sm font-medium text-white md:text-base">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
            {card.title}
          </p>
        </div>
        
        {/* Enter Button - Bottom Right Corner of Card */}
        <div className="absolute bottom-4 right-4 z-50">
          <button 
            className="bg-white text-black px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm"
          >
            {(card.title === "Cognitive Load Management" || card.title === "Adjustments") ? "Coming Soon" : "Enter"}
          </button>
        </div>
        
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        
        {/* Enter Button - Bottom Right Corner of Card */}
        <div className="absolute bottom-4 right-4 z-50">
          <button 
            className="bg-white text-black px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              // Check if this is a video card and navigate accordingly
              if (card.category === "Learning Resources" && onVideoEnter) {
                onVideoEnter();
              } else if (card.title === "Cognitive Load Management" || card.title === "Adjustments") {
                // Do nothing for Cognitive Load Management and Adjustments - they're coming soon
                return;
              } else {
                handleOpen();
              }
            }}
          >
            {(card.title === "Cognitive Load Management" || card.title === "Adjustments") ? "Coming Soon" : "Enter"}
          </button>
        </div>
        
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if the source is a video
  const isVideo = typeof src === "string" && (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov'));

  useEffect(() => {
    if (isVideo && videoRef.current) {
      const video = videoRef.current;
      
      // Generate thumbnail when video metadata is loaded
      const generateThumbnail = () => {
        if (canvasRef.current && video) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
            setThumbnailSrc(thumbnail);
            setLoading(false);
          }
        }
      };

      video.addEventListener('loadeddata', generateThumbnail);
      video.addEventListener('canplay', generateThumbnail);

      return () => {
        video.removeEventListener('loadeddata', generateThumbnail);
        video.removeEventListener('canplay', generateThumbnail);
      };
    } else if (!isVideo) {
      setLoading(false);
    }
  }, [isVideo, src]);

  if (isVideo) {
    return (
      <div className="absolute inset-0 w-full h-full">
        {/* Hidden canvas for thumbnail generation */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Video background - full card */}
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition duration-300 z-0",
            isLoading ? "blur-sm" : "blur-0",
            className,
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src as string} type="video/mp4" />
        </video>
        
        {/* Thumbnail fallback */}
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={alt || "Video thumbnail"}
            className="absolute inset-0 h-full w-full object-cover opacity-0 z-0"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>
    );
  }

  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
