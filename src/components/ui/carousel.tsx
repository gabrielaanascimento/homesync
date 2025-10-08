"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context)
    throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        style={{
          position: "relative",
          ...((style as React.CSSProperties) || {}),
        }}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ style, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  const innerStyle: React.CSSProperties =
    orientation === "horizontal"
      ? { display: "flex", marginLeft: "-16px" } // corresponde ao -ml-4 + pl-4 da versão Tailwind
      : { display: "flex", flexDirection: "column", marginTop: "-16px" };

  return (
    <div
      ref={carouselRef}
      style={{ overflow: "hidden" }}
      data-slot="carousel-content"
    >
      <div
        style={{ ...innerStyle, ...(style as React.CSSProperties) }}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ style, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  const itemStyle: React.CSSProperties =
    orientation === "horizontal"
      ? {
          minWidth: 0,
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: "100%",
          paddingLeft: "16px",
        } // pl-4
      : {
          minWidth: 0,
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: "100%",
          paddingTop: "16px",
        }; // pt-4

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      style={{ ...itemStyle, ...(style as React.CSSProperties) }}
      {...props}
    />
  );
}

/** small helper: style for screen-reader-only text */
const srOnlyStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function CarouselPrevious(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const [hover, setHover] = React.useState(false);

  const baseLeft = orientation === "horizontal" ? "-48px" : undefined;
  const baseTop = orientation === "horizontal" ? "50%" : undefined;
  const transformBase =
    orientation === "horizontal"
      ? "translateY(-50%)"
      : "translateX(-50%) rotate(-90deg)";

  const styleButton: React.CSSProperties = {
    position: "absolute",
    top: baseTop,
    left: baseLeft,
    transform: `${transformBase} ${hover ? "scale(1.05)" : "scale(1)"}`,
    cursor: canScrollPrev ? "pointer" : "not-allowed",
    background: "transparent",
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: hover ? "#2563EB" /* azul */ : "#6B7280" /* cinza */,
    transition: "color 200ms ease, transform 120ms ease",
    opacity: canScrollPrev ? 1 : 0.35,
    userSelect: "none",
  };

  return (
    <button
      data-slot="carousel-previous"
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styleButton}
      {...props}
    >
      <ArrowLeft size={40} color="currentColor" />
      <span style={srOnlyStyle}>Previous slide</span>
    </button>
  );
}

function CarouselNext(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const [hover, setHover] = React.useState(false);

  const baseRight = orientation === "horizontal" ? "-48px" : undefined;
  const baseTop = orientation === "horizontal" ? "50%" : undefined;
  const transformBase =
    orientation === "horizontal"
      ? "translateY(-50%)"
      : "translateX(50%) rotate(90deg)";

  const styleButton: React.CSSProperties = {
    position: "absolute",
    top: baseTop,
    right: baseRight,
    transform: `${transformBase} ${hover ? "scale(1.05)" : "scale(1)"}`,
    cursor: canScrollNext ? "pointer" : "not-allowed",
    background: "transparent",
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: hover ? "#2563EB" /* azul */ : "#6B7280" /* cinza */,
    transition: "color 200ms ease, transform 120ms ease",
    opacity: canScrollNext ? 1 : 0.35,
    userSelect: "none",
  };

  return (
    <button
      data-slot="carousel-next"
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styleButton}
      {...props}
    >
      <ArrowRight size={40} color="currentColor" />
      <span style={srOnlyStyle}>Next slide</span>
    </button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
