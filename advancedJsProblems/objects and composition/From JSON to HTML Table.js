function JSONtoHTML(str) {
    const objectsArr = JSON.parse(str);
    const header = `<tr>${Object.keys(objectsArr[0]).map(k => `<th>${escapeHtml(k)}</th>`).join('')}</tr>`;
    

    const tableRows = objectsArr.map(obj => `<tr>${Object.values(obj).map(v => `<td>${escapeHtml(String(v))}</td>`).join('')}</tr>`).join('\n');

    function escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
    return `<table>
    ${header}
    ${tableRows}
</table>`
}
console.log(JSONtoHTML(`[{"Name":"Stamat>",
"Score":5.5},
{"Name":"Rumen",
"Score":6}]`

));
