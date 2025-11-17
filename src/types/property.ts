// gabrielaanascimento/homesync/homesync-4855366ad3a992712c652cfdd2b0b66e06804497/src/types/property.ts
export interface Property {
    // --- Campos Operacionais e Chaves Estrangeiras ---
    id: number; // ID da Negociação (sistema_imoveis.id)
    imovel_id: number; // ID do item no catálogo (imoveis.id)
    corretor_id?: number; 
    cliente_vendedor_id?: number;
    status: 'Disponível' | 'Vendida' | 'Alugada';

    // --- Campos de Catálogo (RAW DATA - Usados para Filtro e Mapeamento) ---
    nome: string;           // Usado como 'title'
    valor: number;          // Usado como 'buy_price' e para filtro numérico
    local: string;          // Usado como 'location' e para filtro de texto
    
    // --- Detalhes do Imóvel (RAW DATA) ---
    quartos?: number;       // Usado como 'bedrooms' e para filtro numérico
    area?: number;          // Usado como 'area' e para filtro numérico
    tipo_imovel: 'Casa' | 'Apartamento' | 'Terreno' | 'SalaComercial';
    endereco: string;
    
    // --- Campos Adicionais ---
    image?: string;         // Caminho da imagem principal (thumbnail)
    images?: string[];      // NOVO: Array com todas as URLs de imagem para o carrossel
    descricao?: string;
    destaques?: string;
    area_construida?: number;
    andar?: number;

    // --- DADOS DO CORRETOR (Adicionados pela nova query da API) ---
    corretor_email?: string;
    corretor_celular?: string;
}