// src/components/imovel/MenuBotoes/index.tsx
"use client"; // Necessário para usar hooks e interatividade

import React, { useState } from "react";
import { Share2, Mail, MessageCircle } from "lucide-react"; // Heart removido

// Interface para receber os dados do corretor
interface DockMenuProps {
  corretorEmail: string;
  corretorWhatsapp: string;
  defaultMessage: string;
}

const DockMenu: React.FC<DockMenuProps> = ({ 
  corretorEmail, 
  corretorWhatsapp, 
  defaultMessage 
}) => {
  
  const [shareLabel, setShareLabel] = useState("Compartilhar");

  // --- Funções de Clique ---

  // 1. Compartilhar (Copiar Link)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShareLabel("Copiado!");
        setTimeout(() => setShareLabel("Compartilhar"), 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar link: ', err);
        setShareLabel("Erro!");
        setTimeout(() => setShareLabel("Compartilhar"), 2000);
      });
  };

  // 2. Email (mailto)
  const handleEmail = () => {
    const subject = encodeURIComponent("Interesse em Imóvel HomeSync");
    const body = encodeURIComponent(defaultMessage);
    const mailtoLink = `mailto:${corretorEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  // 3. WhatsApp (wa.me)
  const handleWhatsApp = () => {
    // Limpa o número de telefone, deixando apenas dígitos (assume 55 para Brasil)
    const phone = `55${corretorWhatsapp.replace(/\D/g, '')}`;
    const text = encodeURIComponent(defaultMessage);
    const whatsappLink = `https://wa.me/${phone}?text=${text}`;
    window.open(whatsappLink, '_blank');
  };
  
  // --- Fim das Funções ---

  // Atualiza os itens para usar as funções
  const items = [
    { icon: Share2, label: shareLabel, onClick: handleShare },
    { icon: Mail, label: "Email", onClick: handleEmail },
    { icon: MessageCircle, label: "WhatsApp", onClick: handleWhatsApp },
  ];

  return (
    <div>
      <style>{`
        .dock-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }
        /* ... (restante do seu CSS inalterado) ... */
        .dock {
          display: flex;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 60px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .dock-item {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          color: #333;
        }
        .dock-item:hover {
          transform: translateY(-12px) scale(1.15);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }
        .dock-item:active {
          transform: translateY(-8px) scale(1.05);
        }
        .dock-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .dock-item:hover .dock-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-12px);
        }
        .dock:has(.dock-item:nth-child(1):hover) .dock-item:nth-child(2) {
          transform: translateY(-6px) scale(1.08);
        }
        .dock:has(.dock-item:nth-child(2):hover) .dock-item:nth-child(1),
        .dock:has(.dock-item:nth-child(2):hover) .dock-item:nth-child(3) {
          transform: translateY(-6px) scale(1.08);
        }
        .dock:has(.dock-item:nth-child(3):hover) .dock-item:nth-child(2) {
          transform: translateY(-6px) scale(1.08);
        }
      `}</style>

      <div className="dock-container">
        <div className="dock">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="dock-item"
              onClick={item.onClick} // Adiciona o evento de clique
            >
              <item.icon size={24} />
              <span className="dock-tooltip">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DockMenu;