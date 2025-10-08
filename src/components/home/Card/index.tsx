/* eslint-disable react/prop-types */

interface CardProps {
  titulo: string;
  texto: string;
  icone?: any;
  tipo: any;
}

function Card({ titulo, texto, icone, tipo }: CardProps) {
  // Função para renderizar o ícone baseado no tipo
  const renderizarIcone = () => {
    if (icone) return icone;

    switch (tipo) {
      case "construtoras":
        return (
          <img
            src="./icon-construtor.png"
            alt="Construtoras"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      case "imobiliarias":
        return (
          <img
            src="./icon-imob.png"
            alt="Imobiliárias"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      case "corretores":
        return (
          <img
            src="./icon-corretor.png"
            alt="Corretores"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      case "funcionalidade1":
        return (
          <img
            src="./icon-inteligente.png"
            alt="Inteligente"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      case "funcionalidade2":
        return (
          <img
            src="./icon-portifolio.png"
            alt="Portfólio"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      case "funcionalidade3":
        return (
          <img
            src="./icon-organize.png"
            alt="Organizar"
            style={{
              width: "45px",
              height: "45px",
              position: "absolute",
              top: "20px",
              left: "20px",
              objectFit: "contain",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="card" style={{ position: "relative", margin: "1rem" }}>
      <br />
      <br />
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

export default Card;
