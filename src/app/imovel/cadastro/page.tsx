// src/app/imovel/cadastro/page.tsx
"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { registerProperty } from '@/services/property-registration'; 
import logo from '@/img/logoLogin.png';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react'; 

const TIPO_IMOVEL_OPTIONS = ['Apartamento', 'Casa', 'Terreno', 'SalaComercial'];

export default function CadastroImovel() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (status === "loading") {
        return <div style={styles.loadingContainer}><Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" /> <p>Carregando sessão...</p></div>;
    }

    if (status === "unauthenticated" || !session?.user?.id) {
        router.push('/login');
        return null;
    }
    
    // Pega o ID e o Token da sessão
    const corretorId = parseInt(session.user.id);
    const authToken = session.user.token; // Pega o token da API
    
    // Mock de ID do Vendedor
    const clienteVendedorIdMock = 1; 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const images = fileInputRef.current?.files || null;
        
        // ... (validação de dados inalterada) ...
        const valorRaw = (formData.get('valor') as string).replace(/[R$,.]/g, '').replace(',', '.');
        const quartosRaw = formData.get('quartos') as string;
        const areaRaw = formData.get('area') as string;
        
        if (!formData.get('nome') || !valorRaw || !formData.get('local') || !quartosRaw || !areaRaw || 
            !formData.get('tipo_imovel') || !formData.get('endereco') || !formData.get('descricao') || !formData.get('destaques')) {
            setError('Preencha todos os campos obrigatórios.');
            setIsLoading(false);
            return;
        }

        const propertyData = {
            nome: formData.get('nome') as string,
            valor: parseFloat(valorRaw),
            local: formData.get('local') as string,
            quartos: parseInt(quartosRaw),
            area: parseInt(areaRaw),
            tipo_imovel: formData.get('tipo_imovel') as 'Casa' | 'Apartamento' | 'Terreno' | 'SalaComercial',
            endereco: formData.get('endereco') as string,
            descricao: formData.get('descricao') as string,
            destaques: formData.get('destaques') as string,
            status: 'Disponível' as 'Disponível',
            corretor_id: corretorId,
            cliente_vendedor_id: clienteVendedorIdMock, 
        };

        if (isNaN(propertyData.valor) || isNaN(propertyData.quartos) || isNaN(propertyData.area)) {
             setError('Valores numéricos (Valor, Quartos, Área) são inválidos.');
             setIsLoading(false);
             return;
        }

        // 2. Envio ao serviço (PASSANDO O TOKEN)
        const result = await registerProperty(propertyData, images, authToken);

        if (result.success) {
            alert(result.message);
            router.push('/produtos'); 
        } else {
            setError(result.message);
        }

        setIsLoading(false);
    };

    return (
        // ... (JSX do formulário inalterado) ...
        <div style={styles.pageContainer}>
             <div style={styles.gradientContainer}>
                 <form onSubmit={handleSubmit} style={styles.formContainer}>
                     <img src={logo.src} alt="logo" style={styles.logo} />
                     <h1 style={styles.title}>Cadastro de Imóvel</h1>

                     {error && <p style={styles.errorText}>{error}</p>}

                     {/* GRUPO DE INPUTS: Linha 1 */}
                     <div style={styles.inputGrid}>
                         <input type="text" name="nome" placeholder="Título/Nome do Imóvel" style={styles.inputField} required />
                         <input type="text" name="endereco" placeholder="Endereço Completo" style={styles.inputField} required />
                         <input type="text" name="local" placeholder="Localidade (Ex: Mogi das Cruzes)" style={styles.inputField} required />
                         <select name="tipo_imovel" style={styles.inputField} required defaultValue="">
                             <option value="" disabled>Tipo de Imóvel</option>
                             {TIPO_IMOVEL_OPTIONS.map(tipo => (
                                 <option key={tipo} value={tipo}>{tipo}</option>
                             ))}
                         </select>
                     </div>

                     {/* GRUPO DE INPUTS: Linha 2 (Valores/Números) */}
                     <div style={styles.inputGrid}>
                         <input type="number" name="valor" step="1000" min="0" placeholder="Valor (R$)" style={styles.inputField} required />
                         <input type="number" name="quartos" step="1" min="1" placeholder="Nº de Quartos" style={styles.inputField} required />
                         <input type="number" name="area" step="1" min="1" placeholder="Área Total (m²)" style={styles.inputField} required />
                         <label style={{...styles.inputField, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#f0f0f0'}}>
                             Imagens (Max 10)
                             <input type="file" ref={fileInputRef} name="images" accept="image/*" multiple max={10} style={{ display: 'none' }} />
                         </label>
                     </div>

                     {/* TEXT AREAS */}
                     <textarea name="descricao" placeholder="Descrição Detalhada do Imóvel" style={{ ...styles.textareaField, height: '80px' }} required />
                     <textarea name="destaques" placeholder="Destaques (Um por linha, ex: Piscina, Área Gourmet)" style={{ ...styles.textareaField, height: '80px' }} required />
                    
                     <button type="submit" id="entrar" disabled={isLoading} style={{
                         ...styles.button,
                         backgroundImage: isLoading ? 'linear-gradient(to right, #6B7280, #9CA3AF)' : 'linear-gradient(to right, #004EFF, #99B8FE)',
                         cursor: isLoading ? 'wait' : 'pointer'
                     }}>
                         {isLoading ? (
                             <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={24} color="#fff" />
                         ) : (
                             "Cadastrar Imóvel"
                         )}
                     </button>

                     <a onClick={() => router.push('/produtos')} style={{
                         color: '#004EFF',
                         textDecoration: 'underline',
                         cursor: 'pointer',
                         marginTop: '1rem'
                     }}>Cancelar e Voltar</a>
                 </form>
             </div>
         </div>
    )
}

// ... (Estilos inalterados) ...
const styles: { [key: string]: React.CSSProperties } = {
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
        padding: '20px 0',
    },
    gradientContainer: {
        width: '90%',
        maxWidth: '800px',
        borderRadius: '20px',
        zIndex: 997,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: '3px',
        backgroundImage: 'linear-gradient(to bottom, #99B8FE, #DBA1FC)',
        margin: '20px 0'
    },
    formContainer: {
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: '18px', 
        backgroundColor: 'rgb(255, 255, 255)',
        zIndex: 998,
        position: 'relative'
    },
    logo: {
        width: '100px',
        zIndex: 999,
        position: 'absolute',
        top: 0,
        transform: 'translateY(-65%)'
    },
    title: {
        color: "#004EFF",
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '2rem'
    },
    inputGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        width: '95%',
        marginBottom: '1rem',
    },
    inputField: {
        height: '40px',
        borderRadius: '20px',
        border: '1px solid #99B8FE',
        padding: '2.5px 15px',
        color: 'black',
        fontSize: '14px',
        boxSizing: 'border-box' as 'border-box',
        backgroundColor: '#fff'
    },
    textareaField: {
        width: '95%',
        minHeight: '60px',
        borderRadius: '20px',
        border: '1px solid #99B8FE',
        padding: '10px 15px',
        color: 'black',
        fontSize: '14px',
        marginBottom: '1rem',
        boxSizing: 'border-box' as 'border-box',
    },
    button: {
        padding: '12px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#004EFF',
        width: '95%',
        maxWidth: '300px',
        color: '#fff',
        margin: '1rem 0 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        transition: 'transform 0.3s ease, background-image 0.3s ease',
    },
    errorText: {
        color: '#EF4444',
        marginBottom: '1rem',
        fontWeight: 'bold',
        textAlign: 'center' as 'center',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#004EFF',
        animation: 'fadeIn 0.5s',
    }
};