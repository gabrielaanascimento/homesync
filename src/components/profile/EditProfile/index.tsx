// src/components/profile/EditProfile/index.tsx
"use client"; // Necessário para hooks

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Função para pegar o ID do usuário (sua lógica original)
function getUserIdFromToken() {
  const token = localStorage.getItem("token"); 
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

// 1. ADICIONADA UMA INTERFACE PARA AS PROPS
interface EditarPerfilProps {
  /**
   * Permite passar uma função que renderiza um botão customizado.
   * A função recebe 'openModal' como argumento, que deve ser chamado no onClick.
   */
  renderButton?: (openModal: () => void) => React.ReactNode;
}

export default function EditarPerfil({ renderButton }: EditarPerfilProps) { // 2. RECEBE A PROP
  const userId = getUserIdFromToken();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<any>(null);
  const [nomeExibicao, setNomeExibicao] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET — Busca dados do usuário logado
  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://homesyncapi.vercel.app/corretor/corretores/${userId}`
        );
        if (!res.ok) throw new Error("Falha no GET");
        const json = await res.json();
        setData(json);
        setNomeExibicao(json.nome_exibicao);
        setEmail(json.email);
        setCelular(json.celular);
      } catch {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  // PUT — Salvar atualizações
  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        `https://homesyncapi.vercel.app/corretor/corretores/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // NOTA: Se sua rota PUT for protegida, você precisará adicionar o token aqui
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
      setTimeout(() => {
        setOpen(false);
        setSuccess("");
        window.location.reload(); 
      }, 2000);
    } catch(err: any) {
      setError(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  // 3. FUNÇÃO PARA SER PASSADA PARA O BOTÃO
  const handleOpen = () => setOpen(true);

  if (loading || !userId) return null;

  return (
    <div>
      {/* 4. LÓGICA CONDICIONAL: Usa o botão customizado ou o padrão */}
      {renderButton ? (
        renderButton(handleOpen)
      ) : (
        <button onClick={handleOpen} style={styles.openButton}>
          Editar Perfil
        </button>
      )}

      {/* O formulário (modal/popup) - ESTA PARTE CONTINUA IGUAL */}
      {open && (
        <div style={styles.overlay}> 
          <div style={styles.gradientContainer}>
            <div style={styles.formContainer}>
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
                <button onClick={() => setOpen(false)} style={styles.cancelButton} disabled={saving}>
                  Fechar
                </button>
                <button onClick={handleSave} style={styles.button} disabled={saving}>
                  {saving ? (
                    <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={20} />
                  ) : (
                    "Salvar"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos (O modal usa estes estilos)
const styles: { [key: string]: React.CSSProperties } = {
  openButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#004EFF',
    color: '#fff',
    margin: '0',
    backgroundImage: 'linear-gradient(to right, #004EFF, #99B8FE)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '100%',
    maxWidth: '250px'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  gradientContainer: {
    width: '90%',
    maxWidth: '500px',
    borderRadius: '20px',
    zIndex: 1001,
    padding: '3px',
    backgroundImage: 'linear-gradient(to bottom, #99B8FE, #DBA1FC)',
  },
  formContainer: {
    padding: '25px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    width: '100%',
    borderRadius: '18px',
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 998,
    position: 'relative',
    boxSizing: 'border-box',
  },
  title: {
    color: '#004EFF',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  inputGroup: {
    width: '90%',
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
    gap: '10px',
    width: '90%',
    marginTop: '1rem',
  },
  button: {
    padding: '10px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#004EFF',
    width: '100%',
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
  cancelButton: {
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #99B8FE',
    backgroundColor: '#fff',
    width: '100%',
    color: '#004EFF',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
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