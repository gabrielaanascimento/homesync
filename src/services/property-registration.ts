// src/services/property-registration.ts

import { Property } from "@/types/property";

// 1. DEFINIÇÃO DA INTERFACE (O que estava faltando)
// Define a estrutura de dados esperada para envio para o backend
export interface PropertyData {
  nome: string;
  valor: number;
  local: string;
  quartos: number;
  area: number;
  tipo_imovel: 'Casa' | 'Apartamento' | 'Terreno' | 'SalaComercial';
  endereco: string;
  descricao: string;
  destaques: string;
  // Campos obrigatórios de Foreign Keys e Status para o backend
  status: 'Disponível';
  corretor_id: number; 
  cliente_vendedor_id: number;
}

// 2. INTERFACE DE RESULTADO (Já existia)
interface RegistrationResult {
  success: boolean;
  message: string;
}

const API_BASE_URL = process.env.URL_API || 'https://homesyncapi.vercel.app';

/**
 * Registra um novo imóvel e faz o upload de suas imagens em duas etapas.
 * @param propertyData Dados textuais do imóvel.
 * @param images Lista de arquivos de imagem.
 * @returns Um objeto com o status da operação e uma mensagem.
 */
export const registerProperty = async (
  propertyData: PropertyData, // Agora o 'PropertyData' será encontrado
  images: FileList | null,
  token: string // 3. Parâmetro 'token' da última correção
): Promise<RegistrationResult> => {

  if (!token) {
    return { success: false, message: 'Autenticação necessária. Faça login novamente.' };
  }

  // --- 1. Enviar os dados do imóvel ---
  let sistemaImovelId: number | undefined;

  try {
    const propertyResponse = await fetch(`${API_BASE_URL}/imovel/imoveis/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(propertyData)
    });

    const propertyResult = await propertyResponse.json();

    if (!propertyResponse.ok || propertyResult.statusCode !== 201) {
      const errorMsg = propertyResult.body?.message || 'Falha ao cadastrar os dados do imóvel.';
      return { success: false, message: `Erro no Cadastro (Dados): ${errorMsg}` };
    }
    
    sistemaImovelId = propertyResult.body?.id; 
    
    if (!sistemaImovelId) {
        return { success: false, message: 'ID do imóvel não retornado após cadastro inicial.' };
    }

  } catch (error) {
    console.error('Erro de rede ao cadastrar dados do imóvel:', error);
    return { success: false, message: 'Erro de conexão ao cadastrar os dados do imóvel. (Verifique o backend e o CORS)' };
  }
  
  // --- 2. Enviar as imagens, se houverem ---
  if (images && images.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]); 
    }
    
    try {
        const imageResponse = await fetch(`${API_BASE_URL}/imovel/imoveis/${sistemaImovelId}/upload-images`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        const imageResult = await imageResponse.json();

        if (!imageResponse.ok || imageResult.success === false) {
            const errorMsg = imageResult.body?.message || imageResult.message || 'Falha ao fazer upload das imagens.';
            return { success: false, message: `Erro no Upload (Imagens): ${errorMsg}. O imóvel foi cadastrado, mas sem fotos.` };
        }
    } catch (error) {
        console.error('Erro de rede ao enviar imagens:', error);
        return { success: false, message: 'Erro de conexão ao enviar imagens. O imóvel foi cadastrado, mas sem fotos.' };
    }
  }

  return { success: true, message: 'Imóvel e imagens cadastrados com sucesso!' };
};