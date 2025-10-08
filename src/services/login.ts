
export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       email: email,
       senha: password
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