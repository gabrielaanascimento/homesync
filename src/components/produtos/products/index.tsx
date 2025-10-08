import React from "react";
import "./styles.css";
import { ItemProducts } from "../ItemProduct";

interface Property {
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number; // área como número
}

interface PropsProducts {
  title?: string;
  properties: Property[];
  filters?: {
    minArea?: string;
    maxArea?: string;
    // outros filtros se necessário
  };
}

export const Products = ({ title, properties, filters }: PropsProducts) => {
  // Filtragem por área
  const filteredProperties = properties.filter((property) => {
    const minArea = filters?.minArea ? parseInt(filters.minArea) : null;
    const maxArea = filters?.maxArea ? parseInt(filters.maxArea) : null;

    if (minArea !== null && property.area < minArea) return false;
    if (maxArea !== null && property.area > maxArea) return false;

    return true;
  });

  return (
    <div className="containerProducts">
      <h1 className="titleProducts">{title}</h1>
      <div className="containerItemsProducts">
        {filteredProperties.map((property, idx) => (
          <ItemProducts
            key={idx}
            image={property.image}
            name={property.name}
            address={property.address}
            rooms={property.rooms}
            area={property.area} // passa como number
          />
        ))}
      </div>
    </div>
  );
};
