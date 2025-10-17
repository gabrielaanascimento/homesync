"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeaderProfile from "@/components/profile/HeaderProfileCorretor";

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <HeaderProfile
        imageUrl={user?.image || "/perfil.jpg"}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Informações de Contato</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-600">{contact.label}:</span>
                <span className="ml-2 text-blue-600">{contact.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/imovel/cadastro')}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
          >
            Cadastrar Imóvel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorretorProfilePage;