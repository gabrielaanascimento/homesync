"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderProfile from "@/components/profile/HeaderProfileCorretor";
import ProfilePage from '@/components/profile/ProfilePage';

const CorretorProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "unauthenticated") {
    router.push('/login');
    return null;
  }

  const user = session?.user;

  const contacts = [
    {
      label: "Telefone",
      value: user?.telefone,
      link: `tel:${user?.telefone}`,
    },
    {
      label: "Email",
      value: user?.email,
      link: `mailto:${user?.email}`,
    },
    {
      label: "WhatsApp",
      value: user?.telefone,
      link: `https://wa.me/${user?.telefone}`,
    },
  ];

  return (
    <ProfilePage
      name="Lucas Ferreira"
      title="Corretor de Imóveis"
      photo="https://i.pravatar.cc/150"
      totalSales={45}
      averageSales={120500}
      rating={4.8}
      reviews={[
        { client: "Mariana Souza", comment: "Excelente atendimento!", stars: 5 },
        { client: "João Lima", comment: "Muito profissional e confiável.", stars: 4 },
        { client: "Ana Paula", comment: "Ótima experiência! Recomendo.", stars: 5 },
      ]}
    />
  );
};

export default CorretorProfilePage;