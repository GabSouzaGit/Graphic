const APPEARANCE_SCALE = [
    "Horrivel 🤮",
    "Muito feia 🤢",
    "Feia 😔",
    "Feinha 🤨",
    "Mais ou menos 🤔",
    "Bonitinha 👀",
    "Bonita 😏",
    "Gata 🥵",
    "Linda 😍",
    "Perfeição ✨"
]

const SYMPATHY_SCALE = [
    "Procure um médico 🤡",
    "Terrível 🤮",
    "Muito chata 😒",
    "Chatinha 🙄",
    "Suportável 😑",
    "Dá para melhorar 🤔",
    "Pessoa normal 🙂",
    "Pessoa incrível 😆",
    "Espetacular 😍",
    "1 em 1.000.000 💖"
]

const indicators = {
    ... APPEARANCE_SCALE,
    ... SYMPATHY_SCALE
}

const linearAreas = [
    ['Fuja.', 'Dependendo da dose...', 'Descartável'], 
    ['Amizade', 'Ficante', 'Amizade Colorida'], 
    ['Amizade Importante', 'Namoro', 'Casar'],
];

function graphIndex(avgAppearance, avgPersonality){
    const indexCalculator = (avg) => (avg / 3 - 1) < 0 ? 0 : Math.round(avg / 3 - 1);
    
    const avgaIndex = indexCalculator(avgAppearance);
    const avgpIndex = indexCalculator(avgPersonality);

    return linearAreas[avgpIndex][avgaIndex];
}

function updateStatistics(){
    const zeroLimit = (x) => x < 0 ? 0 : x;

    let sumMX = 0;
    let sumMY = 0;

    for(let i = 0; i < sessionIFPDocuments.length; i++){
        sumMX += (sessionIFPDocuments[i].pts + sessionIFPDocuments[i].bd) / 2;
        sumMY += (sessionIFPDocuments[i].rs + sessionIFPDocuments[i].ps) / 2;
    }

    const avgAppearance = sumMX / sessionIFPDocuments.length;
    const avgPersonality = sumMY / sessionIFPDocuments.length;
    
    stats.innerHTML = `
        <div> 
            Avaliações: <b>${sessionIFPDocuments.length}</b>
        </div>
        <div> 
            Aparencia média (${avgAppearance.toFixed(1)}): <b>${APPEARANCE_SCALE[zeroLimit(Math.round(avgAppearance) - 1)]}</b>
        </div>
        <div>
            Personalidade média (${avgPersonality.toFixed(1)}): <b>${SYMPATHY_SCALE[zeroLimit(Math.round(avgPersonality) - 1)]}</b>
        </div>
        <div>
            Média total: ${graphIndex(avgAppearance, avgPersonality)}
        </div>
    `
}