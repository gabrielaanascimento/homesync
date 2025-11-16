// src/services/getImobiliariaById.ts

// 1. Defina a interface correta para a Imobiliária
export interface Imobiliaria {
    id: number;
    email: string;
    nome_exibicao: string;
    celular?: string;
    tipo: 'imobiliaria';
    razao_social: string;
    cnpj: string;
    creci_juridico?: string;
    endereco_comercial?: string;
    foto_logo?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

// 2. A função DEVE aceitar 'token' como o segundo argumento
export const getImobiliariaById = async (id: string, token: string): Promise<Imobiliaria | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/corretor/imobiliarias/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 3. O token é usado aqui
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.body?.message || data.message || `Erro HTTP: ${response.status}`;
            throw new Error(errorMessage);
        }

        // 4. Retorna 'data' diretamente, pois a API já retorna o objeto
        return data as Imobiliaria;

    } catch (error) {
        console.error(`Falha ao buscar imobiliária com ID ${id}:`, error);
        return null;
    }
};