// Next-main/src/components/imovel/Carrossel/index.tsx
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarroselProps {
    // Aceita uma lista de URLs de imagens
    imageUrls: string[];
}

export function Carrosel({ imageUrls }: CarroselProps) {
  // Define imagens como as URLs passadas ou placeholders para evitar erros.
  const images = imageUrls && imageUrls.length > 0 ? imageUrls : [
    "https://cinqdi.com.br/wp-content/uploads/2024/08/Cinq-Parqville-Pinheiros-1920x1080-3.webp",
    "https://images.homify.com/v1553964637/p/photo/image/2986704/Casa_B_facahda_01-PS.jpg",
    "https://images.homify.com/v1453219822/p/photo/image/1255680/Arquiteta_Camila_Castilho-84.jpg",
    "https://cinprime.com.br/wp-content/uploads/2023/08/002_Radiant-1-1024x768.jpg",
    "https://www.iprojetei.com.br/upload/1422/1920x1080.jpg",
  ];

  return (
    <div
      style={{
        width: "70vw",
        margin: "0 auto",
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Carousel style={{ position: "relative" }}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "calc(100% + 10px)",
                    height: "calc((100% * 9/16) + 10px)",
                    background: "#f0f0f0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    style={{
                      width: "1200px",
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Setas (mantidas como estão) */}
        <CarouselPrevious>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "0",
              transform: "translateY(-50%)",
              padding: "12px",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontSize: "34px",
              textAlign: "center",
            }}
          >
            &#10094;
          </div>
        </CarouselPrevious>

        <CarouselNext>
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translateY(-50%)",
              padding: "12px",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            &#10095;
          </div>
        </CarouselNext>
      </Carousel>
    </div>
  );
}

export default Carrosel;