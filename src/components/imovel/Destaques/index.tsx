// Next-main/src/components/imovel/Destaques/index.tsx
import "./index.css";

interface DestaquesProps {
    highlights: string;
}

function Destaques({ highlights }: DestaquesProps) {
    const highlightList = highlights.split('\n').filter(h => h.trim() !== '');

  return (
    <div className="Destaques-container">
      <center>
        <h2>Destaques do Imóvel</h2>
      </center>

      <ul>
        {highlightList.length > 0 ? (
            highlightList.map((highlight, index) => (
                <li key={index}>{highlight}</li>
            ))
        ) : (
            <li>Nenhum destaque especial fornecido.</li>
        )}
      </ul>
    </div>
  );
}
export default Destaques;