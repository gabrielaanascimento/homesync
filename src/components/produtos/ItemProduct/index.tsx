import React from "react";
import "./styles.css";

interface ItemProductProps {
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number; // área como número
}

export const ItemProducts = ({
  image,
  name,
  address,
  rooms,
  area,
}: ItemProductProps) => {
  return (
    <div className="item-product-card">
      <img src={image} alt={name} className="item-product-image" />
      <div className="item-product-content" style={{
         marginTop: "1.5rem",
         zIndex: 999
      }}>
        <h3 className="item-product-title">{name}</h3>
        <p className="item-product-address">{address}</p>
        <p className="item-product-rooms">{rooms}</p>
        <p className="item-product-area">{area} m²</p>
      </div>
    </div>
  );
};
