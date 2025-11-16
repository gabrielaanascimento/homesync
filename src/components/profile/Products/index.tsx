import React from "react";
import "./styles.css";
import { ItemProducts } from "../ItemProducts";

interface Property {
  id: number; // 1. ADICIONAR ID AQUI
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number; 
}

interface PropsProducts {
  title?: string;
  properties: Property[];
  filters?: {
    minArea?: string;
    maxArea?: string;
  };
}

export const Products = ({ title, properties, filters }: PropsProducts) => {
  // (A lógica de filtro permanece a mesma)
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
      
      {/* 2. Verifica se há propriedades ANTES de renderizar o grid */}
      {filteredProperties.length > 0 ? (
        <div className="containerItemsProducts">
          {filteredProperties.map((property) => (
            <ItemProducts
              key={property.id} // Usar ID como chave
              id={property.id} // 3. PASSAR O ID
              image={property.image}
              name={property.name}
              address={property.address}
              rooms={property.rooms}
              area={property.area}
            />
          ))}
        </div>
      ) : (
        // 4. Mensagem de fallback se não houver imóveis
        <p style={{ color: '#555', textAlign: 'center', padding: '1rem' }}>
          Você ainda não cadastrou nenhum imóvel.
        </p>
      )}
    </div>
  );
};