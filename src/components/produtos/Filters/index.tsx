"use client";
import { useState } from "react";
import "./styles.css";
import { Property } from "@/types/property";

interface FiltersProps {
  onFilterChange: (filters: {
    location: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
    bedrooms: string;
  }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  // Função para atualizar os filtros
  const updateFilters = (field: string, value: string) => {
    let newFilters = {
      location,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms,
    };

    switch (field) {
      case "location":
        setLocation(value);
        newFilters.location = value;
        break;
      case "minPrice":
        setMinPrice(value);
        newFilters.minPrice = value;
        break;
      case "maxPrice":
        setMaxPrice(value);
        newFilters.maxPrice = value;
        break;
      case "minArea":
        setMinArea(value);
        newFilters.minArea = value;
        break;
      case "maxArea":
        setMaxArea(value);
        newFilters.maxArea = value;
        break;
      case "bedrooms":
        setBedrooms(value);
        newFilters.bedrooms = value;
        break;
      case "clear":
        setLocation("");
        setMinPrice("");
        setMaxPrice("");
        setMinArea("");
        setMaxArea("");
        setBedrooms("");
        newFilters = {
          location: "",
          minPrice: "",
          maxPrice: "",
          minArea: "",
          maxArea: "",
          bedrooms: "",
        };
        break;
    }

    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container">
      <h2 className="filters-title">Filtros</h2>

      {/* Localização */}
      <div className="filter-group">
        <label className="filter-label">Localização</label>
        <div className="select-container">
          <select
            value={location}
            onChange={(e) => updateFilters("location", e.target.value)}
            className="filter-select"
          >
            <option value="">Selecione</option>
            <option value="Mogi das Cruzes">Mogi das Cruzes</option>
            <option value="Guarulhos">Guarulhos</option>
            <option value="Poá">Poá</option>
            <option value="Suzano">Suzano</option>

          </select>
          <svg
            className="select-arrow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Preço */}
      <div className="filter-group">
        <label className="filter-label">Preço (R$)</label>
        <div className="price-grid">
          <input
            type="text"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilters("minPrice", e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Máx"
            value={maxPrice}
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Área */}
      <div className="filter-group">
        <label className="filter-label">Área (m²)</label>
        <div className="area-grid">
          <input
            type="text"
            placeholder="Min"
            value={minArea}
            onChange={(e) => updateFilters("minArea", e.target.value)}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Máx"
            value={maxArea}
            onChange={(e) => updateFilters("maxArea", e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {/* Dormitórios */}
      <div className="filter-group">
        <label className="filter-label">Dormitórios</label>
        <div className="select-container">
          <select
            value={bedrooms}
            onChange={(e) => updateFilters("bedrooms", e.target.value)}
            className="filter-select"
          >
            <option value="">Selecione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4+</option>
          </select>
          <svg
            className="select-arrow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <button
        className="apply-button"
        onClick={() =>
          onFilterChange({
            location,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            bedrooms,
          })
        }
      >
        Aplicar Filtros
      </button>

      <button
        className="clear-button"
        onClick={() => updateFilters("clear", "")}
      >
        Limpar
      </button>
    </div>
  );
}
