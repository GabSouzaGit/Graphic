function tableAppending(axios, ...dataToAppend){
    const td = (content = null) => {
        const t = document.createElement('td');
        
        if(content != null) t.textContent = content;

        return t;
    }

    const tr = document.createElement('tr');

    const nameColumn = td(),
          idColumn = td();
        
    nameColumn.textContent = dataToAppend[0];
    const idTableElement = document.createElement('div');
    
    idTableElement.classList.add("id-table");
    idTableElement.style = `background-color: ${dataToAppend[1]}`

    const tdColor = document.createElement("td");
    tdColor.appendChild(idTableElement);

    tr.append(nameColumn, tdColor);

    for(let i = 2; i < dataToAppend.length; i++){
        const column = td(dataToAppend[i].toFixed(1));
        tr.appendChild(column);
    }
    
    const xavg = td(axios.xavg.toFixed(1));
    const yavg = td(axios.yavg.toFixed(1));
    tr.append(xavg, yavg);

    historic.appendChild(tr);
}
