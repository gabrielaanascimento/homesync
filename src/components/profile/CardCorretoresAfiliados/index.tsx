
import Image from 'next/image';

const affiliatedBrokers = [
  { id: 1, name: 'Broker 1', imageUrl: '/perfil.jpg' },
  { id: 2, name: 'Broker 2', imageUrl: '/perfil.jpg' },
  { id: 3, name: 'Broker 3', imageUrl: '/perfil.jpg' },
  { id: 4, name: 'Broker 4', imageUrl: '/perfil.jpg' },
];

export default function CardAffiliated() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', width: "50%" }}>
      <div 
        style={{
          backgroundColor: '#fff',
          borderRadius: '40px', 
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          padding: '1.5rem', 
          width: '100%',
        }}
      >
        <h2 
          style={{
            textAlign: 'center',
            color: '#2563eb', 
            fontWeight: 'bold',
            fontSize: '2rem', 
            marginBottom: '1rem',
          }}
        >
          Corretores Afiliados
        </h2>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem', 
          }}
        >
          {affiliatedBrokers.slice(0, 4).map((broker) => (
            <div 
              key={broker.id} 
              style={{
                position: 'relative',
                width: '4rem', 
                height: '4rem', 
                borderRadius: '9999px', 
                overflow: 'hidden',
              }}
            >
              <Image
                src={broker.imageUrl}
                alt={broker.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '9999px',
              backgroundColor: '#2563eb',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '0.875rem', // text-sm
            }}
          >
            +50
          </div>
        </div>
      </div>
    </div>
  );
}