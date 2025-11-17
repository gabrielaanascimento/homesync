// src/app/cadastro/construtora/page.tsx
"use client"
import React, { useState } from 'react';
import logo from '@/img/logoLogin.png';
import { registerUser } from '@/services/cadastro';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function CadastroConstrutora() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploading(true);
            setError(null);
            
            const formData = new FormData();
            formData.append('photo', file);
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';

            try {
                const response = await fetch(`${API_BASE_URL}/upload-photo`, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                
                if (!response.ok) {
                   // Se não for OK, 'result' é o objeto de erro { message: "..." }
                   throw new Error(result.message || 'Falha no upload');
                }
                
                // --- CORREÇÃO AQUI ---
                // A API retorna a URL diretamente no 'result.url'
                setPhotoUrl(result.url); 

            } catch (err: any) {
                setError(err.message || "Falha ao enviar logo.");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            setIsLoading(false);
            return;
        }

        const commonData = {
            email: formData.get('email') as string,
            senha: password,
            nome_exibicao: formData.get('name') as string, // Nome Fantasia
            celular: (formData.get('telefone') as string).replace(/\D/g, ''),
        };

        const specificData = {
            razao_social: formData.get('razao_social') as string,
            cnpj: (formData.get('cnpj') as string).replace(/\D/g, ''),
            inscricao_estadual: formData.get('inscricao_estadual') as string,
            endereco_comercial: formData.get('endereco') as string,
            foto_logo: photoUrl // Adiciona a URL da logo
        };
        
        const response = await registerUser('construtora', commonData, specificData);

        setIsLoading(false);
        if (response.success) {
            alert(response.message + "\nAgora, faça o login.");
            router.push('/login');
        } else {
            setError(response.message);
        }
    }

    return (
        <div style={{ ...styles.pageContainer }}>
            <div style={{ ...styles.gradientContainer }}>
                <form onSubmit={handleRegister} style={{ ...styles.formContainer }}>
                    <img src={logo.src} alt="logo" style={{ ...styles.logo }} />
                    <h2 style={{ color: '#004EFF', fontWeight: 'bold' }}>Cadastro de Construtora</h2>
                    
                    {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    
                    <div style={styles.photoUpload}>
                        <img src={photoUrl || "/semImagem.jpg"} alt="Logo Preview" style={styles.photoPreview} />
                        <label htmlFor="photo-upload" style={styles.photoLabel}>
                            {uploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }}/> : "Escolher Logo"}
                        </label>
                        <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} disabled={uploading}/>
                    </div>

                    <div style={{ ...styles.grid, gridTemplateColumns: '1fr' }}>
                        <input type="text" name="name" placeholder="Nome Fantasia" style={{ ...styles.inputField }} required />
                        <input type="text" name="razao_social" placeholder="Razão Social" style={{ ...styles.inputField, marginTop: '10px' }} required />
                    </div>

                    <div style={{ ...styles.grid, marginTop: '1rem' }}>
                        <input type="text" name="cnpj" placeholder="CNPJ" style={{ ...styles.inputField }} required />
                        <input type="text" name="inscricao_estadual" placeholder="Inscrição Estadual (Opcional)" style={{...styles.inputField}} />
                        <input type="tel" name="telefone" placeholder="Telefone Comercial" style={{ ...styles.inputField }} required />
                        <input type="email" name="email" placeholder="Email" style={{ ...styles.inputField }} required />
                        <input type="password" name="password" placeholder="Senha" style={{ ...styles.inputField }} required />
                        <input type="password" name="confirmPassword" placeholder="Confirmar Senha" style={{ ...styles.inputField }} required />
                    </div>
                    
                    <input type="text" name="endereco" placeholder="Endereço Comercial (Opcional)" style={{ ...styles.inputField, ...styles.fullWidth, marginTop: '1rem' }} />

                    <button type="submit" id="entrar" style={{ ...styles.button, opacity: (isLoading || uploading) ? 0.7 : 1 }} disabled={isLoading || uploading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>

                    <a onClick={() => router.back()} style={{ ...styles.link }}>Voltar</a>
                </form>
            </div>
        </div>
    )
}

// Estilos (Reutilizados)
const styles: { [key: string]: React.CSSProperties } = {
    // (Mesmos estilos da página de Imobiliária)
    pageContainer: {
        width: '100vw',
        minHeight: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #fff, #fff, #fff, rgba(153, 184, 254, 0.5))',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Roboto", sans-serif',
        margin: 0,
        padding: '2rem 0'
    },
    gradientContainer: {
        width: '40%',
        maxWidth: '700px',
        minWidth: '320px',
        borderRadius: '20px',
        zIndex: 997,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '3px',
        backgroundImage: 'linear-gradient(to bottom, #99B8FE, #DBA1FC)',
    },
    formContainer: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: '18px',
        backgroundColor: 'rgb(255, 255, 255)',
        zIndex: 998,
        position: 'relative',
        paddingTop: '60px'
    },
    logo: {
        width: '100px',
        zIndex: 999,
        position: 'absolute',
        top: 0,
        transform: 'translateY(-65%)'
    },
    inputField: {
        width: '100%',
        height: '3rem',
        borderRadius: '20px',
        border: '1px solid #99B8FE',
        padding: '2.5px 15px',
        color: 'black',
        boxSizing: 'border-box'
    },
    fullWidth: {
        width: '90%',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        gap: '10px'
    },
    button: {
        padding: '10px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#004EFF',
        width: '70%',
        color: '#fff',
        margin: '1.5rem 0 1rem 0',
        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        opacity: 1
    },
    link: {
        color: '#004EFF',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    photoUpload: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1rem',
    },
    photoPreview: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #99B8FE',
    },
    photoLabel: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }
};