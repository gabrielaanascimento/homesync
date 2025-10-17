// src/services/getCorretorById.ts

// Define a interface baseada no seu backend (homesyncapi/src/models/users-models.ts)
export interface Corretor {
    id: number;
    nome: string;
    email: string;
    creci: string;
    cpf: string;
    afiliacao?: string;
    celular?: string;
    descricao?: string;
    vendas_anual?: number;
    caracteristicas?: string;
    foto?: string;
}

const API_BASE_URL = process.env.URL_API || 'https://homesyncapi.vercel.app';

export const getCorretorById = async (id: string): Promise<Corretor | null> => {
    try {
        // A rota correta na sua API é /corretor/corretores/:id
        const response = await fetch(`${API_BASE_URL}/corretor/corretores/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.body?.message || `Erro HTTP: ${response.status} ao buscar o corretor.`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // A API retorna um objeto HttpResponse, o corretor está no corpo (body)
        if (data.statusCode === 200 && data.body) {
             return data.body as Corretor;
        } else {
             return null;
        }

    } catch (error) {
        console.error(`Falha ao buscar corretor com ID ${id}:`, error);
        return null;
    }
};