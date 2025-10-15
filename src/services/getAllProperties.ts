
const API_BASE_URL = process.env.URL_API || 'http://localhost:3001';

export const getAllProperties = async () => {
    try {
        // CORREÇÃO 1: Mudança do endpoint de /chat/imoveis para /imovel/imoveis/
        const response = await fetch(`${API_BASE_URL}/imovel/imoveis/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            // Lógica de erro para extrair a mensagem do corpo da HttpResponse
            throw new Error(errorData.body?.msg || errorData.body?.message || 'Erro ao buscar os imóveis.');
        }

        const data = await response.json();
        
        // CORREÇÃO 2: A API retorna o objeto HttpResponse, o array de propriedades está em data.body
        if (data.statusCode === 200) {
             return data.body;
        } else {
             throw new Error(data.body?.message || 'Falha na resposta da API.');
        }

    } catch (error) {
        console.error('Falha ao buscar imóveis:', error);
        // Retorna null para indicar que a operação falhou.
        return null;
    }
};