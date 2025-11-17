// src/components/profile/EditProfile/index.tsx
"use client"; 

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react"; 

export default function EditarPerfilForm() {
  const { data: session } = useSession(); 
  const userId = session?.user?.id;
  const token = session?.user?.token;
  const userType = session?.user?.tipo; // Pega o tipo de usuário

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados do formulário
  const [nomeExibicao, setNomeExibicao] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Determina o endpoint da API com base no tipo de usuário
  const getApiEndpoints = () => {
    if (!userType) return null;
    let basePath = "";
    switch (userType) {
      case 'corretor':
        basePath = 'corretor/corretores';
        break;
      case 'imobiliaria':
        basePath = 'corretor/imobiliarias'; // Verifique se esta é a rota correta na sua API
        break;
      case 'construtora':
        basePath = 'corretor/construtoras'; // Verifique se esta é a rota correta na sua API
        break;
      default:
        return null;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://homesyncapi.vercel.app';
    return {
      get: `${API_URL}/${basePath}/${userId}`,
      put: `${API_URL}/${basePath}/${userId}`
    };
  };

  // GET — Busca dados do usuário logado
  useEffect(() => {
    async function fetchData() {
      const endpoints = getApiEndpoints();
      
      if (!userId || !token || !endpoints) {
        setLoading(false);
        if (!endpoints) setError("Tipo de usuário inválido.");
        return;
      }
      
      try {
        const res = await fetch(endpoints.get, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Lógica robusta para tratar erros de JSON
        if (!res.ok) {
          let errorMessage = "Falha ao carregar dados do perfil.";
          try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorData.body?.message || errorMessage;
          } catch (e) {
            // A resposta de erro não era JSON
            const errorText = await res.text();
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
        
        const json = await res.json(); 

        // Assume que todos os tipos de usuário têm estes campos
        setNomeExibicao(json.nome_exibicao);
        setEmail(json.email);
        setCelular(json.celular);

      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId, token, userType]); // Adicionado userType às dependências

  // PUT — Salvar atualizações
  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); 
    
    const endpoints = getApiEndpoints();

    if (!userId || !token || !endpoints) {
      setError("Sessão inválida ou tipo de usuário não suportado. Faça login novamente.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(endpoints.put, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome_exibicao: nomeExibicao,
          email,
          celular,
          senha: senha || undefined, // Só envia a senha se não for vazia
        }),
      });

      // Lógica robusta para tratar erros de JSON
      if (!res.ok) {
        let errorMessage = "Falha ao salvar. Verifique os campos.";
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorData.body?.message || errorMessage;
        } catch (e) {
             const errorText = await res.text();
             errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setSuccess("Dados atualizados com sucesso!");
      setSenha(""); // Limpa o campo de senha
      
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch(err: any) {
      setError(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{...styles.formContainer, minHeight: '300px', ...styles.loadingContainer}}>
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={24} />
        Carregando dados de edição...
      </div>
    );
  }

  // Renderiza o formulário
  return (
    <form onSubmit={handleSave} style={styles.formContainer}>
      <h3 style={styles.title}>Editar Perfil</h3>

      {error && <p style={styles.errorText}>{error}</p>}
      {success && <p style={styles.successText}>{success}</p>}

      <div style={styles.inputGroup}>
        <label style={styles.label}>Nome de Exibição</label>
        <input
          style={styles.inputField}
          value={nomeExibicao}
          onChange={(e) => setNomeExibicao(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Email</label>
        <input
          style={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Celular</label>
        <input
          style={styles.inputField}
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Nova Senha (deixe em branco para não alterar)</label>
        <input
          style={styles.inputField}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="********"
        />
      </div>

      <div style={styles.buttonRow}>
        <button type="submit" style={styles.button} disabled={saving}>
          {saving ? (
            <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} />
          ) : (
            "Salvar Alterações"
          )}
        </button>
      </div>
    </form>
  );
}

// Estilos (sem alterações)
const styles: { [key: string]: React.CSSProperties } = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    color: '#555'
  },
  formContainer: {
    padding: '25px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    borderRadius: '15px', 
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid #eee', 
  },
  title: {
    color: '#1d3fff', 
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'left',
    width: '100%'
  },
  inputGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '0.25rem',
    marginLeft: '10px',
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
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    width: '100%',
    marginTop: '1rem',
  },
  button: {
    padding: '10px 25px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#004EFF',
    color: '#fff',
    backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '45px', 
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
  },
  successText: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
  },
};