// src/components/profile/Comentarios/index.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Avaliacao, getComentariosByPerfil, postComentario } from '@/services/comentariosService';
import { Loader2, Star } from 'lucide-react';

interface ComentariosProps {
  perfilId: string;
}

const Comentarios: React.FC<ComentariosProps> = ({ perfilId }) => {
    const { data: session } = useSession();
    const [comentarios, setComentarios] = useState<Avaliacao[]>([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [rating, setRating] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(true);

    useEffect(() => {
        const fetchComentarios = async () => {
            setLoadingList(true);
            const data = await getComentariosByPerfil(perfilId);
            setComentarios(data);
            setLoadingList(false);
        };
        if (perfilId) {
            fetchComentarios();
        }
    }, [perfilId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!session?.user?.token) {
            alert("Você precisa estar logado para enviar uma avaliação.");
            return;
        }

        setIsLoading(true);
        
        const data = {
            corpo: novoComentario,
            estrelas: rating,
            autor_nome: session.user.name || "Usuário",
            autor_username: session.user.email,
            autor_imagem: session.user.image || `https://avatar.vercel.sh/${session.user.name}`
        };

        const result = await postComentario(perfilId, data, session.user.token);

        if (result.success && result.data) {
            setComentarios([result.data, ...comentarios]);
            setNovoComentario("");
            setRating(5);
        } else {
            alert(result.message || "Erro ao enviar avaliação.");
        }
        setIsLoading(false);
    };

    return (
        <div style={styles.comentariosContainer}>
            <h3 style={styles.comentariosTitle}>Avaliações e Comentários</h3>
            
            {session?.user && (
                <form onSubmit={handleSubmit} style={styles.formComentario}>
                    <textarea 
                        value={novoComentario}
                        onChange={(e) => setNovoComentario(e.target.value)}
                        placeholder="Deixe sua avaliação sobre este perfil..."
                        style={styles.textareaComentario}
                        required
                    />
                    <div style={styles.formActions}>
                        <div style={styles.ratingStars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star} 
                                    style={{ ...styles.star, color: star <= rating ? '#FFC107' : '#E0E0E0' }}
                                    fill={star <= rating ? '#FFC107' : '#E0E0E0'}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                        <button type="submit" style={{...styles.button, opacity: isLoading ? 0.7 : 1}} disabled={isLoading}>
                            {isLoading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : "Enviar Avaliação"}
                        </button>
                    </div>
                </form>
            )}
            {!session?.user && (
                 <p style={styles.loginMessage}>Você precisa estar <a href="/login" style={{color: '#004EFF'}}>logado</a> para deixar uma avaliação.</p>
            )}

            <div style={styles.listaComentarios}>
                {loadingList ? (
                    <div style={{display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', padding: '1rem'}}>
                         <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                         <p>Carregando avaliações...</p>
                    </div>
                ) : comentarios.length > 0 ? (
                    comentarios.map(c => (
                        <div key={c.id} style={styles.comentarioItem}>
                            <img 
                                src={c.autor_imagem || `https://avatar.vercel.sh/${c.autor_nome}`} 
                                alt={c.autor_nome} 
                                style={styles.comentarioAvatar} 
                            />
                            <div style={styles.comentarioConteudo}>
                                <div style={styles.comentarioHeader}>
                                    <strong>{c.autor_nome}</strong>
                                    <span style={{ color: '#FFC107', display: 'flex' }}>
                                        {Array.from({length: c.estrelas}).map((_, i) => <Star key={i} size={16} fill="#FFC107" color="#FFC107" />)}
                                        {Array.from({length: 5 - c.estrelas}).map((_, i) => <Star key={i} size={16} fill="#E0E0E0" color="#E0E0E0" />)}
                                    </span>
                                </div>
                                <p style={styles.comentarioCorpo}>{c.corpo}</p>
                                <span style={styles.comentarioData}>{new Date(c.data_criacao).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', padding: '1rem', color: '#555'}}>Este perfil ainda não possui avaliações.</p>
                )}
            </div>
        </div>
    );
};

// Estilos
const styles: { [key: string]: React.CSSProperties } = {
    comentariosContainer: {
        backgroundColor: 'white',
        borderRadius: '40px',
        padding: '24px',
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    },
    comentariosTitle: {
        color: "#004EFF",
        fontWeight: 600,
        marginBottom: "20px",
        fontSize: "30px",
        textAlign: "center"
    },
    formComentario: {
        marginBottom: '2rem',
    },
    textareaComentario: {
        width: '100%',
        minHeight: '80px',
        borderRadius: '20px',
        border: '1px solid #99B8FE',
        padding: '10px 15px',
        color: 'black',
        fontSize: '14px',
        boxSizing: 'border-box' as 'border-box',
        marginBottom: '10px',
        fontFamily: 'inherit'
    },
    formActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingStars: {
        display: 'flex',
        gap: '5px',
    },
    star: {
        fontSize: '24px',
        cursor: 'pointer',
        width: 24,
        height: 24
    },
    button: {
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        color: '#fff',
        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: 1
    },
    listaComentarios: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    comentarioItem: {
        display: 'flex',
        gap: '15px',
        borderBottom: '1px solid #F0F0F0',
        paddingBottom: '1rem',
    },
    comentarioAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    comentarioConteudo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '100%'
    },
    comentarioHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#333'
    },
    comentarioCorpo: {
        color: '#333',
        fontSize: '15px',
        lineHeight: '1.5',
        margin: 0
    },
    comentarioData: {
        fontSize: '12px',
        color: '#888',
        textAlign: 'right' as 'right'
    },
    loginMessage: {
        textAlign: 'center' as 'center',
        marginBottom: '2rem',
        color: '#555'
    }
};

export default Comentarios;