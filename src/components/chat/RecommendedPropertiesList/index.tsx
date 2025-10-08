import React from 'react';

interface Imovel {
  id: number;
  nome: string;
  descricao: string;
  imageUrl: string;
}

interface PropertyItemProps {
  imovel: Imovel;
}

const PropertyItem: React.FC<PropertyItemProps> = ({ imovel }) => {
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  };

  const imageContainerStyle: React.CSSProperties = {
    marginRight: '10px',
    flexShrink: '0',
  };

  const imageStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fff',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
  };

  const detailsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    textAlign: 'left',
  };

  const nameStyle: React.CSSProperties = {
    marginTop: '0',
    marginBottom: '3px',
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#0c0c0c',
  };

  const descriptionStyle: React.CSSProperties = {
    marginTop: '0',
    marginBottom: '6px',
    fontSize: '0.8em',
    color: '#949494',
    lineHeight: '1.2',
  };

  const linkStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: '#2d6df6',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '0.9em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-start',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  };

  return (
    <div style={itemStyle}>
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={imovel.imageUrl} alt={imovel.nome} />
      </div>
      <div style={detailsStyle}>
        <h3 style={nameStyle}>{imovel.nome}</h3>
        <p style={descriptionStyle}>{imovel.descricao}</p>
        <a style={linkStyle} href={`/imovel/${imovel.id}`} rel="noopener noreferrer">
          Ver mais
        </a>
      </div>
    </div>
  );
};

interface RecommendedPropertiesListProps {
  introMessage?: string;
  imoveis: Imovel[];
}

const RecommendedPropertiesList: React.FC<RecommendedPropertiesListProps> = ({ introMessage, imoveis }) => {
  const listContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const introMessageStyle: React.CSSProperties = {
    fontSize: '0.95em',
    color: '#0c0c0c',
    marginBottom: '10px',
    fontWeight: '500',
  };

  return (
    <>
      {introMessage && <p style={introMessageStyle}>{introMessage}</p>}
      <div style={listContainerStyle}>
        {imoveis.map(imovel => (
          <PropertyItem key={imovel.id} imovel={imovel} />
        ))}
      </div>
    </>
  );
};

export default RecommendedPropertiesList;