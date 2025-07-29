import showHistory from './showHistory';
import { fetchImovelDetails, displayImovelDetails } from './imovelDeails';

export default async function sendMessage() {
    let messageInput = document.getElementById('message-input') as HTMLInputElement | null;
    let messageText: string = messageInput ? messageInput.value.trim() : '';

    if (!messageText) {
        if (messageInput) messageInput.style.border = '1px solid red';
        return;
    }
    if (messageInput) messageInput.style.border = 'none';

    let btnSubmit: HTMLButtonElement | null = document.getElementById('btn-submit') as HTMLButtonElement | null;

    // Desabilitar input e botão de envio
    if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.style.cursor = 'not-allowed';
    }
    if (messageInput) messageInput.disabled = true;

    const token: string | null = localStorage.getItem('authToken'); 

    // --- 1. Mostrar a mensagem do usuário ---
    showHistory(messageText, null);

    // --- 2. Mostrar a bolha de "Carregando..." com a imagem ---
    // Passamos o terceiro argumento 'loading' para showHistory para atilet a lógica da imagem
    const loadingBubble = await showHistory(null, 'Carregando...', 'loading'); 

    try {
        const response = await fetch("https://backendtcc.vercel.app/chat/pergunta", {
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

        let generalResponseMessage = '';
        if (data && typeof data === 'object' && data.mensagemGeral) {
            generalResponseMessage = data.mensagemGeral;
        }

        let aiResponseContent = null;

        if (data && Array.isArray(data.ids) && data.ids.length > 0) {
            const recommendedPropertiesListDiv = document.createElement('div');
            recommendedPropertiesListDiv.className = 'chat-imovel-recommendations';

            if (generalResponseMessage) {
                const introMessage = document.createElement('p');
                introMessage.textContent = generalResponseMessage;
                introMessage.className = 'chat-imovel-intro-message';
                recommendedPropertiesListDiv.appendChild(introMessage);
            }
            
            for (const imovelId of data.ids) {
                const imovelDetails = await fetchImovelDetails(imovelId);
                if (imovelDetails) {
                    displayImovelDetails(imovelDetails, recommendedPropertiesListDiv);
                } else {
                    console.warn(`Não foi possível obter detalhes para o imóvel ID: ${imovelId}`);
                }
            }
            aiResponseContent = recommendedPropertiesListDiv;
        } else {
            if (generalResponseMessage) {
                aiResponseContent = generalResponseMessage;
            } else {
                aiResponseContent = "Nenhum imóvel relevante encontrado com base na sua busca.";
            }
        }

        // --- Remover a bolha de "Carregando..." antes de exibir a resposta real ---
        if (loadingBubble && loadingBubble.parentNode) {
            loadingBubble.parentNode.removeChild(loadingBubble);
        }

        // --- Mostrar a bolha de resposta final do bot (APENAS UMA VEZ) ---
        if (aiResponseContent) {
            showHistory(null, aiResponseContent);
        }
        
    } catch (e) {
        console.error(`Erro ao enviar pergunta para o Gemini:`, e);
        
        // --- Remover a bolha de "Carregando..." no caso de erro ---
        if (loadingBubble && loadingBubble.parentNode) {
            loadingBubble.parentNode.removeChild(loadingBubble);
        }
        // Mostrar a mensagem de erro como a resposta final do bot
        showHistory(null, `Erro: ${e.message || 'Não foi possível obter a resposta do chat. Tente novamente.'}`);
    } finally {
        // Reabilitar input e botão
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.style.cursor = 'pointer';
        }
        if (messageInput) {
            messageInput.disabled = false;
            messageInput.value = '';
        }
    }
}