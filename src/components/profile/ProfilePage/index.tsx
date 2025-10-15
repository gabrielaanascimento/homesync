import React from 'react';

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
    <div>
      <h1>{name}</h1>
      <h2>{title}</h2>
      <img src={photo} alt={name} />
      <p>{bio}</p>
      {/* Add the rest of your component logic here */}
    </div>
  );
};

export default ProfilePage;