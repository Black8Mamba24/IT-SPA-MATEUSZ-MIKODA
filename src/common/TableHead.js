export const TableHead = (columnsHeaders) => {
    const tableHead = document.createElement('tr');

    columnsHeaders.forEach(header => {
        let html = tableHead.innerHTML;
        tableHead.innerHTML = `${html}<th>${header}</th>`;
    });

    return tableHead;
}
