"use client";
function Cabecalho() {
  return (
    <header
      style={{
        position: "fixed", // fica fixo no topo
        top: 0,
        left: 0,
        width: "100%",
        background: "white",
        borderBottom: "1px solid #eee",
        fontFamily: "DM Sans, sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
        zIndex: 9999, // garante que fique acima de tudo
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // sombra para destacar
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <img
            src="/home-sync.png"
            alt="HOME SYNC"
            style={{
              height: "clamp(100px, 10vh, 130px)",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 1.5vw, 15px)",
            flexShrink: 0,
            position: "absolute",
            right: 0,
            marginRight: "6rem",
          }}
        >
          <a
            href={`/login`}
            style={{
              color: "#0072ff",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Login
          </a>
          <button
            style={{
              border: "2px solid #0072ff",
              background: "white",
              color: "#0072ff",
              borderRadius: "20px",
              padding: "clamp(6px, 1vw, 8px) clamp(12px, 1.5vw, 16px)",
              fontWeight: "600",
              fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "#0072ff";
              target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = "white";
              target.style.color = "#0072ff";
            }}
            onClick={() => (window.location.href = `/chat`)}
          >
            Experimente Grátis
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
