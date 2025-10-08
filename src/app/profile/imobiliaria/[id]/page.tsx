import HeaderProfile from "@/components/profile/HeaderProfileImobiliaria";
import Rating from "@/components/profile/Rating";
import SalesStats from "@/components/profile/SalesCard";
import CardAffiliated from "@/components/profile/CardCorretoresAfiliados";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Products } from "@/components/produtos/products";
import imgCasa from '@/img/casa.jpg'


export default async function Home() {

  const products = [
    {
      image: "/img/casa.jpg",
      name: "Nome do Imóvel",
      address: "Endereço do Imóvel",
      rooms: "3 quartos",
      area: 120 // Adicione a propriedade 'area' aqui
    }
  ]

  const session = await getServerSession

  if(!session) {
    redirect("/login")
  } 

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingBottom: "40px",
        background: "linear-gradient(to bottom, white, #f3e8ff)"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          paddingBottom: "40px",
        }}
      >
        <HeaderProfile
          description="Especialista em vendas, lançamentos e estratégias digitais."
          imageUrl="/semImagem.jpg"
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", paddingLeft: '70px', paddingRight: "70px", height: "200px" }}>
          <Rating stars={4} totalReviews={50000} score={4.25} />
          <SalesStats monthlySales={75} annualSales={900} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: '70px', paddingRight: "70px", width: "100vw" }}>
          <CardAffiliated />
        </div>
        <Products title="Principais Lançamentos" properties={products} />
      </div>
    </main>
  );
}