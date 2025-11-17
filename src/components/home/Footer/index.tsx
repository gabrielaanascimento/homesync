import { Mail } from 'lucide-react';

export default function RodaPe() {

  const subject = encodeURIComponent("Interesse em Imóveis HomeSync");
    const body = encodeURIComponent("Olá, gostaria de obter mais informações sobre os imóveis disponíveis na HomeSync.");
    const mailtoLink = `mailto:homesync.site@gmail.com?subject=${subject}&body=${body}`;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Logo centralizada no topo */}
        <div style={styles.logoSection}>
          <img
            src="./home-sync.png"
            alt="HomeSync Logo"
            style={styles.logo}
          />
        </div>

        {/* Colunas de links */}
        <div style={styles.columnsContainer}>
          <div style={styles.column}>
            <h3 style={styles.title}>HomeSync</h3>
            <a href="/sobre" style={styles.link}>
              Sobre Nós
            </a>
            
            
          </div>

          <div style={styles.column}>
            <h3 style={styles.title}>Clientes</h3>
            <a href="/cadastro/corretor" style={styles.link}>
              Para Corretores
            </a>
            <a href="/cadastro/imobiliaria" style={styles.link}>
              Para Imobiliárias
            </a>
            <a href="/cadastro/construtora" style={styles.link}>
              Para Construtoras
            </a>
            <a href="/cadastro" style={styles.link}>
              Cadastre-se Grátis
            </a>
          </div>

          <div style={styles.column}>
            <h3 style={styles.title}>Institucional</h3>
          
            <a href="/politicas" style={styles.link}>
              Politica de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div style={styles.bottom}>
        <p style={styles.copy}>
          © 2025 HomeSync. Todos os direitos reservados.
        </p>
        <div style={styles.social}>
          
          <a href={mailtoLink}>
            <Mail size={40} color="#004EFF" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61584107721008">
            <img src="./face.png" alt="Facebook" width="40" />
          </a>
          <a href="https://www.instagram.com/homessync.site?igsh=M2c2cGt6bXJ4bHlo">
            <img src="./insta.png" alt="Instagram" width="40" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#fff",
    color: "#000",
    padding: "20px 20px",
    fontFamily: "DM Sans, sans-serif",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
  } as React.CSSProperties,
  container: {
    marginBottom: "15px",
  } as React.CSSProperties,
  logoSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
  } as React.CSSProperties,
  logo: {
    width: "160px",
  } as React.CSSProperties,
  columnsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "25px",
  } as React.CSSProperties,
  column: {
    display: "flex",
    flexDirection: "column" as React.CSSProperties["flexDirection"],
    alignItems: "center",
    textAlign: "center",
  } as React.CSSProperties,
  title: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
  } as React.CSSProperties,
  link: {
    color: "#004EFF",
    textDecoration: "none",
    marginBottom: "6px",
    fontSize: "16px",
  } as React.CSSProperties,
  bottom: {
    borderTop: "2px solid rgba(0, 17, 255, 0.2)",
    paddingTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as React.CSSProperties["flexWrap"],
  } as React.CSSProperties,
  copy: {
    fontSize: "13px",
  } as React.CSSProperties,
  social: {
    display: "flex",
    gap: "12px",
  } as React.CSSProperties,
};
