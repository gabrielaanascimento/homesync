// src/services/uploadService.ts
const API_BASE_URL = process.env.URL_API || 'https://homesyncapi.vercel.app';

/**
 * Faz upload de um arquivo de imagem para a API.
 * Requer um token de autenticação.
 */
export const uploadPhoto = async (
  file: File, 
  token: string
): Promise<{ success: boolean, message: string, url?: string }> => {
    
    const formData = new FormData();
    formData.append('photo', file); // O campo DEVE ser 'photo'

    try {
        const response = await fetch(`${API_BASE_URL}/upload-photo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // Não defina Content-Type, o navegador faz isso
            },
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            // A API de upload retorna o erro no 'body'
            throw new Error(result.body?.message || result.message || 'Falha no upload');
        }

        // A API retorna { success: true, url: '...' } no 'body'
        return result.body; 

    } catch (error: any) {
        console.error("Erro no serviço de upload:", error);
        return { success: false, message: error.message };
    }
}