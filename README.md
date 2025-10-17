# HomeSync - Plataforma Inteligente para o Mercado Imobiliário

Este sistema foi desenvolvido como um Trabalho de Conclusão de Curso (TCC) para o curso técnico em Informática para Internet. O HomeSync é uma solução completa que visa otimizar o dia a dia do corretor de imóveis, facilitando a gestão de propriedades, clientes e negociações comerciais.

## Objetivo

O objetivo central do projeto é aplicar os conhecimentos adquiridos durante o curso para desenvolver um sistema prático, funcional e intuitivo. A plataforma foi projetada para auxiliar corretores de imóveis, centralizando e organizando as informações essenciais para o seu trabalho, aumentando a eficiência e a produtividade.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais: um front-end moderno e um back-end robusto.

**Front-end (HomeSync):**
* **Next.js/React**: Para a construção de interfaces de usuário reativas e renderizadas no servidor.
* **TypeScript**: Para adicionar tipagem estática e segurança ao código.
* **NextAuth.js**: Para gerenciamento completo de autenticação (Credentials e Google Provider).
* **Tailwind CSS**: Para estilização rápida e consistente.

**Back-end (HomeSync API):**
* **Node.js** com **Express**: Para criar uma API RESTful.
* **TypeScript**: Para um desenvolvimento back-end mais seguro e escalável.
* **PostgreSQL**: Como banco de dados principal para persistência de dados.
* **Vercel**: Para o deploy contínuo e hospedagem da aplicação.
* **JWT (JSON Web Tokens)**: Para a autenticação e autorização nas rotas da API.

## Funcionalidades Principais

* **Cadastro Completo de Imóveis**: Formulário para registrar novas propriedades com múltiplos campos e upload de imagens.
* **Gerenciamento de Usuários**: Sistema de cadastro e login para diferentes perfis (corretor, imobiliária, etc.).
* **Chatbot com Inteligência Artificial**: Um assistente virtual que recomenda imóveis com base nas perguntas dos usuários, utilizando a API do Google GenAI.
* **Sistema de Login Seguro**: Autenticação via credenciais (e-mail e senha) e provedores OAuth (Google).
* **Páginas de Perfil**: Visualização de perfis para corretores e imobiliárias com suas informações.
* **Filtragem Dinâmica de Imóveis**: Os usuários podem filtrar a lista de propriedades por localização, preço, área e número de quartos.
* **Painel Administrativo**: Área para o corretor gerenciar seus imóveis e visualizar estatísticas (funcionalidade em desenvolvimento).

## Instalação e Execução

Para executar este projeto localmente, você precisará clonar ambos os repositórios (front-end e back-end) e configurá-los separadamente.

### 1. Back-end (HomeSync API)

```bash
# Clone o repositório da API
git clone [https://github.com/gabrielaanascimento/homesyncapi.git](https://github.com/gabrielaanascimento/homesyncapi.git)

# Navegue até o diretório
cd homesyncapi

# Instale as dependências
npm install

# Crie um arquivo .env na raiz e configure as variáveis de ambiente
# (DATABASE_URL, JWT_SECRET, etc.)

# Execute o servidor de desenvolvimento
npm run dev
```
