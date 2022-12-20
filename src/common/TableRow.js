export const TableRow = (columns) => {
    const tableRow = document.createElement('tr');

    columns.forEach(col => {
        let html = tableRow.innerHTML;
        if (col.fx) {
            col = fx(col);
        }
        tableRow.innerHTML = `${html}<td>${col.value}</td>`;
    });

    return tableRow;
}
