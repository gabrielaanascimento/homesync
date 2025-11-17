// src/app/profile/imobiliaria/[id]/page.tsx
"use client" 

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getImobiliariaById, Imobiliaria } from '@/services/getImobiliariaById';
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

export default function ImobiliariaProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [imobiliaria, setImobiliaria] = useState<Imobiliaria | null>(null);
  const [reviews, setReviews] = useState<FormattedReview[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && profileId) {
        const loggedInUserId = session.user.id;
        const token = session.user.token;

        if (profileId !== loggedInUserId) {
            router.push(`/profile/imobiliaria/${loggedInUserId}`);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            
            const [imobData, comentariosData, allProps] = await Promise.all([
                getImobiliariaById(profileId, token),
                getComentariosByPerfil(profileId),
                getAllProperties()
            ]);
            
            setImobiliaria(imobData);

            if (comentariosData && comentariosData.length > 0) {
              const formatted = comentariosData.map((c: Avaliacao) => ({
                client: c.autor_nome,
                comment: c.corpo,
                stars: c.estrelas,
              }));
              setReviews(formatted);
            }

            if (allProps) {
                const imobIdNumber = parseInt(profileId);
                // Assume que imóveis da imobiliária estão ligados ao seu ID
                setProperties(allProps.filter((p: Property) => p.corretor_id === imobIdNumber));
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
      ) : !imobiliaria || !session ? ( // <-- CORREÇÃO AQUI
        <div>Perfil da imobiliária não encontrado ou sessão inválida. (ID: {profileId})</div>
      ) : (
        <ProfilePage
          profileId={profileId} // Passa o ID
          userType={session.user.tipo} // Passa o tipo
          name={imobiliaria.nome_exibicao || "Imobiliária"}
          title={imobiliaria.razao_social || "Imobiliária Parceira"}
          photo={imobiliaria.foto_logo || "/semImagem.jpg"}
          reviews={reviews} 
          email={imobiliaria.email}
          creci={imobiliaria.creci_juridico} // Passando creci_juridico
          celular={imobiliaria.celular || 'Não cadastrado'}
          totalSales={0} // Mock
          averageSales={0} // Mock
          rating={0} // Mock
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