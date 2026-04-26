const sessionIFPDocuments = [];

function addToIFPSession(ifpDocument){
    sessionIFPDocuments.push({
        name: ifpDocument.name,
        color: ifpDocument.color,
        pts: Number(ifpDocument.pts),
        bd: Number(ifpDocument.bd),
        rs: Number(ifpDocument.rs),
        ps: Number(ifpDocument.ps),
    });
}

function ifpRecovery(){
     if(localStorage.length != 0){
        for(let i = 0; i < localStorage.length; i++){
            const objectKey = localStorage.key(i);
            if(objectKey.endsWith("_IFP_DOCUMENT")){
                globalRegisterCounter++;
                const ifpDocument = JSON.parse(localStorage.getItem(objectKey));

                addToIFPSession(ifpDocument)
            }
        }

        return true;
    }

    return false;
}

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

    addToIFPSession(serialize);
}