// gabrielaanascimento/homesync/homesync-9e54974e0e209196e3d557d82b6195c7d4979ffe/src/services/property-registration.ts

import { Property } from "@/types/property";

// Define a estrutura de dados esperada para envio para o backend
// O backend exige status, corretor_id e cliente_vendedor_id para criar a negociação (sistema_imoveis)
interface PropertyData {
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

interface RegistrationResult {
  success: boolean;
  message: string;
}

const API_BASE_URL = process.env.URL_API || 'http://localhost:3001';

/**
 * Registra um novo imóvel e faz o upload de suas imagens em duas etapas.
 * @param propertyData Dados textuais do imóvel.
 * @param images Lista de arquivos de imagem.
 * @returns Um objeto com o status da operação e uma mensagem.
 */
export const registerProperty = async (
  propertyData: PropertyData, 
  images: FileList | null
): Promise<RegistrationResult> => {
  // CORREÇÃO: Obter o token real do localStorage para autenticação
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

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
        'Authorization': `Bearer ${token}` // Usa o token obtido
      },
      body: JSON.stringify(propertyData)
    });

    const propertyResult = await propertyResponse.json();

    if (!propertyResponse.ok || propertyResult.statusCode !== 201) {
      const errorMsg = propertyResult.body?.message || 'Falha ao cadastrar os dados do imóvel.';
      return { success: false, message: `Erro no Cadastro (Dados): ${errorMsg}` };
    }
    
    // O backend retorna o ID do registro em sistema_imoveis (sistemaId)
    sistemaImovelId = propertyResult.body?.id; 
    
    if (!sistemaImovelId) {
        return { success: false, message: 'ID do imóvel não retornado após cadastro inicial.' };
    }

  } catch (error) {
    console.error('Erro de rede ao cadastrar dados do imóvel:', error);
    // Retorna uma mensagem de erro mais detalhada em caso de falha de rede/fetch
    return { success: false, message: 'Erro de conexão ao cadastrar os dados do imóvel. (Verifique o backend e o CORS)' };
  }
  
  // --- 2. Enviar as imagens, se houverem ---
  if (images && images.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      // O campo deve ser 'images' para corresponder ao middleware 'uploadImovelImages'
      formData.append('images', images[i]); 
    }
    
    console.log(formData);
    


    try {
        // A rota de upload usa o ID do registro em 'sistema_imoveis'
        const imageResponse = await fetch(`${API_BASE_URL}/imovel/imoveis/${sistemaImovelId}/upload-images`, {
            method: 'POST',
            headers: {
                // Não adicionamos 'Content-Type' para FormData, o navegador faz isso automaticamente
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        const imageResult = await imageResponse.json();

        if (!imageResponse.ok || imageResult.success === false) {
            // O imóvel foi cadastrado, mas o upload falhou
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