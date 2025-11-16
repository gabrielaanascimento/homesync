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

// 1. IMPORTS ADICIONADOS PARA BUSCAR OS IMÓVEIS
import { Property } from '@/types/property';
import { getAllProperties } from '@/services/getAllProperties';

// Interface para os reviews formatados
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
  
  // 2. NOVO STATE PARA OS IMÓVEIS
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && profileId) {
      const loggedInUserId = session.user.id;
      const token = session.user.token;

      if (profileId !== loggedInUserId) {
        router.push(`/profile/corretor/${loggedInUserId}`);
        return;
      }

      const fetchData = async () => {
        setLoadingProfile(true);
        
        // 3. BUSCA OS IMÓVEIS EM PARALELO
        const [corretorData, comentariosData, allProps] = await Promise.all([
          getCorretorById(profileId, token),
          getComentariosByPerfil(profileId),
          getAllProperties() // Adicionado
        ]);

        setCorretor(corretorData);

        // Formata os comentários
        if (comentariosData && comentariosData.length > 0) {
          const formatted = comentariosData.map((c: Avaliacao) => ({
            client: c.autor_nome,
            comment: c.corpo,
            stars: c.estrelas,
          }));
          setReviews(formatted);
        }

        // 4. FILTRA E SALVA OS IMÓVEIS DO CORRETOR
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

  // 5. FORMATA A LISTA DE IMÓVEIS PARA O COMPONENTE
  const productList = properties.map(p => ({
      image: p.image || "/semImagem.jpg",
      name: p.nome,
      address: p.local,
      rooms: `${p.quartos || 0} quartos`,
      area: p.area || 0
  }));

  return (
    <PrivateRouteWrapper>
      {loadingProfile ? (
        <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando perfil...</p></div>
      ) : !corretor ? (
        <div>Perfil do corretor não encontrado. (ID: {profileId})</div>
      ) : (
        <ProfilePage
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
          
          // 6. PASSA OS IMÓVEIS PARA O COMPONENTE
          userProperties={productList}
        />
      )}
    </PrivateRouteWrapper>
  );
};

// Estilos
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