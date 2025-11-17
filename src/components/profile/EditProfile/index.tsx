// src/components/profile/EditProfile/index.tsx
"use client"; 

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react"; // Importado para pegar o token

// REMOVIDA a prop 'renderButton' e a lógica de 'open'

export default function EditarPerfilForm() {
  const { data: session } = useSession(); // Pega a sessão
  const userId = session?.user?.id;
  const token = session?.user?.token;

  // REMOVIDO: const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // (Estados de formulário permanecem os mesmos)
  const [nomeExibicao, setNomeExibicao] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET — Busca dados do usuário logado
  useEffect(() => {
    async function fetchData() {
      // Usa o ID e Token da sessão
      if (!userId || !token) {
        setLoading(false);
        return;
      }
      try {
        // ATENÇÃO: A rota da API é /corretor/corretores/:id
        // Isso pode não funcionar para imobiliárias e construtoras
        // O ideal seria ter rotas de update separadas na API
        const res = await fetch(
          `https://homesyncapi.vercel.app/corretor/corretores/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        if (!res.ok) throw new Error("Falha ao carregar dados do perfil.");
        
        const json = await res.json();
        
        // Assumindo que a API de corretor, imobiliária e construtora
        // retornam os mesmos campos básicos.
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
  }, [userId, token]); // Depende do token e userId

  // PUT — Salvar atualizações
  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); // É um formulário agora
    
    if (!userId || !token) {
      setError("Sessão inválida. Faça login novamente.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      // ATENÇÃO: Mesma observação da rota da API acima
      const res = await fetch(
        `https://homesyncapi.vercel.app/corretor/corretores/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nome_exibicao: nomeExibicao,
            email,
            celular,
            senha: senha || undefined, 
          }),
        }
      );
      if (!res.ok) throw new Error("Falha ao salvar. Verifique os campos.");
      setSuccess("Dados atualizados com sucesso!");
      setSenha(""); // Limpa o campo de senha
      
      setTimeout(() => {
        setSuccess("");
        // Não precisamos recarregar a página inteira, apenas limpar a msg
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

  // Renderiza o formulário diretamente, sem modal
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

// Estilos adaptados para um formulário inline
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
    borderRadius: '15px', // Borda do .reviews
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 1,
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid #eee', // Adiciona uma borda sutil
  },
  title: {
    color: '#1d3fff', // Cor do .reviews h3
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