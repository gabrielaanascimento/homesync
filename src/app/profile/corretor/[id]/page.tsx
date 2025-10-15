import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";

const CorretorProfilePage: React.FC = () => {
  const mockData = {
    name: "Lucas Almeida",
    title: "Corretor Imobiliário",
    photo: "/perfil.jpg", // Using a local image from the public folder
    bio: "Sou corretor imobiliário há mais de 5 anos, especializado em imóveis residenciais e de alto padrão. Acredito que cada lar conta uma história, e meu papel é ajudar você a encontrar o cenário perfeito para a sua.",
    contacts: [
      {
        type: "phone",
        label: "Telefone",
        value: "(11) 98765-4321",
        link: "tel:+5511987654321",
        icon: "📞",
      },
      {
        type: "email",
        label: "Email",
        value: "lucas@homesync.com.br",
        link: "mailto:lucas@homesync.com.br",
        icon: "✉️",
      },
      {
        type: "whatsapp",
        label: "WhatsApp",
        value: "(11) 98765-4321",
        link: "https://wa.me/5511987654321",
        icon: "💬",
      },
      {
        type: "linkedin",
        label: "LinkedIn",
        value: "lucasalmeida",
        link: "https://linkedin.com/in/lucasalmeida",
        icon: "👔",
      },
    ],
    experiences: [
      "5 anos de experiência no mercado imobiliário",
      "Especializado em imóveis residenciais de alto padrão",
      "Atendimento personalizado e consultoria completa",
      "Expertise em negociações e avaliação de imóveis",
      "Conhecimento profundo do mercado local",
    ],
    gallery: [
      "/public/imovel1.jpg",
      "/public/imovel2.jpg",
      "/public/imovel3.jpg",
      "/public/imovel4.jpg",
      "/public/imovel5.jpg",
      "/public/imovel6.jpg",
    ].map(img => img.replace("/public", "")), // Remove /public from paths
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <ProfilePage
        name={mockData.name}
        title={mockData.title}
        photo={mockData.photo}
        bio={mockData.bio}
        contacts={mockData.contacts}
        experiences={mockData.experiences}
        gallery={mockData.gallery}
      />
    </div>
  );
};

export default CorretorProfilePage;
