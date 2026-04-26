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
        ["CASAR", "NAMORO", "AMIZADE IMPORTANTE"],
        ["AMZ. COLORIDA", "FICANTE", "AMIZADE"],
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