const fs = require('fs');
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

let dataBuffer = fs.readFileSync('../Prakash_Balayar_Resume.pdf');

pdfParse(dataBuffer).then(function(data) {
    fs.writeFileSync('extracted_resume.txt', data.text);
    console.log("SUCCESS - text extracted");
}).catch(err => {
    console.error("ERROR:", err.message);
});
