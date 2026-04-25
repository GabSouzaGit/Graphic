export default function buildGraph(context, canvas){
    const middleY = Math.floor(canvas.height / 2);
    const middleX = Math.floor(canvas.width / 2);
    
    clearGraph();

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
    let counter = 0;

    for(let x = 0; x < canvas.width; x += step){
        plotPoint(x, middleY, "#000", false);

        if(counter < 5){
            context.fillText(counter, x + 10, middleY);
        }
        else if(counter > 5){
            context.fillText(counter, x - 15, middleY);
        }
        else{
            context.fillText(counter, x + 1, middleY - 5);
        }
         
        context.closePath()

        counter++;
    }

    counter = 10

    // Eixo Y
    for(let y = 0; y < canvas.width; y += step){
        plotPoint(middleX, y, "#000", false);

        if(counter != 5){
            if(counter > 5){
                context.fillText(counter, middleX, y + 10, );
            }
            else if(counter < 5){
                context.fillText(counter, middleX, y - 5, );
            }
        }

        counter--;

        context.closePath();
    }
}
