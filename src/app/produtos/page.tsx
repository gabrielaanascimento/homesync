// src/app/produtos/page.tsx
"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Navbar/navbar";
import Filters from "@/components/produtos/Filters";
import PropertyList from "@/components/produtos/PropertyList";
import { Property } from "@/types/property";
import { getAllProperties } from "@/services/getAllProperties";
import "./page.css";
import PrivateRouteWrapper from "@/components/PrivateRouteWrapper"; // 1. IMPORTAR

export default function HomeSync() {
  const [showFilters, setShowFilters] = useState(false);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); 

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllProperties();
      if (data) {
        setAllProperties(data);
        setFilteredProperties(data);
      } else {
        console.error("Não foi possível carregar os imóveis.");
      }
    };
    fetchProperties();
  }, []); 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }; 

  const handleFilterChange = (filters: {
    location: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
    bedrooms: string;
  }) => {
    let filtered = [...allProperties]; 

    if (filters.location) {
      filtered = filtered.filter((property) =>
        property.local.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const price = property.valor;
        return !isNaN(minPrice) && price >= minPrice;
      });
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const price = property.valor;
        return !isNaN(maxPrice) && price <= maxPrice;
      });
    }

    if (filters.minArea) {
      const minArea = parseFloat(filters.minArea.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const area = property.area || 0;
        return !isNaN(minArea) && area >= minArea;
      });
    }

    if (filters.maxArea) {
      const maxArea = parseFloat(filters.maxArea.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const area = property.area || 0;
        return !isNaN(maxArea) && area <= maxArea;
      });
    }

    if (filters.bedrooms) {
      filtered = filtered.filter((property) => {
        const bedrooms = property.quartos || 0;
        if (filters.bedrooms === "4+") {
          return bedrooms >= 4;
        }
        const requiredBedrooms = parseInt(filters.bedrooms);
        return bedrooms === requiredBedrooms;
      });
    }

    setFilteredProperties(filtered);
  };

  // 2. ENVOLVER A PÁGINA
  return (
    <PrivateRouteWrapper>
      <div
        className="page-container"
        onMouseMove={handleMouseMove}
        style={{
          background: `radial-gradient(
          circle at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(196, 135, 250, 0.24) 0%,
          rgba(204, 135, 250, 0.2) 150px,
          transparent 400px
        ), white`,
          transition: "background 0.1s",
        }}
      >
        <div className="navbar-wrapper">
          <Header />
        </div>

        <div className="filters-container">
          <Filters onFilterChange={handleFilterChange} />
        </div>

        <div className="property-list-container">
          <PropertyList properties={filteredProperties} />
        </div>
      </div>
    </PrivateRouteWrapper>
  );
}