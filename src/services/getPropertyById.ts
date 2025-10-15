// Next-main/src/services/getPropertyById.ts
import { Property } from "@/types/property";

const API_BASE_URL = process.env.URL_API || 'http://localhost:3001';

export const getPropertyById = async (id: string): Promise<Property | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/imovel/imoveis/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.body?.msg || errorData.body?.message || `Erro HTTP: ${response.status} ao buscar o imóvel.`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        // A API retorna o objeto HttpResponse, o objeto de propriedade está em data.body
        if (data.statusCode === 200 && data.body) {
             return data.body as Property;
        } else {
             return null;
        }

    } catch (error) {
        console.error(`Falha ao buscar imóvel com ID ${id}:`, error);
        return null;
    }
};