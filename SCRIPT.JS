let currentPageUrl = 'https://swapi.py4e.com/api/people/';  

window.onload = async () => {  
    try {  
        await loadCharacters(currentPageUrl);  
    } catch (error) {  
        console.error(error);  
        alert('Erro ao carregar os cards');  
    }  

    const nextButton = document.getElementById('next-button');  
    const backButton = document.getElementById('back-button');  
    nextButton.addEventListener('click', loadNextPage);  
    backButton.addEventListener('click', loadPreviousPage);  
};  

async function loadCharacters(url) {  
    const mainContent = document.getElementById('main-content');  
    mainContent.innerHTML = ''; // Limpa a página  

    try {  
        const response = await fetch(url);  
        if (!response.ok) throw new Error('Erro na resposta da API');  
        
        const responseJson = await response.json();  
        responseJson.results.forEach((character) => {  
            const characterId = character.url.split('/')[5]; // Extrai o ID do personagem da URL  
            const card = document.createElement("div");  
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg')`;  
            card.className = "cards";  
            const characterNameBG = document.createElement("div");  
            characterNameBG.className = "character-name-bg";  
            const characterName = document.createElement("span");  
            characterName.className = "character-name";  
            characterName.innerText = character.name;  

            characterNameBG.appendChild(characterName);  
            card.appendChild(characterNameBG);  

            // Ação ao clicar no card para abrir o modal  
            card.onclick = () => openModal(characterId, character);  

            mainContent.appendChild(card);  
        });  

        updateNavigationButtons(responseJson);  
        currentPageUrl = url; // Atualiza a URL da página atual  

    } catch (error) {  
        console.error(error);  
        alert('Erro ao carregar os personagens');  
    }  
}  

function openModal(characterId, character) {  
    const modal = document.getElementById('modal');  
    modal.style.visibility = "visible";  
    const modalContent = document.getElementById('modal-content');  
    modalContent.innerHTML = ''; // Limpa o conteúdo do modal  
    
    const characterImage = document.createElement("div");  
    characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg')`;  
    characterImage.className = "character-image";  

    modalContent.appendChild(characterImage);  
    modalContent.appendChild(createCharacterDetail('Nome', character.name));  
    modalContent.appendChild(createCharacterDetail('Altura', convertHeight(character.height)));  
    modalContent.appendChild(createCharacterDetail('Peso', convertMass(character.mass)));  
    modalContent.appendChild(createCharacterDetail('Cor dos Olhos', convertEyeColor(character.eye_color || 'Indefinido')));  
    modalContent.appendChild(createCharacterDetail('Ano de Nascimento', convertBirthYear(character.birth_year)));  
}  

function createCharacterDetail(label, value) {  
    const span = document.createElement("span");  
    span.className = "character-details";  
    span.innerText = `${label}: ${value}`;  
    return span;  
}  

function updateNavigationButtons(responseJson) {  
    const nextButton = document.getElementById('next-button');  
    const backButton = document.getElementById('back-button');  
    nextButton.disabled = !responseJson.next;  
    backButton.disabled = !responseJson.previous;  
    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";  
}  

async function loadNextPage() {  
    if (!currentPageUrl) return;  
    try {  
        const response = await fetch(currentPageUrl);  
        const responseJson = await response.json();  
        if (responseJson.next) {  
            await loadCharacters(responseJson.next);  
        }  
    } catch (error) {  
        console.error(error);  
        alert('Erro ao carregar a próxima página');  
    }  
}  

async function loadPreviousPage() {  
    if (!currentPageUrl) return;  
    try {  
        const response = await fetch(currentPageUrl);  
        const responseJson = await response.json();  
        if (responseJson.previous) {  
            await loadCharacters(responseJson.previous);  
        }  
    } catch (error) {  
        console.error(error);  
        alert('Erro ao carregar a página anterior');  
    }  
}  

function hideModal() {  
    const modal = document.getElementById("modal");  
    modal.style.visibility = "hidden";  
}  

function convertEyeColor(eyeColor) {  
    const cores = {  
        blue: "azul",  
        brown: "castanho",  
        green: "verde",  
        yellow: "amarelo",  
        black: "preto",  
        pink: "rosa",  
        red: "vermelho",  
        orange: "laranja",  
        hazel: "avela",  
        gray: "cinza",  
        unknown: "desconhecido",  
    };  
    return cores[eyeColor.toLowerCase()] || eyeColor;  
}  

function convertHeight(height) {  
    if (height === "unknown") {  
        return "desconhecido";  
    }  
    return (height / 100).toFixed(2) + ' m'; // Adiciona unidade de medida  
}  

function convertMass(mass) {  
    if (mass === "unknown") {  
        return "desconhecido";  
    }  
    return `${mass} kg`;  
}  

function convertBirthYear(birthYear) {  
    return birthYear === "unknown" ? "desconhecido" : birthYear;  
}
return birthYear
}

