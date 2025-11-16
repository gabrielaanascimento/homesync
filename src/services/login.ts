// src/services/login.ts

const URL_API = process.env.URL_API || "https://homesyncapi.vercel.app";

export const login = async (email: string, password: string) => {

  try {
    const response = await fetch(`${URL_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         email: email,
         senha: password
      })
    });

    // 1. Leia o JSON da resposta
    const data = await response.json();

    if (!response.ok) {
      // 2. Se a resposta não for OK (401, 500, etc.),
      //    a 'data' já é o objeto de erro { success: false, message: ... }
      //    (ou { message: '...' } dependendo do erro)
      console.error("Erro da API de login:", data);
      // Retorna o objeto de erro para o 'authorize'
      return data.body || data; 
    }

    // 3. Se a resposta FOR OK, a 'data' já é o objeto de sucesso
    //    { success: true, token: "...", user: {...} }
    //    Retorne este objeto diretamente.
    return data;

  } catch (error) {
    console.error("Erro de rede no serviço de login:", error);
    return { success: false, message: 'Erro de rede ou conexão com a API.' };
  }
}