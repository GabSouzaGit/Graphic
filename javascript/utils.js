function getAvgByAxios(pts, bd, rs, ps){
    return {
        xavg: (Number(pts) + Number(bd)) / 2,
        yavg: (Number(rs) + Number(ps)) / 2
    }
}

function verifyNumberField(value){
     if(value == "" || value.trim() == ""){
        alert("Preencha todos os campos.")
        return false;
    }

    let n_value = Number(value);
    
    if(n_value == NaN){
        console.log(n_value)
        alert("Os valores precisam ser numéricos.");
        return false;
    }
    
    if(n_value > 10
    || n_value < 0
    ){
        alert("Os valores devem ser de 0 a 10.");
        return false;
    }

    return true;
}

function verifyTextField(value){
    if(value == "" || value.trim() == ""){
        alert("Preencha todos os campos.");
        return false;
    }

    return true;
}