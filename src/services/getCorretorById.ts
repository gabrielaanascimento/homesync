// src/services/getCorretorById.ts

// 1. INTERFACE ATUALIZADA com todos os campos da API
export interface Corretor {
    id: number;
    email: string;
    nome_exibicao: string;
    celular?: string;
    tipo: 'corretor';
    ativo: boolean;
    data_criacao: string;
    nome_completo: string;
    cpf: string;
    creci: string;
    afiliacao?: string;
    descricao?: string;
    avaliacao?: number;
    vendas_anual?: number;
    conversao_final?: number;
    conversao_data?: any; // JSONB do banco
    caracteristicas?: string;
    foto?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

// 2. A função (agora correta) que aceita o token
export const getCorretorById = async (id: string, token: string): Promise<Corretor | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/corretor/corretores/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.body?.message || data.message || `Erro HTTP: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data as Corretor;

    } catch (error) {
        console.error(`Falha ao buscar corretor com ID ${id}:`, error);
        return null;
    }
};