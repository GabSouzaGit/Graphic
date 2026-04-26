// Caching e armazenamento de dados.
const recoveredIFPDocuments = [];

function saveOnLocalStorage(id, name, color, pts, bd, rs, ps){
    const serialize = {
        name,
        color,
        pts,
        bd,
        rs,
        ps
    }

    window.localStorage.setItem(
        `${id}_IFP_DOCUMENT`,
        JSON.stringify(serialize)
    );

    recoveredIFPDocuments.push(serialize)
}


// Obtendo e gerando todos os objetos necessários.
var globalRegisterCounter = 0;
const HSL_OPCTY = '60%';
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

const linearAreas = ["A++", "A+", "A", "B", "C", "A", "C", "E", "F"]

const canvas = document.querySelector('canvas');
const historic = document.querySelector("#historic table");
const sendButton = document.querySelector("#send");
const resetButton = document.querySelector("#clean")

const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function clearGraph(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function plotPoint(x, y, color = "#000", endPath = true, radius = 2){
    context.beginPath();
    context.font = "12px arial";
    context.arc(x, y, radius, 0, Math.PI * 180);
    context.fillStyle = color;
    context.fill();

    if(endPath) context.closePath();
}

function splitGraphAreas(){
    const ysteps = [0.2, 0.4, 0.4];
    const xsteps = [...ysteps]

    const graphAreas = [
        ["CASAR", "NAMORO", "AMIZADE"],
        ["AMZ. COLORIDA", "DESCARTÁVEL", "AMIZADE"],
        ["DESCARTÁVEL", "DEPENDENDO DA DOSE...", "FUJA."]
    ]

    const hslAreaMatiz = [
        [ 100, 90, 80],
        [ 70, 60, 40],
        [ 40, 30, 10]
    ];

    let previousXEdge = 0;
    let previousYEdge = 0;
    
    for(let ystepi = 0; ystepi < ysteps.length; ystepi++){
        let yEdgeBuffer = 0;
        previousXEdge = 0;

        for(let xstepi = xsteps.length - 1; xstepi >= 0; xstepi--){
            const xd = xsteps[xstepi] * canvas.width;
            const yd = ysteps[ystepi] * canvas.height;

            context.beginPath();
                context.rect(previousXEdge, previousYEdge, xd, yd);
                context.fillStyle = `hsl(0, 0%, ${hslAreaMatiz[ystepi][xstepi]}%, 60%)`;
                context.fill();
            context.closePath();

            context.beginPath();
                context.font = "bold 8px arial";
                context.fillStyle = "#000"
                context.fillText(
                    graphAreas[ystepi][xstepi],
                    previousXEdge + 5,
                    previousYEdge + 20
                );
            context.closePath();

            previousXEdge += xd;
            yEdgeBuffer = yd;
        }

        previousYEdge += yEdgeBuffer;
    }
}

function updateStatistics(){
    let sumMX = 0;
    let sumMY = 0;

    for(let i = 0; i < recoveredIFPDocuments.length; i++){
        sumMX += (recoveredIFPDocuments[i].pts + recoveredIFPDocuments[i].bd) / 2;
        sumMY += (recoveredIFPDocuments[i].rs + recoveredIFPDocuments[i].ps) / 2;
    }

    const avgAppearance = Math.round((sumMX / recoveredIFPDocuments.length) / sumMX * 10);
    const avgPersonality = Math.round((sumMY / recoveredIFPDocuments.length) / sumMY * 10);

    console.log({sumMX, sumMY});
    console.log({ avgAppearance, avgPersonality })

    const stats = document.querySelector("#stats");
    
    /*
    stats.innerHTML = `
        <div>Garotas avaliadas: <span id="girls-qtd">${recoveredIFPDocuments.length}</span></div>
        <div>Aparencia média (${avgAppearance.toFixed(1)}): <span id="appe-avg">${APPEARANCE_SCALE[avgAppearance - 1]}</span></div>
        <div>Personalidade média (${avgPersonality.toFixed(1)}): <span id="ps-avg">${SYMPATHY_SCALE[avgPersonality - 1]}</span></div>
        <div>Média real (0.0): <span id="total-avg">${}</span></div>
    `
    */
}

function rebuildGraph(){
    const middleY = Math.floor(canvas.height / 2);
    const middleX = Math.floor(canvas.width / 2);
    
    clearGraph();

    splitGraphAreas()

    // Cortar no meio (x).
    context.beginPath();
        context.moveTo(0, middleY);
        context.lineTo(canvas.width, middleY);
        context.stroke()
    context.closePath();

    // Cortar no meio (y).
    context.beginPath();
        context.moveTo(middleX, 0);
        context.lineTo(middleX, canvas.height);
        context.stroke()
    context.closePath();

    const step = Math.floor(canvas.width / 10);
    
    // Eixo X
    let cardinalPointsCounter = 0;

    for(let x = 0; x < canvas.width; x += step){
        plotPoint(x, middleY, "#000", false);

        if(cardinalPointsCounter < 5){
            context.fillText(cardinalPointsCounter, x + 5, middleY - 2);
        }
        else if(cardinalPointsCounter > 5){
            context.fillText(cardinalPointsCounter, x - 12, middleY - 2);
        }
        else{
            context.fillText(cardinalPointsCounter, x + 3, middleY - 5);
        }
         
        context.closePath()

        cardinalPointsCounter++;
    }

    cardinalPointsCounter = 10;

    // Eixo Y
    for(let y = 0; y < canvas.width; y += step){
        plotPoint(middleX, y, "#000", false);

        if(cardinalPointsCounter != 5){
            if(cardinalPointsCounter > 5){
                context.fillText(cardinalPointsCounter, middleX + 2, y + 10);
            }
            else if(cardinalPointsCounter < 5){
                context.fillText(cardinalPointsCounter, middleX + 2, y - 5);
            }
        }

        cardinalPointsCounter--;

        context.closePath();
    }
}

// Inicialização
rebuildGraph();

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length != 0){
        for(let i = 0; i < localStorage.length; i++){
            const objectKey = localStorage.key(i);

            if(objectKey.endsWith("_IFP_DOCUMENT")){
                globalRegisterCounter++;

                const ifpDocument = JSON.parse(localStorage.getItem(objectKey));
                recoveredIFPDocuments.push(ifpDocument);

                const avgs = getAvgByAxios(
                    ifpDocument.pts,
                    ifpDocument.bd,
                    ifpDocument.rs,
                    ifpDocument.ps
                );

                tableAppending(
                    avgs, 
                    ifpDocument.name, 
                    ifpDocument.color, 
                    ifpDocument.pts, 
                    ifpDocument.bd, 
                    ifpDocument.rs, 
                    ifpDocument.ps
                );

                plotPoint(
                    (avgs.xavg / 10) * canvas.width, 
                    canvas.height - ((avgs.yavg / 10) * canvas.height),
                    ifpDocument.color,
                    true,
                    5
                );
            }
        }

        updateStatistics();
    }

})

// Captação de dados.

function tableAppending(axios, ...dataToAppend){
    const td = (content = null) => {
        const t = document.createElement('td');
        
        if(content != null) t.textContent = content;

        return t;
    }

    const tr = document.createElement('tr');

    const nameColumn = td(),
          idColumn = td();
        
    nameColumn.textContent = dataToAppend[0];
    const idTableElement = document.createElement('div');
    
    idTableElement.classList.add("id-table");
    idTableElement.style = `background-color: ${dataToAppend[1]}`

    tr.append(nameColumn, idTableElement);

    for(let i = 2; i < dataToAppend.length; i++){
        const column = td(dataToAppend[i]);
        tr.appendChild(column);
    }
    const xavg = td(axios.xavg);
    const yavg = td(axios.yavg);
    tr.append(xavg, yavg);

    historic.appendChild(tr);
}

function getAvgByAxios(pts, bd, rs, ps){
    return {
        xavg: (Number(pts) + Number(bd)) / 2,
        yavg: (Number(rs) + Number(ps)) / 2
    }
}

sendButton.addEventListener('click', () => {
    const name = document.querySelector("#name")
    const color = document.querySelector("#identifier")
    const pts = document.querySelector('#boobs');
    const bd = document.querySelector('#ass');
    const rs = document.querySelector('#face');
    const ps = document.querySelector('#personality');
    
    const inputBufferVerifier = [pts, bd, rs, ps];

    for(let i = 0; i < inputBufferVerifier.length; i++){
        let bufferedValue = inputBufferVerifier[i].value;

        if(bufferedValue == "" || bufferedValue.trim() == ""){
            alert("Preencha todos os campos.")
            return;
        }

        bufferedValue = Number(bufferedValue);
        
        if(bufferedValue == NaN){
            console.log(bufferedValue)
            alert("Os valores precisam ser numéricos.");
            return;
        }
        
        if(bufferedValue > 10
        || bufferedValue < 0
        ){
            alert("Os valores devem ser de 0 a 10.");
            return;
        }
    }

    if(name.value == "" || name.value.trim() == ""){
        alert("Preencha todos os campos.")
        return;
    }

    const avgs = getAvgByAxios(
        pts.value,
        bd.value,
        rs.value,
        ps.value
    );

    tableAppending(
        avgs, 
        name.value, 
        color.value, 
        pts.value, 
        bd.value, 
        rs.value, 
        ps.value
    )

    plotPoint(
        (avgs.xavg / 10) * canvas.width, 
        canvas.height - ((avgs.yavg / 10) * canvas.height),
        color.value,
        true,
        5
    );

    globalRegisterCounter++;
    saveOnLocalStorage(
        globalRegisterCounter,
        name.value, 
        color.value, 
        pts.value, 
        bd.value, 
        rs.value, 
        ps.value
    );

    updateStatistics();
});

resetButton.addEventListener('click', () => { 
    const confirmation = confirm("Tem certeza dessa ação? Fazer isso vai eliminar todos os registros cacheados.");

    if(confirmation){
        localStorage.clear();
    }
});

