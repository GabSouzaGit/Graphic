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
        sessionStorage = [];
        globalRegisterCounter = 0;

        for(let i = 2; i < historic.childNodes.length; i++){
            historic.removeChild(historic.childNodes[i]);
            console.log(historic.childNodes);
        }

        stats.innerHTML = "Sem dados suficientes.";
        rebuildGraph();
    }
});