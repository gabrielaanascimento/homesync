
// Next-main/src/app/imovel/[id]/page.tsx
import Carrosel from "@/components/imovel/Carrossel/index";
import Navbar from "@/components/Navbar/navbar";
import Caracteristicas from "@/components/imovel/Caracteristicas";
import Destaques from "@/components/imovel/Destaques";
import MenuBotoes from "@/components/imovel/MenuBotoes";
import { getPropertyById } from "@/services/getPropertyById"; 
import "./page.css";

interface ImovelPageProps {
  params: {
    id: string; // O ID do imóvel da rota dinâmica
  };
}

// Componente agora é Server Component assíncrono para buscar dados diretamente
async function ImovelPage({ params }: ImovelPageProps) {
  
  // CORREÇÃO FINAL: Destruturar 'id' imediatamente para satisfazer a verificação de acesso síncrono do Next.js.
  const { id } = params;
  console.log("ID do imóvel recebido nos parâmetros:", id);
  
  const propertyData = await getPropertyById(id);

  console.log("Dados do imóvel obtidos:", propertyData);
  

  if (!propertyData) {
    // Tratamento para imóvel não encontrado
    return (
      <div>
        <center>
          <Navbar />
        </center>
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Imóvel não encontrado.</h1>
      </div>
    );
  }

  // Preparação dos dados
  const precoFormatado = propertyData.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "R$ 0,00";
  const tituloPrincipal = `${propertyData.nome}`;

  // Cria lista de características para o componente Caracteristicas
  const featuresList = [
    `Tipo: ${propertyData.tipo_imovel}`,
    propertyData.quartos ? `${propertyData.quartos} Quartos` : null,
    propertyData.area ? `Área Total: ${propertyData.area} m²` : null,
    propertyData.area_construida ? `Área Construída: ${propertyData.area_construida} m²` : null,
    propertyData.andar ? `Andar: ${propertyData.andar}` : null,
    `Endereço: ${propertyData.endereco}`,
    // Incluir descrição se existir
    propertyData.descricao,
  ].filter((feature): feature is string => !!feature);

  // Usa a imagem principal para o carrossel (ajustar se houver mais de uma imagem na API)
  const carouselImages = propertyData.image ? [propertyData.image] : [];
  
  // Destaques
  const destaquesText = propertyData.destaques || "Nenhum destaque especial fornecido.";

  return (
    <div>
      <center>
        <Navbar />
      </center>
      <h1>{tituloPrincipal}</h1>
      <Carrosel imageUrls={carouselImages} />
      <h1>
        <b>{precoFormatado}</b>
      </h1>
      <div className="container1">
        {/* Passa dados dinâmicos para os componentes */}
        <Caracteristicas features={featuresList} />
        <Destaques highlights={destaquesText} />
      </div>
      <MenuBotoes />
    </div>
  );
}

export default ImovelPage;