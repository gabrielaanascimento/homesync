// src/components/produtos/ItemProduct/index.tsx
"use client"; // Necessário para useSession e onClick

import React, { useState } from "react";
import "./styles.css";
import { useSession } from "next-auth/react";
import { Loader2, Edit, Trash2 } from "lucide-react"; // Ícones

interface ItemProductProps {
  id: number; // ID é necessário para deletar/editar
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number; 
}

export const ItemProducts = ({
  id,
  image,
  name,
  address,
  rooms,
  area,
}: ItemProductProps) => {
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    // Redireciona para uma futura página de edição
    window.location.href = `/imovel/editar/${id}`;
  };

  const handleDelete = async () => {
    if (!session?.user?.token) {
      alert("Erro: Você não está autenticado.");
      return;
    }
    if (!window.confirm(`Tem certeza que deseja deletar o imóvel "${name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`https://homesyncapi.vercel.app/imovel/imoveis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar o imóvel.');
      }

      alert("Imóvel deletado com sucesso!");
      window.location.reload(); // Recarrega a página para atualizar a lista

    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="item-product-card">
      <img src={image} alt={name} className="item-product-image" />
      
      <div className="item-product-content">
        <h3 className="item-product-title">{name}</h3>
        <p className="item-product-address">{address}</p>
        
        {/* Informações do Imóvel */}
        <div className="item-product-features">
          <span>{rooms}</span>
          <span>•</span>
          <span>{area} m²</span>
        </div>
        
        {/* Botões de Ação */}
        <div className="item-product-actions">
          <button 
            className="item-product-button edit" 
            onClick={handleEdit}
            disabled={isDeleting}
          >
            <Edit size={16} /> Editar
          </button>
          <button 
            className="item-product-button delete" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};