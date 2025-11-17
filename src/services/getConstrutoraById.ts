// src/services/getConstrutoraById.ts

// 1. Defina a interface para a Construtora (baseado no form de cadastro)
export interface Construtora {
    id: number;
    email: string;
    nome_exibicao: string;
    celular?: string;
    tipo: 'construtora';
    razao_social: string;
    cnpj: string;
    inscricao_estadual?: string;
    endereco_comercial?: string;
    foto_logo?: string;
    // Assumindo que também pode ter avaliações, etc.
    avaliacao?: number;
    vendas_anual?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

// 2. A função que aceita 'token'
export const getConstrutoraById = async (id: string, token: string): Promise<Construtora | null> => {
    try {
        // ATENÇÃO: A rota /corretor/construtoras/ é um palpite. Verifique sua API.
        // Se ela não existir, a página de perfil da construtora não funcionará.
        const response = await fetch(`${API_BASE_URL}/corretor/construtoras/${id}`, {
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

        return data as Construtora;

    } catch (error) {
        console.error(`Falha ao buscar construtora com ID ${id}:`, error);
        return null;
    }
};