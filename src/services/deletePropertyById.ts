// src/services/deletePropertyById.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

interface DeleteResult {
  success: boolean;
  message: string;
}

export const deletePropertyById = async (id: number, token: string): Promise<DeleteResult> => {
    if (!token) {
        return { success: false, message: 'Autenticação necessária.' };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/imovel/imoveis/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
             // 204 No Content é uma resposta de sucesso para DELETE
             return { success: true, message: 'Imóvel deletado com sucesso.' };
        }

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.body?.message || data.message || `Erro HTTP: ${response.status}`;
            throw new Error(errorMessage);
        }
        
        // Se a API retornar 200 OK com JSON
        return { success: true, message: data.message || 'Imóvel deletado.' };

    } catch (error: any) {
        console.error(`Falha ao deletar imóvel com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro de rede.' };
    }
};