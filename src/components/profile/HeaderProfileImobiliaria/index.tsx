"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import imgFundo from '../../../../public/fundoHeaderImobiliaria.png'

interface HeaderProfileProps {
  description: string;
  imageUrl: string;
}

export default function HeaderProfile({ description, imageUrl }: HeaderProfileProps) {

  const params = useParams()
  const name = params.id

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        backgroundImage: `url(${imgFundo.src})`,
        
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        width: "100%",
        height: "250px"
      }}
    >
      <Image
        src={imageUrl}
        alt={typeof name === "string" ? name : "Profile image"}
        width={160}
        height={160}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid white",
          marginLeft: "40px"
        }}
      />
      <div>
        <h2 style={{ fontSize: "50px", fontWeight: "bold", color: "#004EFF" }}>{name}</h2>
        <p style={{ fontSize: "24px", color: "#004EFF" }}>{description}</p>
      </div>
    </div>
  );
}


