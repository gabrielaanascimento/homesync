type FeatureItem = string;

interface PropsFeatures {
  features: FeatureItem[]
}

export default function Features({features}: PropsFeatures) {

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "40px",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{color: "#004EFF", fontWeight: 600, marginBottom: "20px", fontSize: "30px", textAlign: "center" }}>Características</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
      <ul style={{ paddingLeft: "50px", color: "#374151", fontSize: "20px", display: "flex", flexDirection: "column", }}>
        {features.map((item: FeatureItem, i: number) => (
          <li key={i} style={{ marginBottom: "4px", fontWeight: 500, listStyle: 'initial' }}>{item}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}
