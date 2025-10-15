interface RatingProps {
  stars: number;
  totalReviews: number;
  score: number;
}

export default function Rating({ stars, totalReviews, score }: RatingProps) {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "40px",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{color: "#004EFF", fontWeight: 600, marginBottom: "20px", fontSize: "30px", textAlign: "center" }}>Avaliação</h3>
      <div style={{ display: "flex", justifyContent: "center", fontWeight: 700, gap: "35px", fontSize: "60px",  }}>
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < stars ? <span style={{ color: "#3B82F6" }}> ★ </span> : <span style={{color: "rgb(151, 151, 151)"}}>★</span>}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 40, fontSize: "20px" }}>
      <p style={{ fontSize: "15px", color: "#6B7280" }}>
        {totalReviews.toLocaleString()} Pessoas Avaliaram
      </p>
      <p style={{ fontSize: "14px", fontWeight: 600 }}>Nota: {score}/5</p>
      </div>
    </div>
  );
}
