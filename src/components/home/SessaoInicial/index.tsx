"use client";
import { useState } from "react";
import "./index.css"; // A importação do CSS permanece correta para arquivos globais.

function SessaoInicial() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Injete as variáveis CSS com o objeto de estilo do React.
  // Use as chaves de string para propriedades não padronizadas (as variáveis CSS).
  const sectionStyle = {
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
  } as React.CSSProperties; // Coerção de tipo única e mais segura para estilos.

  return (
    <section
      className="sessao-inicial"
      onMouseMove={handleMouseMove}
      style={sectionStyle} // Aplicação do objeto de estilo
    >
      {/* O restante do código HTML é o mesmo */}
      <div className="degrade-azul"></div>

      <div className="grid-logos-fundo">
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-principal"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />

        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
        <img
          src="/logo hs 01.png"
          alt="HS"
          className="logo-fundo logo-invertida"
        />
      </div>

      <div className="curva-branca"></div>

      <div className="texto-principal-container">
        <h1 className="titulo-principal">
          Conectando <br />
          Construtoras aos <br />
          Melhores Corretores
        </h1>
      </div>
    </section>
  );
}

export default SessaoInicial;
