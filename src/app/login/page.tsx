"use client"

import logo from '@/img/logoLogin.png'
import "./styles.css"
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { nivel } from '@/services/nivel';
import { ButtonGoogle } from '@/components/login/LoginGoogleBtn';
import { useEffect, useState } from 'react';


function Login() {
  const [loading, setIsLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    try {
      await signIn("credentials", {
        ...data,
        callbackUrl: `/produtos`
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="containerLogin">
      {loading && (
        <div className="loading-overlay">
          <img 
            src="https://blogson.com.br/wp-content/uploads/2017/10/d9933c4e2c272f33b74ef18cdf11a7d5.gif" 
            alt="Carregando..." 
            className="loading-image" 
          />
        </div>
      )}
      <div className="gradient">
        <form onSubmit={handleLogin} className="login">
          <img src={logo.src} alt="logo" className="logo" />
          <input type="text" name="email" className="email" placeholder="Email" />
          <input type="password" name="password" className="password" placeholder="Password" />
          <div className="autenticacao"></div>
          <p className="titleAuth">Ou entrar com:</p>
          <ButtonGoogle />
          <button type="submit" id="entrar">Entrar</button>
          <a href="#" className="esqSenha"><i>Esqueceu sua senha</i></a>
          <a href="/cadastro">Ainda não tem uma conta?</a>
        </form>
      </div>
      <footer></footer>
    </div>
  );
}

export default Login;