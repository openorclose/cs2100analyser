const labTable = document.getElementById("lab-table");
const tableHead = labTable.createTHead().insertRow();
const tableBody = labTable.createTBody();
for (const columnTitle of data.lab.header) {
    const td = tableHead.insertCell();
    td.appendChild(document.createTextNode(columnTitle));
}
for (const row of data.lab.rows) {
    const tr = tableBody.insertRow();
    for (const col of row) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(col));
    }
}
