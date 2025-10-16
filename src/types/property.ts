// gabrielaanascimento/homesync/homesync-76cb64e06ff844bd6ad572848ed1b06dd57d35ba/src/types/property.ts
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
}