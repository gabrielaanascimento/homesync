"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Navbar/navbar";
import Filters from "@/components/produtos/Filters";
import PropertyList from "@/components/produtos/PropertyList";
import { Property } from "@/types/property"; // Assumindo que este tipo foi ajustado
import { getAllProperties } from "@/services/getAllProperties";
import "./page.css";
import { useSession } from "next-auth/react";

export default function HomeSync() {
  const { data: session, status } = useSession();
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
      // CORREÇÃO: Usar o campo 'local' da API (que substitui location)
      filtered = filtered.filter((property) =>
        property.local.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // CORREÇÃO: Filtro por Preço (valor) - Tratando o input do filtro
    if (filters.minPrice) {
      // Remove caracteres não numéricos, exceto ponto/vírgula, e converte para float
      const minPrice = parseFloat(filters.minPrice.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const price = property.valor; // Usa o campo 'valor' (number)
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

    // CORREÇÃO: Filtro por Área (area) - Tratando o input do filtro
    if (filters.minArea) {
      const minArea = parseFloat(filters.minArea.replace(/[^0-9.,]/g, "").replace(",", "."));
      filtered = filtered.filter((property) => {
        const area = property.area || 0; // Usa o campo 'area' (number)
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

    // CORREÇÃO: Filtro por Quartos (quartos) - Usando o campo 'quartos'
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

  if (status === "loading") {
    return <p>Carregando sessão...</p>;
  }

  if (status === "authenticated") {
    return (
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
        {/* Navbar centralizada */}
        <div className="navbar-wrapper">
          <Header id={session?.user?.id} />
        </div>

        <div className="filters-container">
          <Filters onFilterChange={handleFilterChange} />
        </div>

        <div className="property-list-container">
          <PropertyList properties={filteredProperties} />
        </div>
      </div>
    );
  }

  return (window.location.href = "/login");
}