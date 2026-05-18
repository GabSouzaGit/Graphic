userInputs.forEach(i => {
    i.addEventListener('input', () => {
        let loopControl = true;

        userInputs.forEach(j => {
            if(loopControl){
                allInputsFilled = j.value.length != 0;      
    
                if(allInputsFilled == false){
                    loopControl = false
                }
            }
        })

        sendButton.disabled = !allInputsFilled;
    });
})

function sendEventHandler(){
    const name = document.querySelector("#name")
    const color = document.querySelector("#identifier")
    const pts = document.querySelector('#boobs');
    const bd = document.querySelector('#ass');
    const rs = document.querySelector('#face');
    const ps = document.querySelector('#personality');
    
    const inputBufferVerifier = [pts, bd, rs, ps];

    for(let i = 0; i < inputBufferVerifier.length; i++){
        let bufferedValue = inputBufferVerifier[i].value;

        if(verifyNumberField(bufferedValue)) continue;
        return;
    }

    if(!verifyTextField(name.value)) return;

    send(
        name.value,
        color.value,
        pts.value,
        bd.value,
        rs.value,
        ps.value
    );
}

document.addEventListener('keypress', (event) => {
    if(event.key === "Enter"){
        sendEventHandler();
    } 
})

sendButton.addEventListener('click', sendEventHandler);

resetButton.addEventListener('click', () => { 
    const confirmation = confirm("Tem certeza dessa ação? Fazer isso vai eliminar todos os registros cacheados.");

    if(confirmation){
        localStorage.removeItem(IFP_STORAGE_KEY);
        localStorage.setItem(IFP_EVALUATING_OBJECT_STORAGE_KEY, "0");
        localStorage.removeItem(IFP_EVALUATING_STORAGE_KEY);

        sessionIFPDocuments = [];

        while(historic.childNodes.length > 2){
            historic.removeChild(historic.childNodes[2]);
        }

        stats.innerHTML = "Sem dados suficientes.";

        rebuildGraph();
        notifyInputFromEvaluating(false);
        evaluating = false;

        peopleInput.value = "";
        activeEvaluation.evaluators = 1;
        
        updateEvaluationRemaining();
        prepareForNextEvaluation();
    }
});

registersButton.addEventListener('click', () => {
    document.body.style.overflowY = "hidden";
    slide.classList.remove("off");
    slide.classList.add("on");
});

slideClose.addEventListener('click', () => {
    document.body.style.overflowY = "initial";
    slide.classList.remove("on");
    slide.classList.add("off");
})

color.addEventListener('input', (event) => {
    colorTrigger.style.setProperty(
        "--js-color-trigger",
        color.value 
    );
});

peopleInfoIcon.addEventListener('click', () => {
    Swal.fire({
        html: `
            <p>
            Insira quantas pessoas vão avaliar.<br/>
            Quando preencher sua parte, os campos serão limpos e a proxima pessoa poderá registrar. 
            Ao terminarem, a média das pontuações de todos será salva.
            <p>Enquanto preenchem, este campo, o de nome e o de cor, ficarão travados até finalizarem os registros.
            <p><b>* Deixe o campo vazio para indicar que a avaliação será feita por uma pessoa.</b></p>
            Fiquem a vontade para acompanhar a sequência de registros que estão fazendo no indicador à direita ^_-
        `,
        confirmButtonText: `
            Ok!
        `,
        customClass: {
            popup: "swal-template-container"
        }
    });
});

peopleInput.addEventListener('change', (event) => {
    const people = Number(peopleInput.value);
    activeEvaluation.evaluators = people < 1 ? 1 : people;

    updateEvaluationRemaining();
});