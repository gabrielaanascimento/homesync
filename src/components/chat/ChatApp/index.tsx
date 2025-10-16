"use client";
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import MessageHistory from '../MessageHistory';
import Footer from '../Footer';

interface Imovel {
  id: number;
  nome: string;
  descricao: string;
  image: string;
}

interface MessageData {
  type: 'user' | 'bot' | 'loading';
  text: string;
  imoveis?: Imovel[];
}

const API_BASE_URL = process.env.URL_API || 'https://homesyncapi.vercel.app';


const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect para carregar o histórico do localStorage ao montar o componente
  useEffect(() => {
    // Garante que o código só é executado no lado do cliente
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      }
    }
  }, []);

  // useEffect para salvar o histórico no localStorage sempre que 'messages' mudar
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (messageText: string): Promise<void> => {
    setIsLoading(true);

    // 1. Adiciona a mensagem do usuário e o estado de "carregando"
    const userMessage: MessageData = { type: 'user', text: messageText };
    const loadingMessage: MessageData = { type: 'loading', text: 'Carregando...' };
    setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

    const token = localStorage.getItem('authToken');

    try {
      // 2. Faz a requisição para o backend
      const response = await fetch(`${API_BASE_URL}/chat/pergunta`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          text: messageText
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      let aiResponseContent = "Nenhum imóvel relevante encontrado com base na sua busca.";
      let imoveis: Imovel[] | undefined;

      // 3. Busca detalhes dos imóveis se existirem
      if (data && Array.isArray(data.ids) && data.ids.length > 0) {
        const fetchedImoveisPromises = data.ids.map((id: number) =>
          fetch(`${API_BASE_URL}/imovel/imoveis/${id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(res => res.json())
          .then(imovelResponse => {
            if (imovelResponse.statusCode === 200 && imovelResponse.body) {
              const apiImovel = imovelResponse.body;
              return {
                id: apiImovel.id,
                nome: `${apiImovel.tipo_imovel} - ${apiImovel.local}`,
                descricao: apiImovel.descricao,
                imageUrl: apiImovel.image || 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png',
              };
            }
            return null;
          })
        );
        
        const fetchedImoveis = await Promise.all(fetchedImoveisPromises);
        imoveis = fetchedImoveis.filter(imovel => imovel !== null) as Imovel[];
        aiResponseContent = data.mensagemGeral || "Aqui estão algumas propriedades que correspondem à sua busca:";
      } else if (data && data.mensagemGeral) {
        aiResponseContent = data.mensagemGeral;
      }

      // 4. Remove o estado de "carregando" e adiciona a resposta final do bot
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.filter(msg => msg.type !== 'loading');
        return [...updatedMessages, { type: 'bot', text: aiResponseContent, imoveis }];
      });

    } catch (e: any) {
      console.error(`Erro ao enviar pergunta para o Gemini:`, e);
      // 5. Remove o estado de "carregando" e adiciona uma mensagem de erro
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.filter(msg => msg.type !== 'loading');
        return [...updatedMessages, { type: 'bot', text: `Erro: ${e.message || 'Não foi possível obter a resposta do chat. Tente novamente.'}` }];
      });
    } finally {
      // 6. Reabilita o botão de envio
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('chatHistory');
    setMessages([]);
  };

  const bodyStyle: React.CSSProperties = {
    backgroundColor: '#0c0c0c',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    margin: '0',
  };

  const boxQuestionsStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    color: '#0c0c0c',
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    textAlign: 'center',
  };

  return (
    <div style={bodyStyle}>
      <div style={boxQuestionsStyle}>
        <Header />
        <MessageHistory messages={messages} />
        <Footer onSendMessage={sendMessage} isLoading={isLoading} onClearChat={clearChat} />
      </div>
    </div>
  );
};

export default ChatApp;