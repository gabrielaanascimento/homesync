import React from 'react'
import "./style.css"
import Navbar from '@/components/Navbar/navbar'
import Cabecalho from '@/components/home/Cabecalho'
 const sobre = () => {
  return (
    <>
    <Cabecalho />

    <section className="about-banner">
        <div className="container">
            <h1>Conheça a Nossa História</h1>
            <p>A HomeSync é uma Plataforma Inteligente para Corretores e Imobiliárias que nasceu para impulsionar a eficiência e a transparência no mercado imobiliário.</p>
        </div>
    </section>

    <section className="story-section">
        <div className="container story-content">
            <div className="story-image">
                <img src="HS.png" alt="Nossa Equipe Trabalhando" />
            </div>
            <div className="story-text">
                <h2>Quem Somos Nós</h2>
                <p>Somos a equipe Omni Code, e nosso projeto é uma proposta inovadora e promissora, com o objetivo central de otimizar o processo de negociação de imóveis por parte dos corretores, através de uma solução sistematizada e eficiente.</p>
                <p>Identificamos o principal desafio do setor: a falta de uma conexão clara e imediata entre a oferta e a demanda, que resulta em processos manuais e ineficiência, fazendo com que profissionais percam tempo valioso.</p>
            </div>
        </div>
    </section>

    <section className="values-section">
        <div className="container text-center">
            <h2>Nossos Pilares</h2>
            <p>Guiados por nossa missão, a HomeSync foca especificamente nas necessidades dos corretores e imobiliárias de pequeno a médio porte. Nossa plataforma entrega uma proposta de valor única, baseada em praticidade e eficiência.</p>
            <div className="values-grid">
                <div className="value-card">
                    <i className="fas fa-bullseye"></i>
                    <h3>Missão</h3>
                    <p>Otimizar o processo de negociação de imóveis para corretores e imobiliárias, fornecendo uma plataforma inteligente e sistematizada que utiliza Inteligência Artificial para conectar de forma eficiente a oferta e a demanda, gerando maior sucesso e transparência no setor.</p>
                </div>
                <div className="value-card">
                    <i className="fas fa-eye"></i>
                    <h3>Visão</h3>
                    <p>Evoluir para um ecossistema completo a longo prazo, nosso compromisso é ser a ferramenta indispensável para o crescimento de carreira e lucro de corretores e imobiliárias, garantindo uma solução atrativa, dinâmica e anti-obsolescência através do uso de tecnologias robustas.</p>
                </div>
                <div className="value-card">
                    <i className="fas fa-hands-helping"></i>
                    <h3>Valores</h3>
                    <p>Os valores da HomeSync se fundamentam na Inovação e Tecnologia, utilizando soluções dinâmicas para garantir uma plataforma de ponta em constante evolução. Priorizamos a Eficiência e Praticidade ao centralizar dados, permitindo que corretores encontrem o imóvel ideal de forma rápida e precisa. Por fim, defendemos a Conexão e Transparência, promovendo relações claras e diretas entre corretores, clientes e imóveis em todas as etapas da negociação.</p>
                </div>
            </div>
        </div>
    </section>

   
    </>
  )
}

export default sobre
