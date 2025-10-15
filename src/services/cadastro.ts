const API_BASE_URL = process.env.URL_API || 'https://homesyncapi.vercel.app';

export const cadastrar = async (email: string, password: string, cpf: string, name: string, creci: string, telefone: string ) => {

  if (!email || !password || !cpf || !name || !creci || !telefone) {
    alert('Preencha todos os campos');
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/auth/cadastrar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       email: email,
       senha: password,
       nome: name,
       CPF: cpf,
       CRECI: creci,
       telefone: telefone
       })
          });
      if (!response.ok) {
        return null
      }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }

  return response.json();
}