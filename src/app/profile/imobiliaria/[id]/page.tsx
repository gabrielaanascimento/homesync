// src/app/profile/imobiliaria/[id]/page.tsx
"use client" 

import React, { useEffect, useState } from 'react';
import HeaderProfile from "@/components/profile/HeaderProfileImobiliaria";
import Rating from "@/components/profile/Rating";
import SalesStats from "@/components/profile/SalesCard";
import CardAffiliated from "@/components/profile/CardCorretoresAfiliados";
import { Products } from "@/components/produtos/products";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getImobiliariaById, Imobiliaria } from '@/services/getImobiliariaById';
import Comentarios from '@/components/profile/Comentarios';
import { Loader2 } from 'lucide-react';
import { Property } from '@/types/property';
import { getAllProperties } from '@/services/getAllProperties'; 
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper'; // 1. IMPORTAR

export default function ImobiliariaProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [imobiliaria, setImobiliaria] = useState<Imobiliaria | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && profileId) {
        const loggedInUserId = session.user.id;
        const token = session.user.token;

        // Verificação de ID no Frontend
        if (profileId !== loggedInUserId) {
            router.push(`/profile/imobiliaria/${loggedInUserId}`);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const [imobData, allProps] = await Promise.all([
                getImobiliariaById(profileId, token), // Passe o token
                getAllProperties() // getAllProperties é público, não precisa de token
            ]);
            
            setImobiliaria(imobData);

            if (allProps) {
                const imobIdNumber = parseInt(profileId);
                setProperties(allProps.filter((p: Property) => p.corretor_id === imobIdNumber));
            }
            setLoading(false);
        };
        fetchData();
    }
  }, [profileId, status, session, router]);

  // Mapeia os produtos para o formato esperado pelo componente Products
  const productList = properties.map(p => ({
      image: p.image || "/semImagem.jpg",
      name: p.nome,
      address: p.local,
      rooms: `${p.quartos || 0} quartos`,
      area: p.area || 0
  }));

  // 2. ENVOLVER A PÁGINA
  return (
    <PrivateRouteWrapper>
      {loading ? (
        <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando perfil...</p></div>
      ) : !imobiliaria ? (
        <div>Perfil da imobiliária não encontrado. (ID: {profileId})</div>
      ) : (
        <main style={styles.mainContainer}>
          <div style={styles.contentWrapper}>
            <HeaderProfile
              description={imobiliaria.endereco_comercial || "Imobiliária parceira HomeSync"}
              imageUrl={imobiliaria.foto_logo || "/semImagem.jpg"}
              // TODO: Atualize 'HeaderProfileImobiliaria' para aceitar 'name'
              // e passe 'imobiliaria.nome_exibicao'
            />

            <div style={styles.gridContainer}>
              <Rating 
                stars={4} // Dado estático
                totalReviews={120} // Dado estático
                score={4.5} // Dado estático
              />
              <SalesStats 
                monthlySales={150} // Dado estático
                annualSales={1800} // Dado estático
              />
            </div>

            <div style={styles.centerSection}>
              <CardAffiliated />
            </div>

            <Products title="Imóveis da Imobiliária" properties={productList} />

            {/* 3. ADICIONAR COMPONENTE DE COMENTÁRIOS */}
            <div style={styles.commentsSection}>
              <Comentarios perfilId={profileId} />
            </div>
          </div>
        </main>
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
    mainContainer: {
        minHeight: "100vh",
        paddingBottom: "40px",
        background: "linear-gradient(to bottom, white, #f3e8ff)"
    },
    contentWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        paddingBottom: "40px",
    },
    gridContainer: { 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "30px", 
        paddingLeft: '70px', 
        paddingRight: "70px", 
        height: "200px" 
    },
    centerSection: { 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: '70px', 
        paddingRight: "70px", 
        width: "100%" 
    },
    commentsSection: {
      padding: '0 70px',
      marginTop: '2rem'
    }
};