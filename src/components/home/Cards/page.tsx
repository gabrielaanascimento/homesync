"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export interface ContentCardItem {
  id: string;
  title: string;
  content: string;
  image: string;
  imageBg?: string;
}

export interface ContentCardStackProps {
  items: ContentCardItem[];
  cardHeight?: number;
  perspective?: number;
  transitionDuration?: number;
  className?: string;
}

const ContentCardStack: React.FC<ContentCardStackProps> = ({
  items,
  cardHeight = 400,
  perspective = 1000,
  transitionDuration = 180,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);

  const springConfig = {
    damping: 20,
    stiffness: 250,
    mass: 0.5,
  };

  const totalItems = items.length;
  const maxIndex = totalItems - 1;
  const springScrollY = useSpring(scrollY, springConfig);

  const FRAME_OFFSET = -30;
  const FRAMES_VISIBLE_LENGTH = 3;
  const SNAP_DISTANCE = 50;

  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number =>
      Math.min(Math.max(val, min), max),
    []
  );

  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling) return;

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      const minScrollInterval = 300;

      if (timeSinceLastScroll < minScrollInterval) return;

      const newIndex = clamp(currentIndex + direction, [0, maxIndex]);

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);

        setTimeout(() => {
          setIsScrolling(false);
        }, transitionDuration + 100);
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, transitionDuration, clamp]
  );

  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) return;
      if (Math.abs(deltaY) < 20) return;

      const scrollDirection = deltaY > 0 ? 1 : -1;
      scrollToCard(scrollDirection);
    },
    [isDragging, isScrolling, scrollToCard]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    },
    [handleScroll]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) return;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToCard(-1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToCard(1);
      }
    },
    [isScrolling, scrollToCard]
  );

  const touchStartY = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchMoved.current = false;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (Math.abs(deltaY) > 100 && !touchMoved.current) {
        scrollToCard(deltaY > 0 ? 1 : -1);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    if (!isDragging) scrollY.set(currentIndex * SNAP_DISTANCE);
  }, [currentIndex, isDragging, scrollY]);

  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;
      const absOffsetIndex = Math.abs(offsetIndex);
      const blur = currentIndex > index ? 2 : 0;
      const opacity = currentIndex > index ? 0 : 1;
      const scale = clamp(1 - offsetIndex * 0.08, [0.08, 2]);
      const y = clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Infinity,
      ]);
      const zIndex = items.length - index;
      return { y, scale, opacity, blur, zIndex };
    },
    [currentIndex, items.length, clamp]
  );

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        margin: "0 auto",
        minHeight: `${cardHeight + 100}px`,
        perspective: `${perspective}px`,
        perspectiveOrigin: "center 60%",
        touchAction: "none",
        width: "fit-content",
        minWidth: "450px",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, i) => {
        const transform = getCardTransform(i);
        const isActive = i === currentIndex;

        return (
          <motion.div
            key={`content-card-${item.id}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "1050px",
              height: `${cardHeight}px`,
              overflow: "hidden",
              borderRadius: "16px",
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              zIndex: transform.zIndex,
              pointerEvents: isActive ? "auto" : "none",
              transformOrigin: "center center",
              willChange: "opacity, filter, transform",
              filter: `blur(${transform.blur}px) drop-shadow(0 4px 8px rgba(0,0,0,0.1))`,
              opacity: transform.opacity,
              transition:
                "transform 0.1s ease, box-shadow 0.1s ease, opacity 0.1s ease-in-out, filter 0.1s ease-in-out",
              borderWidth: `${2 / transform.scale}px`,
            }}
            initial={false}
            animate={{
              y: `calc(-50% + ${transform.y}px)`,
              scale: transform.scale,
              x: "-50%",
            }}
            whileHover={
              isActive
                ? {
                    scale: transform.scale * 1.02,
                    y: `calc(-50% + ${transform.y - 5}px)`, // levanta 5px no hover
                    boxShadow: "0 12px 40px rgba(0, 0, 255, 0.253)",
                    filter: `drop-shadow(0 8px 16px rgba(255, 0, 242, 0.15)) blur(${transform.blur}px)`,
                    transition: { duration: 0.1, ease: "easeInOut" },
                  }
                : {}
            }
            transition={springConfig}
          >
            <div
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "px",
                    height: "75px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem",
                    backgroundColor: item.imageBg || "#E3F2FD",
                  }}
                >
                  <img
                    src={item.image}
                    alt={`Ícone ${item.title}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "DM Sans semi-bold, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#0072ff",
                    lineHeight: 1.2,
                    flex: 1,
                  }}
                >
                  {item.title}
                </h2>
              </div>

              {/* Conteúdo */}
              <div style={{ flex: 1, color: "#374151", lineHeight: 1.6 }}>
                {item.content.split("\n").map((paragraph, idx) => (
                  <p key={idx} style={{ marginTop: idx > 0 ? "1rem" : 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Indicadores */}
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {items.map((_, i) => (
          <motion.button
            key={`indicator-${i}`}
            type="button"
            onClick={() => {
              if (i !== currentIndex && !isScrolling) {
                setIsScrolling(true);
                setCurrentIndex(i);
                scrollY.set(i * SNAP_DISTANCE);
                setTimeout(
                  () => setIsScrolling(false),
                  transitionDuration + 100
                );
              }
            }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: i === currentIndex ? "#1d4ed8" : "#d1d5db",
              transform: i === currentIndex ? "scale(1.25)" : "scale(1)",
              transition: "all 0.2s ease-in-out",
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={springConfig}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentCardStack;
