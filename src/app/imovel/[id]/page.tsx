// gabrielaanascimento/homesync/homesync-4855366ad3a992712c652cfdd2b0b66e06804497/src/app/imovel/[id]/page.tsx
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

  const carouselImages = 
    propertyData.images && propertyData.images.length > 0
      ? propertyData.images
      : propertyData.image
      ? [propertyData.image]
      : [];

  const destaquesText = propertyData.destaques || "Nenhum destaque especial fornecido.";

  // --- DADOS PARA O MENU DE BOTÕES ---
  const corretorEmail = propertyData.corretor_email || "contato@homesync.com";
  // Fallback para um número genérico se não houver
  const corretorCelular = propertyData.corretor_celular || "5511999998888"; 
  const defaultMessage = `Olá! Tenho interesse no imóvel "${propertyData.nome}" (ID: ${propertyData.id}) que encontrei na HomeSync.`;
  // --- FIM DOS DADOS ---

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
      
      {/* Passando os dados para o componente */}
      <MenuBotoes 
        corretorEmail={corretorEmail}
        corretorWhatsapp={corretorCelular}
        defaultMessage={defaultMessage}
      />
    </div>
  );
}