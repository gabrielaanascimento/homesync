//form de edição
import { useEffect, useState } from "react";

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

export default function EditarPerfil() {
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
        setError("Usuário não identificado.");
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
          },
          body: JSON.stringify({
            nome_exibicao: nomeExibicao,
            email,
            celular,
            senha,
          }),
        }
      );

      if (!res.ok) throw new Error("Falha no PUT");

      setSuccess("Dados atualizados!");
      setOpen(false);
    } catch {
      setError("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  return (
    <div>
      {/* Botão que abre o formulário */}
      <button onClick={() => setOpen(true)}>
        Editar Perfil
      </button>

      {/* Formulário simples e minimalista */}
      {open && (
        <div
          style={{
            marginTop: 12,
            padding: 16,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <h3>Editar Perfil</h3>

          <label>Nome de Exibição</label>
          <input
            value={nomeExibicao}
            onChange={(e) => setNomeExibicao(e.target.value)}
          />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Celular</label>
          <input value={celular} onChange={(e) => setCelular(e.target.value)} />

          <label>Senha (opcional)</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <button onClick={() => setOpen(false)} style={{ marginLeft: 8 }}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
