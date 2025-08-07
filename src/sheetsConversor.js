import fs from 'fs';

function csvToJson(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');

  const data = lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }

    values.push(current.trim().replace(/^"|"$/g, ''));

    const obj = {};
    headers.forEach((key, index) => {
      const cleanedKey = key.trim().replace(/^"|"$/g, '');
      const cleanedValue = values[index] === '.' ? null : values[index];
      obj[cleanedKey] = cleanedValue;
    });

    return obj;
  });

  return data;
}

// Exemplo de uso
const csvDataIBGE = fs.readFileSync('./src/data/Planilha nutri IBGE - 2011.csv', 'utf8');
// Substituir vírgulas decimais por pontos para número válido em JavaScript
const jsonIBGE = csvToJson(csvDataIBGE).map(row => {
  for (const key in row) {
    if (typeof row[key] === 'string' && row[key].includes(',')) {
      const num = row[key].replace(',', '.');
      row[key] = isNaN(num) ? row[key] : parseFloat(num);
    }
  }
  return row;
});

const csvDataTACO = fs.readFileSync('./src/data/Planilha nutri IBGE - 2011.csv', 'utf8');
const jsonTACO = csvToJson(csvDataTACO).map(row => {
  for (const key in row) {
    if (typeof row[key] === 'string' && row[key].includes(',')) {
      const num = row[key].replace(',', '.');
      row[key] = isNaN(num) ? row[key] : parseFloat(num);
    }
  }
  return row;
});

fs.writeFileSync("./src/data/foodStatistics.json", JSON.stringify({ibge: jsonIBGE, taco: jsonTACO}, null, 2));
