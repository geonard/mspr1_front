const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'screens'); // Remplacez par le chemin de votre répertoire

const updateFiles = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erreur de lecture du fichier ${filePath}:`, err);
      return;
    }

    // Ajoute l'importation si elle est absente
    const importStatement = "import API_URL from './config';\n";
    let updatedData = data.includes(importStatement) ? data : importStatement + data;

    // Remplace les appels axios par ceux avec API_URL
    updatedData = updatedData.replace(/axios\.get\('http:\/\/localhost:3000/g, `axios.get(\`\${API_URL}`);

    // Écrit les modifications dans le fichier
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Erreur d'écriture dans le fichier ${filePath}:`, err);
      } else {
        console.log(`Fichier mis à jour: ${filePath}`);
      }
    });
  });
};

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error(`Erreur lors de la lecture du répertoire: ${err}`);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (file.endsWith('.js')) {
      updateFiles(filePath);
    }
  });
});
