// gabrielaanascimento/homesync/homesync-76cb64e06ff844bd6ad572848ed1b06dd57d35ba/src/app/imovel/[id]/page.tsx
import Carrosel from "@/components/imovel/Carrossel/index";
import Navbar from "@/components/Navbar/navbar";
import Caracteristicas from "@/components/imovel/Caracteristicas";
import Destaques from "@/components/imovel/Destaques";
import MenuBotoes from "@/components/imovel/MenuBotoes";
import { getPropertyById } from "@/services/getPropertyById";
import "./page.css";

type ImovelPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ImovelPage({ params }: ImovelPageProps) {
  const { id } = await params;

  const propertyData = await getPropertyById(id);

  if (!propertyData) {
    return (
      <div>
        <center>
          <Navbar />
        </center>
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Imóvel não encontrado.</h1>
      </div>
    );
  }

  const precoFormatado = propertyData.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || "R$ 0,00";
  const tituloPrincipal = `${propertyData.nome}`;

  const featuresList = [
    `Tipo: ${propertyData.tipo_imovel}`,
    propertyData.quartos ? `${propertyData.quartos} Quartos` : null,
    propertyData.area ? `Área Total: ${propertyData.area} m²` : null,
    propertyData.area_construida ? `Área Construída: ${propertyData.area_construida} m²` : null,
    propertyData.andar ? `Andar: ${propertyData.andar}` : null,
    `Endereço: ${propertyData.endereco}`,
    propertyData.descricao,
  ].filter((feature): feature is string => !!feature);

  // LÓGICA DO CARROSSEL MODIFICADA
  // Usa o array 'images' se existir e tiver itens.
  // Caso contrário, usa a 'image' principal como fallback.
  // Se nenhuma imagem existir, passa um array vazio.
  const carouselImages = 
    propertyData.images && propertyData.images.length > 0
      ? propertyData.images
      : propertyData.image
      ? [propertyData.image]
      : [];

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
        <Caracteristicas features={featuresList} />
        <Destaques highlights={destaquesText} />
      </div>
      <MenuBotoes />
    </div>
  );
}