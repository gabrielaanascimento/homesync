// Next-main/src/components/imovel/Caracteristicas/index.tsx
import "./index.css";

interface CaracteristicasProps {
    features: string[];
}

function Caracteristicas({ features }: CaracteristicasProps) {
  return (
    <div className="caracteristicas-container">
      <center>
        <h2>Características do Imóvel</h2>
      </center>

      <ul>
        {features.length > 0 ? (
            features.map((feature, index) => (
                <li key={index}>
                    {feature}
                </li>
            ))
        ) : (
             <li>Nenhuma característica detalhada fornecida.</li>
        )}
      </ul>
    </div>
  );
}
export default Caracteristicas;