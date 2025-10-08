"use client"
import React from 'react'
import logo from '@/img/logoLogin.png'

export default function CadastroCorretor () {

    return (
        <div style={{ 
            width: '100vw', 
            height: '100vh', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundImage: 'linear-gradient(to bottom, #fff, #fff, #fff, rgba(153, 184, 254, 0.5))',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Roboto", sans-serif',
            margin: 0,
            padding: 0
        }}>
            <div style={{
                width: '35%',
                height: '65%',
                borderRadius: '10%',
                zIndex: 997,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '3px',
                backgroundImage: 'linear-gradient(to bottom, #99B8FE, #DBA1FC)',
            }}>
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderRadius: '10%',
                    backdropFilter: '2px',
                    backgroundColor: 'rgb(255, 255, 255)',
                    zIndex: 998,
                    position: 'relative'
                }}>

                    <h1 style={{
                        color: "#004EFF"
                    }}>Qual seu perfil?</h1>
                    
                    <button type="submit" id="entrar" style={{
                        padding: '10px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#004EFF',
                        width: '70%',
                        color: '#fff',
                        margin: '1rem',
                        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
                        cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = '/cadastro/corretor'}
                    >Corretor</button>

                    <button type="submit" id="entrar" style={{
                        padding: '10px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#004EFF',
                        width: '70%',
                        color: '#fff',
                        margin: '1rem',
                        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
                        cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = '/cadastro/imobiliaria'}
                    >Imobiliária</button>

                    <button type="submit" id="entrar" style={{
                        padding: '10px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#004EFF',
                        width: '70%',
                        color: '#fff',
                        margin: '1rem',
                        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
                        cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = '/cadastro/construtora'}
                    >Construtora</button>

                    <a onClick={() => window.history.back()} style={{
                        color: '#004EFF',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginTop: '2rem'
                    }}>Voltar</a>
                </div>
            </div>
            <footer>
            </footer>
        </div>
    )
}