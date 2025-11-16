// src/services/cadastro.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

type TipoUsuario = 'corretor' | 'imobiliaria' | 'construtora';

interface CommonData {
  email: string;
  senha: string;
  nome_exibicao: string;
  celular?: string;
}

export const registerUser = async (
  tipo: TipoUsuario, 
  commonData: CommonData, 
  specificData: any
) => {

  if (!commonData.email || !commonData.senha || !commonData.nome_exibicao || !tipo) {
    return { success: false, message: 'Campos principais (Email, Senha, Nome de Exibição, Tipo) são obrigatórios.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tipo: tipo,
        common: commonData,
        specific: specificData
      })
    });

    const result = await response.json();

    // A API do backend retorna o erro no 'body'
    if (!response.ok) {
      const errorMsg = result.body?.message || result.message || 'Falha ao cadastrar.';
      return { success: false, message: errorMsg };
    }

    // A API do backend retorna os dados no 'body'
    return { success: true, message: 'Cadastro realizado com sucesso!', data: result.body };

  } catch (error) {
    console.error("Erro no serviço de cadastro:", error);
    return { success: false, message: "Erro de rede ao tentar cadastrar." };
  }
}