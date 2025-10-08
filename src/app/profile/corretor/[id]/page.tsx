"use client";

import { useState, useEffect } from "react";
import HeaderProfile from "@/components/profile/HeaderProfileCorretor";
import Rating from "@/components/profile/Rating";
import SalesStats from "@/components/profile/SalesCard";
import ConversionChart from "@/components/profile/ConversionChart";
import Features from "@/components/profile/Features";
import { useSession } from "next-auth/react";

export default function Home() {
    const { status } = useSession();

    const features = [
        "Especializado em Lançamentos",
        "Certificado e atualizado",
        "Estrategista de vendas",
        "Networking qualificado"
    ];

    if (status === "loading") {
        return <p>Carregando sessão...</p>;
    }

    if (status === "unauthenticated") {
        window.location.href = '/login';
        return null; // Retorna null para evitar que o componente renderize antes do redirecionamento
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                height: "100%",
                paddingBottom: "40px",
                background: "linear-gradient(to bottom, white, #f3e8ff)"
            }}
        >
            <div
                style={{
                    maxWidth: "960vw",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                }}
            >
                <HeaderProfile
                    description="Especialista em vendas, lançamentos e estratégias digitais."
                    imageUrl="/perfil.jpg"
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", paddingLeft: '70px', paddingRight: "70px", height: "200px" }}>
                    <Rating stars={3} totalReviews={50000} score={4.25} />
                    <SalesStats monthlySales={75} annualSales={900} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", paddingLeft: '70px', paddingRight: "70px" }}>
                    <ConversionChart />
                    <Features features={features} />
                </div>
            </div>
        </main>
    );
}