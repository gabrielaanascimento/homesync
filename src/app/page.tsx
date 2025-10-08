"use client";
import "./App.css";
import Cabecalho from "../components/home/Cabecalho";
import SessaoInicial from "../components/home/SessaoInicial";
import ContentCardStack, {
  ContentCardItem,
} from "../components/home/Cards/page";
import { Marquee } from "../components/ui/marquee";
import { Marquee3D } from "../components/home/CardsComments/index";
import RodaPe from "../components/home/Footer";

// PRIMEIRA LISTA DE CARDS - Serviços Imobiliários
const servicosImoveis: ContentCardItem[] = [
  {
    id: "busca-imoveis",
    title: "Encontre o Imóvel Perfeito em Segundos",
    image: "/icon-inteligente.png",
    imageBg: "#FFFFFF",
    content: `Nossa IA avançada Facilita as pesquisar por imóveis em 80%, mostrando apenas os imóveis que realmente se alinham com o perfil dos seus clientes. 
  
  • Busca inteligente por localização, preço e características específicas
  • Filtros avançados com critérios personalizáveis
  • Sistema de recomendação que evolui com seu uso`,
  },
  {
    id: "portifolio-construtoras",
    title: "Portfólio Completo das Construtoras",
    image: "/icon-portifolio.png",
    imageBg: "#FFFFFF",
    content: `Acesso exclusivo aos lançamentos das principais construtoras do mercado em uma base unificada e atualizada em tempo real. Todas as informações técnicas, fotos profissionais e disponibilidade comercial concentradas em um único ambiente confiável.
  
  • Centralização de dados de múltiplas construtoras parceiras
  • Informações técnicas completas e documentação organizada
  • Atualizações automáticas de status e disponibilidade`,
  },
  {
    id: "gestao-oportunidades",
    title: "Organize suas Oportunidades",
    image: "/icon-organize.png",
    imageBg: "#FFFFFF",
    content: `Sistema completo de gestão de oportunidades que permite organizar clientes, imóveis favoritos e negociações em um painel intuitivo e acessível de qualquer dispositivo. Ferramentas profissionais para aumentar sua produtividade e fechar mais negócios.
  
  • Painel personalizável por cliente e tipo de imóvel
  • Sistema de alertas para novos lançamentos compatíveis
  • Compartilhamento simplificado com clientes via link direto`,
  },
];
// SEGUNDA LISTA DE CARDS - Serviços Financeiros
const servicosFinanceiros: ContentCardItem[] = [
  {
    id: "parcerias-construtoras",
    title: "Para Construtoras e Incorporadoras",
    image: "/icon-construtor.png",
    imageBg: "#FFFFFF",
    content: `Maximize a visibilidade dos seus lançamentos junto aos corretores mais qualificados do mercado. Nossa plataforma funciona como uma vitrine digital inteligente que conecta seus empreendimentos diretamente aos profissionais que realmente podem converter oportunidades em vendas concretas.

  • Alcance direto a milhares de corretores parceiros qualificados
  • Redução de até 60% nos custos com divulgação tradicional
  • Relatórios detalhados de performance e engajamento por empreendimento
  • Sistema de match automático baseado em perfil de clientes`,
  },
  {
    id: "para-imobiliarias",
    title: "Para Imobiliárias",
    image: "/icon-imob.png",
    imageBg: "#FFFFFF",
    content: `Otimize o trabalho da sua equipe com acesso privilegiado ao maior banco de dados unificado de imóveis do mercado. Elimine a fragmentação de informações e concentre esforços no que realmente importa: fechar negócios.

  • Base unificada com imóveis de múltiplas construtoras parceiras
  • Aumento de produtividade da equipe em até 3x
  • Ferramentas de gestão e acompanhamento de performance por corretor
  • Integração com sistemas existentes (CRM, site próprio)`,
  },
  {
    id: "para-corretores",
    title: "Para Corretores",
    image: "/icon-corretor.png",
    imageBg: "#FFFFFF",
    content: `Transforme sua rotina com uma ferramenta que entende suas necessidades. Encontre o imóvel perfeito para cada cliente em segundos, com precisão e agilidade que só a inteligência artificial pode oferecer.

  • Busca inteligente que economiza até 20 horas/mês em pesquisas
  • Ferramentas de comparação e compartilhamento simplificado
  • Alertas em tempo real para novos lançamentos compatíveis`,
  },
];

function Home() {
  return (
    <div className="fundo pt-[50px]">
      <Cabecalho />
      <SessaoInicial />

      <div className="min-h-screen bg-gray-50">
        {/* Seção 1 - Serviços Imobiliários */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Funcionalidades
              </h2>
            </div>

            {/* PRIMEIRA LISTA DE CARDS */}
            <ContentCardStack items={servicosImoveis} />
          </div>
        </section>

        {/* Separador */}
        <div className="border-t border-gray-200"></div>

        {/* Seção 2 - Serviços Financeiros */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Porque Escolher a Home Sync
              </h2>
            </div>

            {/* SEGUNDA LISTA DE CARDS */}
            <ContentCardStack
              items={servicosFinanceiros}
              cardHeight={420}
              className="mt-8"
            />
          </div>
        </section>
      </div>
      {/* Marquee com comentários */}
      <Marquee repeat={4}>
        <Marquee3D />
      </Marquee>

      <RodaPe />
    </div>
  );
}

export default Home;
