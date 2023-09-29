import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('csvData', selectedFile);

      const response = await axios.post('/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Imported data:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div>
          <h2>Import CSV</h2>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload}>Import</button>
      </div>
      <div className='table'>
        <table></table>
      </div>
    </div>
    

    

    
  );
}

export default App;
