import React from 'react';
import HeaderProfile from '../HeaderProfileCorretor';
import Features from '../Features';
import Rating from '../Rating';
import SalesCard from '../SalesCard';
import ConversionChart from '../ConversionChart';

interface ProfilePageProps {
  name: string;
  title: string;
  photo: string;
  bio: string;
  contacts: { type: string; label: string; value: string; link: string }[];
  experiences: string[];
  gallery: string[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  title,
  photo,
  bio,
  contacts,
  experiences,
  gallery,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <HeaderProfile 
        imageUrl={photo}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Features features={experiences} />
          <Rating stars={5} totalReviews={125} score={4.8} />
        </div>
        
        <div className="space-y-8">
          <SalesCard
            monthlySales={6}
            annualSales={57}
          />
          <ConversionChart />
        </div>

        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Contatos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-600">{contact.label}:</span>
                <span className="ml-2 text-blue-600">{contact.value}</span>
              </a>
            ))}
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold mb-4">Galeria de Imóveis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((image, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Imóvel ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;