// main.js (ou seu arquivo JS consolidado)

// --- 1. FUNÇÕES AUXILIARES ---

async function fetchImovelDetails(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            switch (id) {
                case 1:
                    resolve({ id: 1, nome: 'Apartamento Aconchegante', descricao: 'Lindo apartamento com vista para o mar, 2 quartos, perto da praia.', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png' });
                    break;
                case 5:
                    resolve({ id: 5, nome: 'Casa Espaçosa', descricao: 'Casa grande com jardim, piscina e 3 suítes, ideal para família.', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png' });
                    break;
                case 10:
                    resolve({ id: 10, nome: 'Studio Moderno', descricao: 'Studio compacto e bem localizado no centro da cidade, mobiliado.', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png' });
                    break;
                default:
                    resolve({ id: 0, nome: 'Imóvel Genérico', descricao: 'Detalhes genéricos para imóveis não mapeados.', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png' });
            }
        }, 200);
    });
}

// showHistory agora retorna o elemento da bolha criado, e aceita 'type' para 'loading'
function showHistory(messageContent, responseContent, type = null) { // Adicionado type com valor padrão null
    var historyBox = document.getElementById('history');

    if (!historyBox) {
        console.error("Elemento com ID 'history' não encontrado. Não é possível exibir o histórico.");
        return null;
    }

    let createdBubble = null;

    if (messageContent) {
        var boxMyMessage = document.createElement('div');
        boxMyMessage.className = 'box-my-message';

        var myMessage = document.createElement('p');
        myMessage.className = 'my-message';
        myMessage.innerHTML = messageContent;

        boxMyMessage.appendChild(myMessage);
        historyBox.appendChild(boxMyMessage);
        createdBubble = boxMyMessage;
    }

    if (responseContent) {
        var boxResponseMessage = document.createElement('div');
        boxResponseMessage.className = 'box-response-message';

        if (type === 'loading') { // Condição para exibir a imagem de loading
            var loadingDiv = document.createElement('div'); // Um div para conter a imagem
            loadingDiv.className = 'loading-animation'; // Classe para estilizar a animação
            loadingDiv.innerHTML = `<img src='https://cdn.pixabay.com/animation/2023/11/30/10/11/10-11-02-622_512.gif' alt='Carregando...' >`;
            boxResponseMessage.appendChild(loadingDiv);
        } else if (typeof responseContent === 'string') { // Conteúdo é uma string normal
            var chatResponse = document.createElement('p');
            chatResponse.className = 'response-message';
            chatResponse.innerHTML = responseContent;
            boxResponseMessage.appendChild(chatResponse);
        } else if (responseContent instanceof HTMLElement || responseContent instanceof DocumentFragment) { // Conteúdo é um elemento HTML (ex: lista de imóveis)
            var responseBubbleWrapper = document.createElement('div');
            responseBubbleWrapper.className = 'response-message-wrapper';
            responseBubbleWrapper.appendChild(responseContent);
            boxResponseMessage.appendChild(responseBubbleWrapper);
        }

        historyBox.appendChild(boxResponseMessage);
        createdBubble = boxResponseMessage; // Armazena a bolha de resposta
    }

    historyBox.scrollTop = historyBox.scrollHeight;
    return createdBubble; // Retorna a bolha que foi adicionada
}

function displayImovelDetails(imovel, container) {
    if (!imovel || !container) {
        console.error("Dados do imóvel ou container inválidos para exibição.");
        return;
    }

    const imovelDiv = document.createElement('div');
    imovelDiv.className = 'recommended-imovel-item';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'imovel-image-container';
    const image = document.createElement('img');
    image.className = 'imovel-image';
    image.src = imovel.imageUrl;
    image.alt = imovel.nome;
    imageDiv.appendChild(image);

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'imovel-details';

    const nameHeading = document.createElement('h3');
    nameHeading.className = 'imovel-name';
    nameHeading.textContent = imovel.nome;

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.className = 'imovel-description';
    descriptionParagraph.textContent = imovel.descricao;

    const verMaisLink = document.createElement('a');
    verMaisLink.className = 'imovel-ver-mais';
    verMaisLink.href = `/imovel/${imovel.id}`;
    verMaisLink.textContent = 'Ver mais';
    verMaisLink.target = '_blank';

    detailsDiv.appendChild(nameHeading);
    detailsDiv.appendChild(descriptionParagraph);
    detailsDiv.appendChild(verMaisLink);

    imovelDiv.appendChild(imageDiv);
    imovelDiv.appendChild(detailsDiv);

    container.appendChild(imovelDiv);
}

function logout() {
   localStorage.removeItem('authToken');
   window.location.href = '/login';
}


// --- 2. FUNÇÕES PRINCIPAIS DAS ROTAS / LISTENERS ---

async function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var messageText = messageInput ? messageInput.value.trim() : '';

    if (!messageText) {
        if (messageInput) messageInput.style.border = '1px solid red';
        return;
    }
    if (messageInput) messageInput.style.border = 'none';

    var btnSubmit = document.getElementById('btn-submit'); // statusElement removido

    // Desabilitar input e botão de envio
    if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.style.cursor = 'not-allowed';
    }
    if (messageInput) messageInput.disabled = true;

    const token = localStorage.getItem('authToken');

    // --- 1. Mostrar a mensagem do usuário ---
    showHistory(messageText, null);

    // --- 2. Mostrar a bolha de "Carregando..." com a imagem ---
    // Passamos o terceiro argumento 'loading' para showHistory para ativar a lógica da imagem
    const loadingBubble = showHistory(null, 'Carregando...', 'loading'); 

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

// ... (Restante do código consolidado, incluindo a função 'verificar' e o listener DOMContentLoaded) ...

