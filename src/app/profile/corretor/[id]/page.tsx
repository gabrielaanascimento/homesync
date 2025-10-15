import React from "react";
import ProfilePage from "@/components/profile/ProfilePage";

const App: React.FC = () => {
  return (
    <ProfilePage
      name="Lucas Almeida"
      title="Corretor Imobiliário"
      photo="https://via.placeholder.com/150"
      bio="Sou corretor imobiliário há mais de 5 anos, especializado em imóveis residenciais e de alto padrão. Acredito que cada lar conta uma história, e meu papel é ajudar você a encontrar o cenário perfeito para a sua."
      contacts={[
        {
          type: "phone",
          label: "Telefone",
          value: "(11) 98765-4321",
          link: "tel:+5511987654321",
        },
        {
          type: "email",
          label: "Email",
          value: "lucas@imoveis.com",
          link: "mailto:lucas@imoveis.com",
        },
        {
          type: "whatsapp",
          label: "WhatsApp",
          value: "(11) 98765-4321",
          link: "https://wa.me/5511987654321",
        },
        {
          type: "linkedin",
          label: "LinkedIn",
          value: "lucasalmeida",
          link: "https://linkedin.com/in/lucasalmeida",
        },
      ]}
      experiences={[
        "5 anos de experiência no mercado imobiliário",
        "Especializado em imóveis residenciais",
        "Atendimento personalizado e consultoria completa",
      ]}
      gallery={[
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
      ]}
    />
  );
};

export default App;
