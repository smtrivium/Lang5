function addRow() {
    var tableRow = document.getElementById("ATable");
    var ad = JSON.stringify(window.adjs)
    const adjs = JSON.parse(ad)
    for (x = 0; x < adjs.length; x++) {
        var row = tableRow.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = adjs[x].name;
        cell2.innerHTML = adjs[x].age;
        cell3.innerHTML = adjs[x].gender;
    }
}