// src/services/comentariosService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

export interface Avaliacao {
    id: number;
    perfil_id: number;
    autor_id?: number;
    autor_nome: string;
    autor_username?: string;
    autor_imagem?: string;
    corpo: string;
    estrelas: number;
    data_criacao: string;
}

interface AvaliacaoInput {
    autor_nome: string;
    autor_username?: string;
    autor_imagem?: string;
    corpo: string;
    estrelas: number;
}

// Busca todos os comentários (para a home)
export const getAllComentarios = async (): Promise<Avaliacao[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/comentarios`);
        
        // CORREÇÃO: Checa o status 204 ANTES de ler o JSON
        if (response.status === 204) {
            return []; // Retorna um array vazio se não houver comentários
        }
        
        if (!response.ok) {
            console.error("Erro ao buscar todos os comentários (não-OK):", response);
            return [];
        }
        
        const data = await response.json();
        return (data as Avaliacao[]) || [];

    } catch (error) {
        console.error("Erro ao buscar todos os comentários (catch):", error);
        return [];
    }
};

// Busca comentários de um perfil específico
export const getComentariosByPerfil = async (perfilId: string): Promise<Avaliacao[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${perfilId}/comentarios`);

        // CORREÇÃO: Checa o status 204 ANTES de ler o JSON
        if (response.status === 204) {
            return []; // Retorna um array vazio se não houver comentários
        }

        if (!response.ok) {
            console.error("Erro ao buscar comentários do perfil (não-OK):", response);
            return [];
        }
        
        // Só tenta ler o JSON se a resposta não for 204
        const data = await response.json();
        return (data as Avaliacao[]) || [];

    } catch (error) {
        console.error("Erro ao buscar comentários do perfil (catch):", error);
        return [];
    }
};

// Posta um novo comentário (inalterado, já está correto)
export const postComentario = async (
    perfilId: string, 
    data: AvaliacaoInput, 
    token: string
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${perfilId}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.body?.message || result.message || 'Falha ao postar comentário');
        }
        return { success: true, data: result as Avaliacao };
    } catch (error: any) {
        console.error("Erro ao postar comentário:", error);
        return { success: false, message: error.message };
    }
};