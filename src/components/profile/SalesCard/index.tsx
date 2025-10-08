interface SalesCardProps {
  monthlySales: number;
  annualSales: number;
}

const cardStyle: React.CSSProperties = {
  padding: "16px",
  borderRadius: "40px",
  backgroundColor: "white",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center"
};

const titleStyle: React.CSSProperties = {
  color: "#004EFF", 
  fontWeight: 600, 
  marginBottom: "1px", 
  fontSize: "30px", 
  textAlign: "center"
};

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '1rem',
};

const valueStyle: React.CSSProperties = {
  fontSize: '2.25rem',
  fontWeight: '700',
  color: '#1f2937',
};

const monthValueStyle: React.CSSProperties = {
  ...valueStyle,
};

const yearValueStyle: React.CSSProperties = {
  ...valueStyle,
  color: '#3b82f6',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#6b7280',
};

const separatorStyle: React.CSSProperties = {
  borderRight: '1px solid #d1d5db',
  height: '2.5rem',
};

const SalesCard: React.FC<SalesCardProps> = ({ monthlySales, annualSales }) => {
  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Média de Vendas</h2>
      <div style={contentStyle}>
        <div>
          <span style={monthValueStyle}>{monthlySales}</span>
          <p style={labelStyle}>Mês</p>
        </div>
        <div style={separatorStyle}></div>
        <div>
          <span style={yearValueStyle}>{annualSales}</span>
          <p style={labelStyle}>Ano</p>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;