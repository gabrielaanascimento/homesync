// src/app/profile/construtora/[id]/page.tsx
"use client" 

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getConstrutoraById, Construtora } from '@/services/getConstrutoraById'; 
import { Loader2 } from 'lucide-react';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import ProfilePage from '@/components/profile/ProfilePage'; 
import { Avaliacao, getComentariosByPerfil } from '@/services/comentariosService';
import { Property } from '@/types/property';
import { getAllProperties } from '@/services/getAllProperties'; 
import { deletePropertyById } from '@/services/deletePropertyById'; 

interface FormattedReview {
  client: string;
  comment: string;
  stars: number;
}

export default function ConstrutoraProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [construtora, setConstrutora] = useState<Construtora | null>(null);
  const [reviews, setReviews] = useState<FormattedReview[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && profileId) {
        const loggedInUserId = session.user.id;
        const token = session.user.token;

        if (profileId !== loggedInUserId) {
            router.push(`/profile/construtora/${loggedInUserId}`);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            
            const [construtoraData, comentariosData, allProps] = await Promise.all([
                getConstrutoraById(profileId, token), 
                getComentariosByPerfil(profileId),
                getAllProperties()
            ]);
            
            setConstrutora(construtoraData);

            if (comentariosData && comentariosData.length > 0) {
              const formatted = comentariosData.map((c: Avaliacao) => ({
                client: c.autor_nome,
                comment: c.corpo,
                stars: c.estrelas,
              }));
              setReviews(formatted);
            }

            if (allProps) {
                const construtoraIdNum = parseInt(profileId);
                // Assume que imóveis da construtora estão ligados ao seu ID
                setProperties(allProps.filter((p: Property) => p.corretor_id === construtoraIdNum));
            }
            setLoading(false);
        };
        fetchData();
    }
  }, [profileId, status, session, router]);

  // Função para deletar o imóvel
  const handleDeleteProperty = async (id: number) => {
    if (!session?.user?.token) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }
    
    if (window.confirm("Tem certeza que deseja deletar este imóvel? Esta ação não pode ser desfeita.")) {
      const result = await deletePropertyById(id, session.user.token);
      if (result.success) {
        alert(result.message);
        setProperties(prev => prev.filter(p => p.id !== id));
      } else {
        alert(`Erro ao deletar: ${result.message}`);
      }
    }
  };

  // Mapeia os imóveis para o formato do componente
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
      {loading ? (
        <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando perfil...</p></div>
      ) : !construtora || !session ? ( // <-- CORREÇÃO AQUI
        <div>Perfil da construtora não encontrado ou sessão inválida. (ID: {profileId})</div>
      ) : (
        <ProfilePage
          profileId={profileId} // Passa o ID
          userType={session.user.tipo} // Passa o tipo
          name={construtora.nome_exibicao || "Construtora"}
          title={construtora.razao_social || "Construtora Parceira"}
          photo={construtora.foto_logo || "/semImagem.jpg"}
          reviews={reviews} 
          email={construtora.email}
          creci={construtora.cnpj} // Passando CNPJ
          celular={construtora.celular || 'Não cadastrado'}
          totalSales={construtora.vendas_anual || 0} 
          averageSales={0} // Mock
          rating={construtora.avaliacao || 0} 
          userProperties={productList}
          onDeleteProperty={handleDeleteProperty} // Passa a função
        />
      )}
    </PrivateRouteWrapper>
  );
}

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