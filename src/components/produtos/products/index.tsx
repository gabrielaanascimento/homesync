// src/components/produtos/products/index.tsx
import React from "react";
import "./styles.css";
import PropertyCard from "../PropertyCard"; 

interface Property {
  // ... (interface inalterada)
  id: number;
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number;
  valor: number;
}

interface PropsProducts {
  title?: string;
  properties: Property[];
  filters?: { /* ... */ };
  onDeleteProperty?: (id: number) => void; 
  userType?: 'corretor' | 'imobiliaria' | 'construtora'; // 1. TIPO ADICIONADO
}

export const Products = ({ title, properties, filters, onDeleteProperty, userType }: PropsProducts) => {
  // ... (filtro inalterado) ...
  const filteredProperties = properties;

  return (
    <div className="containerProducts">
      <h1 className="titleProducts">{title}</h1>
      <div className="containerItemsProducts">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            imovel_id={property.id}
            image={property.image}
            nome={property.name}
            valor={property.valor}
            local={property.address}
            quartos={parseInt(property.rooms.split(' ')[0]) || 0}
            area={property.area}
            onDelete={onDeleteProperty ? () => onDeleteProperty(property.id) : undefined}
            userType={userType} // 2. PROP PASSADA ADIANTE
          />
        ))}
      </div>
    </div>
  );
};