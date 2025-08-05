async function displayImovelDetails(imovel: any, container: HTMLElement) {
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

async function fetchImovelDetails(id: number): Promise<any> {
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

export { 
    displayImovelDetails, 
    fetchImovelDetails 
};