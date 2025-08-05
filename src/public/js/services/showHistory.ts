export default async function showHistory(messageContent, responseContent, type = null) { // Adicionado type com valor padrão null
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

        if (type === 'loading') {
            var loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-animation';
            loadingDiv.innerHTML = `<img src='https://cdn.pixabay.com/animation/2023/11/30/10/11/10-11-02-622_512.gif' alt='Carregando...' >`;
            boxResponseMessage.appendChild(loadingDiv);
        } else if (typeof responseContent === 'string') { 
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

