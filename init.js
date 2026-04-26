// Inicialização
rebuildGraph();

document.addEventListener('DOMContentLoaded', () => {
    if(ifpRecovery()){
        for(let i = 0; i < sessionIFPDocuments.length; i++){
            const documentRecovered = sessionIFPDocuments[i];

            const avgs = getAvgByAxios(
                documentRecovered.pts,
                documentRecovered.bd,
                documentRecovered.rs,
                documentRecovered.ps
            );

            tableAppending(
                avgs, 
                documentRecovered.name, 
                documentRecovered.color, 
                documentRecovered.pts, 
                documentRecovered.bd, 
                documentRecovered.rs, 
                documentRecovered.ps
            );

            plotPoint(
                (avgs.xavg / 10) * canvas.width, 
                canvas.height - ((avgs.yavg / 10) * canvas.height),
                documentRecovered.color,
                true,
                5
            );
        }

        updateStatistics();
    }
})

