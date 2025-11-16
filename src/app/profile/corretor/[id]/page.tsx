// src/app/profile/corretor/[id]/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getCorretorById, Corretor } from '@/services/getCorretorById';
import { Loader2 } from 'lucide-react';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
// 1. Importe o ProfilePage e os serviços de comentários
import ProfilePage from '@/components/profile/ProfilePage';
import { Avaliacao, getComentariosByPerfil } from '@/services/comentariosService';

// 2. Defina o tipo para os reviews formatados
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
  const [reviews, setReviews] = useState<FormattedReview[]>([]); // 3. State para reviews
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
        
        // 4. Busca dados do corretor e comentários em paralelo
        const [corretorData, comentariosData] = await Promise.all([
          getCorretorById(profileId, token),
          getComentariosByPerfil(profileId) // Não precisa de token (rota pública)
        ]);

        setCorretor(corretorData);

        // 5. Formata os comentários para o formato que o ProfilePage espera
        if (comentariosData && comentariosData.length > 0) {
          const formatted = comentariosData.map((c: Avaliacao) => ({
            client: c.autor_nome,
            comment: c.corpo,
            stars: c.estrelas,
          }));
          setReviews(formatted);
        }
        
        setLoadingProfile(false);
      };
      
      fetchData();
    }
  }, [profileId, status, session, router]);

  // Renderização condicional

  return (
    <PrivateRouteWrapper>
      {loadingProfile ? (
        <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando perfil...</p></div>
      ) : !corretor ? (
        <div>Perfil do corretor não encontrado. (ID: {profileId})</div>
      ) : (
        // 6. ATUALIZAÇÃO AQUI: Passe os novos dados para o ProfilePage
        <ProfilePage
          name={corretor.nome_exibicao || "Corretor"}
          title={corretor.descricao || "Corretor de Imóveis"}
          photo={corretor.foto || "/semImagem.jpg"}
          reviews={reviews} // Passa os comentários dinâmicos

          // --- NOVAS PROPS ---
          email={corretor.email}
          creci={corretor.creci}
          celular={corretor.celular || 'Não cadastrado'}
          
          // --- PROPS ANTIGAS (Mantidas para a interface) ---
          totalSales={corretor.vendas_anual || 0}
          averageSales={0} 
          rating={parseFloat(corretor.avaliacao as any) || 0}
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