// src/app/profile/corretor/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getCorretorById, Corretor } from '@/services/getCorretorById';
import { Loader2 } from 'lucide-react';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import ProfilePage from '@/components/profile/ProfilePage';
import { Avaliacao, getComentariosByPerfil } from '@/services/comentariosService';
import { Property } from '@/types/property';
import { getAllProperties } from '@/services/getAllProperties';
import { deletePropertyById } from '@/services/deletePropertyById'; // Importado

interface FormattedReview {
  client: string;
  comment: string;
  stars: number;
}

const CorretorProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string; 

  const [corretor, setCorretor] = useState<Corretor | null>(null);
  const [reviews, setReviews] = useState<FormattedReview[]>([]);
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    // ... (lógica do useEffect inalterada) ...
    if (status === "authenticated" && profileId) {
      const loggedInUserId = session.user.id;
      const token = session.user.token;

      if (profileId !== loggedInUserId) {
        router.push(`/profile/corretor/${loggedInUserId}`);
        return;
      }

      const fetchData = async () => {
        setLoadingProfile(true);
        
        const [corretorData, comentariosData, allProps] = await Promise.all([
          getCorretorById(profileId, token),
          getComentariosByPerfil(profileId),
          getAllProperties()
        ]);

        setCorretor(corretorData);

        if (comentariosData && comentariosData.length > 0) {
          const formatted = comentariosData.map((c: Avaliacao) => ({
            client: c.autor_nome,
            comment: c.corpo,
            stars: c.estrelas,
          }));
          setReviews(formatted);
        }

        if (allProps) {
            const corretorIdNum = parseInt(profileId);
            const userProps = allProps.filter((p: Property) => p.corretor_id === corretorIdNum);
            setProperties(userProps);
        }
        
        setLoadingProfile(false);
      };
      
      fetchData();
    }
  }, [profileId, status, session, router]);

  // FUNÇÃO PARA DELETAR O IMÓVEL
  const handleDeleteProperty = async (id: number) => {
    if (!session?.user?.token) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }
    
    if (window.confirm("Tem certeza que deseja deletar este imóvel? Esta ação não pode ser desfeita.")) {
      const result = await deletePropertyById(id, session.user.token);
      if (result.success) {
        alert(result.message);
        // Remove o imóvel da lista local
        setProperties(prev => prev.filter(p => p.id !== id));
      } else {
        alert(`Erro ao deletar: ${result.message}`);
      }
    }
  };

  const productList = properties.map(p => ({
      id: p.id,
      image: p.image || "/semImagem.jpg",
      name: p.nome,
      address: p.local,
      rooms: `${p.quartos || 0} quartos`,
      area: p.area || 0,
      valor: p.valor || 0
  }));

  return (
    <PrivateRouteWrapper>
      {loadingProfile ? (
        <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando perfil...</p></div>
      ) : !corretor ? (
        <div>Perfil do corretor não encontrado. (ID: {profileId})</div>
      ) : (
        <ProfilePage
          profileId={profileId} // Passa o ID
          name={corretor.nome_exibicao || "Corretor"}
          title={corretor.descricao || "Corretor de Imóveis"}
          photo={corretor.foto || "/semImagem.jpg"}
          reviews={reviews} 
          email={corretor.email}
          creci={corretor.creci}
          celular={corretor.celular || 'Não cadastrado'}
          totalSales={corretor.vendas_anual || 0}
          averageSales={0} 
          rating={parseFloat(corretor.avaliacao as any) || 0}
          userProperties={productList} 
          onDeleteProperty={handleDeleteProperty} // Passa a função
        />
      )}
    </PrivateRouteWrapper>
  );
};
// ... (estilos inalterados) ...
const styles: { [key: string]: React.CSSProperties } = {
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#004EFF',
        gap: '1rem',
        backgroundColor: '#f0f5ff'
    },
};

export default CorretorProfilePage;