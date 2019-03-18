const https = require("https");
const fs = require("fs");
const pdf_table_extractor = require("pdf-table-extractor");

const URLS = Object.freeze({
    LAB: "https://www.comp.nus.edu.sg/~cs2100/3_ca/cs2100_18s2_lab5_marks.pdf",
    TEMP: `temp.pdf`
});

const errorHandler = console.log.bind(console);

const download = (from, to, callback) => {
    const file = fs.createWriteStream(to);
    https.get(from, response => {
        response.pipe(file);
        file.on("finish", file.close.bind(file, callback));
    })
};

//PDF parsed
function success(result) {
    const rows = result.pageTables.reduce((acc, {tables}) => acc.concat(tables.slice(1)), []);
    const data = {lab: {rows, header: result.pageTables[0].tables[0]}}
    console.log(rows, rows.length);
    fs.writeFile('data.js', "const data = " + JSON.stringify(data) + ";", 'utf8', errorHandler);
}

download(URLS.LAB, URLS.TEMP, () => {
    pdf_table_extractor(URLS.TEMP, success, errorHandler);
});

