function notifyInputFromEvaluating(status){
    if(status){
        userInputs[0].disabled = true;
        peopleInput.disabled = true;
        colorTrigger.classList.add("disabled");
        colorTrigger.setAttribute("for", "");
        return;
    }

    userInputs[0].disabled = false;
    peopleInput.disabled = false;
    colorTrigger.classList.remove("disabled");
    colorTrigger.setAttribute("for", "identifier");
}
function prepareForNextEvaluation(){
    for(let i = 1; i < userInputs.length; i++){
        userInputs[i].value = "";
    }
}

function updateEvaluationRemaining(){
    remainingEvaluations.textContent = `${activeEvaluation.made}/${activeEvaluation.evaluators}`
}