import React, { useState } from 'react';
import axios from 'axios';


const ImportCsv = () => {
  const [csvData, setCsvData] = useState(''); // Le CSV à importer

  const handleCsvUpload = async () => {
    try {
      // requête POST vers le backend pour importer le CSV
      await axios.post('./backend-node/db_meeting', { csvData }); 

      // Affichez un message de succès ou effectuez toute autre action souhaitée
      alert('CSV importé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'importation du CSV :', error);
      // Affichez un message d'erreur ou effectuez toute autre action en cas d'erreur
      alert('Erreur lors de l\'importation du CSV');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setCsvData(e.target.files[0])}
      />
      <button onClick={handleCsvUpload}>Importer CSV</button>
    </div>
  );
};

export default ImportCsv;
