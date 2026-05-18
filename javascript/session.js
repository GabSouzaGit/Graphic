function addToIFPSession(ifpDocuments){
    sessionIFPDocuments.push(ifpDocuments);
}

function ifpRecovery(){
     if(localStorage.getItem(IFP_STORAGE_KEY)){
        const ifpDocuments = JSON.parse(localStorage.getItem(IFP_STORAGE_KEY));
        
        for(let i = 0; i < ifpDocuments.length; i++){
            sessionIFPDocuments[i] = {};

            sessionIFPDocuments[i].name = ifpDocuments[i].name;
            sessionIFPDocuments[i].color = ifpDocuments[i].color;

            sessionIFPDocuments[i].pts = Number(ifpDocuments[i].pts);
            sessionIFPDocuments[i].bd = Number(ifpDocuments[i].bd);
            sessionIFPDocuments[i].rs = Number(ifpDocuments[i].rs);
            sessionIFPDocuments[i].ps = Number(ifpDocuments[i].ps);
        }

        return true;
    }

    return false;
}

function saveOnLocalStorage(name, color, pts, bd, rs, ps){
    const serialize = {
        name,
        color,
        pts: Number(pts),
        bd: Number(bd),
        rs: Number(rs),
        ps: Number(ps),
    }

    addToIFPSession(serialize);

    localStorage.setItem(
        IFP_STORAGE_KEY,
        JSON.stringify(sessionIFPDocuments)
    );
}

function saveParcialDataFromEvaluation(pts, bd, rs, ps){
    activeEvaluation.evaluations.push({ pts, bd, rs, ps });

    localStorage.setItem(IFP_EVALUATING_OBJECT_STORAGE_KEY, JSON.stringify(activeEvaluation));
}

function searchPreviousInitialization(){
    const possibleInit = localStorage.getItem(IFP_EVALUATING_OBJECT_STORAGE_KEY);
    
    if(possibleInit != false){
        const previousEvaluationInit = JSON.parse(possibleInit);
        activeEvaluation.evaluators = previousEvaluationInit.evaluators;

        updateEvaluationRemaining()  
        return;
    }

    updateEvaluationRemaining();
}

function addDataFromPreviousEvaluation(){
    activeEvaluation = JSON.parse(localStorage.getItem(IFP_EVALUATING_OBJECT_STORAGE_KEY));

    userInputs[0].value = activeEvaluation.name;
    peopleInput.value = activeEvaluation.evaluators;    
    color.value = activeEvaluation.color;

    updateEvaluationRemaining();
}

function openEvaluationSession(object){
    localStorage.setItem(IFP_EVALUATING_OBJECT_STORAGE_KEY, JSON.stringify(object));
    localStorage.setItem(IFP_EVALUATING_STORAGE_KEY, "1");
}

function endSessionLifeCycle(){
    evaluating = false;
            
    activeEvaluation.name = null;
    activeEvaluation.color = null;
    activeEvaluation.made = 0;
    activeEvaluation.evaluations = [];

    localStorage.setItem(IFP_EVALUATING_STORAGE_KEY, "0");
    localStorage.setItem(IFP_EVALUATING_OBJECT_STORAGE_KEY, JSON.stringify(activeEvaluation));
}

function evaluationState(){
    if(Number(localStorage.getItem(IFP_EVALUATING_STORAGE_KEY))){
        evaluating = true;

        return {
            on: true,
            recoveryEvaluations: JSON.parse(localStorage.getItem(IFP_EVALUATING_OBJECT_STORAGE_KEY))
        }
    }

    return {
        on: false,
        recoveryEvaluations: {}
    }
}