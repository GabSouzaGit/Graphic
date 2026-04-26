function updateStatistics(){
    let sumMX = 0;
    let sumMY = 0;

    for(let i = 0; i < sessionIFPDocuments.length; i++){
        console.log(sessionIFPDocuments, i)
        sumMX += (sessionIFPDocuments[i].pts + sessionIFPDocuments[i].bd) / 2;
        sumMY += (sessionIFPDocuments[i].rs + sessionIFPDocuments[i].ps) / 2;
    }

    const avgAppearance = Math.round((sumMX / sessionIFPDocuments.length));
    const avgPersonality = Math.round((sumMY / sessionIFPDocuments.length));

    console.log({sumMX, sumMY});
    console.log({ avgAppearance, avgPersonality })

    const stats = document.querySelector("#stats");
    
    /*
    stats.innerHTML = `
        <div>Garotas avaliadas: <span id="girls-qtd">${sessionIFPDocuments.length}</span></div>
        <div>Aparencia média (${avgAppearance.toFixed(1)}): <span id="appe-avg">${APPEARANCE_SCALE[avgAppearance - 1]}</span></div>
        <div>Personalidade média (${avgPersonality.toFixed(1)}): <span id="ps-avg">${SYMPATHY_SCALE[avgPersonality - 1]}</span></div>
        <div>Média real (0.0): <span id="total-avg">${}</span></div>
    `
    */
}