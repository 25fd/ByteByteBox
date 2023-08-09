// FileUploadPage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import Toast from '../components/Tost';

const FileUploadPage = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await api.uploadFile(formData);
      setSuccessMessage('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error uploading the file. Please try again.');
    }
  };

  return (
    <div>
      { (
        <div>
          <h2>Upload a File</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {successMessage && <Toast type="success" message={successMessage} />}
          {errorMessage && <Toast type="error" message={errorMessage} />}
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
