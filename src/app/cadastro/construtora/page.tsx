"use client"
import React from 'react'
import logo from '@/img/logoLogin.png'

export default function CadastroCorretor () {

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if(formData.get('password') !== formData.get('confirmPassword')) {
            alert("As senhas não coincidem!");
            return;
        }
    
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            cnpj: formData.get('cnpj'),
            telefone: formData.get('telefone'),
        }
    
    }

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
                width: '40%',
                height: '75%',
                borderRadius: '10%',
                zIndex: 997,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '3px',
                backgroundImage: 'linear-gradient(to bottom, #99B8FE, #DBA1FC)',
            }}>
                <form onSubmit={handleLogin} style={{
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
                    <img src={logo.src} alt="logo" style={{
                        width: '100px',
                        zIndex: 999,
                        position: 'absolute',
                        top: 0,
                        transform: 'translateY(-65%)'
                    }}/>
                    <input type="text" name="name" placeholder="Nome da Construtora" style={{
                        marginTop: '2rem',
                        width: '90%',
                        height: '3rem',
                        borderRadius: '20px',
                        border: '1px solid #99B8FE',
                        padding: '2.5px 0 2.5px 7px',
                        color: 'black'
                    }} required/>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '1rem',
                        width: '90%',
                        height: '50%',
                        gap: 3
                    }}>
                        <input type="text" name="cnpj" placeholder="CNPJ" style={{
                            width: '100%',
                            height: '3rem',
                            borderRadius: '20px',
                            border: '1px solid #99B8FE',
                            padding: '2.5px 0 2.5px 7px',
                            color: 'black',
                        }} required/>
                        <input type="tel" name="telefone" placeholder="Celular" style={{
                            width: '100%',
                            height: '3rem',
                            borderRadius: '20px',
                            border: '1px solid #99B8FE',
                            padding: '2.5px 0 2.5px 7px',
                            color: 'black'
                        }}/>
                        <input type="email" name="email" placeholder="Email" style={{
                            width: '100%',
                            height: '3rem',
                            borderRadius: '20px',
                            border: '1px solid #99B8FE',
                            padding: '2.5px 0 2.5px 7px',
                            color: 'black'
                        }} required/>
                        <input type="text" name="creci" placeholder="CRECI" style={{
                            width: '100%',
                            height: '3rem',
                            borderRadius: '20px',
                            border: '1px solid #99B8FE',
                            padding: '2.5px 0 2.5px 7px',
                            color: 'black'
                        }} required/>
                        <input type="password" name="password" placeholder="Password" style={{
                        width: '100%',
                        height: '3rem',
                        borderRadius: '20px',
                        border: '1px solid #99B8FE',
                        padding: '2.5px 0 2.5px 7px',
                        color: 'black'
                        }} required/>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" style={{
                        width: '100%',
                        height: '3rem',
                        borderRadius: '20px',
                        border: '1px solid #99B8FE',
                        padding: '2.5px 0 2.5px 7px',
                        color: 'black'
                        }} required/>
                    </div>
                    
                    <button type="submit" id="entrar" style={{
                        padding: '10px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: '#004EFF',
                        width: '70%',
                        color: '#fff',
                        margin: '1rem',
                        backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
                    }}>Cadastrar</button>

                    <a onClick={() => window.history.back()} style={{
                        color: '#004EFF',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}>Voltar</a>
                </form>
            </div>
            <footer>
            </footer>
        </div>
    )
}