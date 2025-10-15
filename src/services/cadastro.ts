const API_BASE_URL = process.env.URL_API || 'http://localhost:3001';

export const cadastrar = async (email: string, password: string, cpf: string, name: string, creci: string, telefone: string ) => {
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