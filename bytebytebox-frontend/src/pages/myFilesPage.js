// MyFilesPage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api'; // Create a new API function to fetch user files
import '../styles/myFilePage.css';
import Toast from '../components/Tost';

const MyFilesPage = () => {
  const { user } = useAuth();
  const [ownedFiles, setOwnedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareReadPermission, setShareReadPermission] = useState(false);
  const [shareWritePermission, setShareWritePermission] = useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');
  const [fileId, setFileId] = useState('');

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await api.getUserFilesApi();
        console.log(response.ownedFiles);
        console.log(response.sharedFiles);
        setOwnedFiles(response.ownedFiles);
        setSharedFiles(response.sharedFiles);
      } catch (error) {
        console.error('Error fetching user files:', error);
      }
    };

    if (user) {
      fetchUserFiles();
    }
    
  }, [user]);
  const handleShare = async () => {
   await api.shareFileApi(
        fileId,
        shareEmail,
        shareReadPermission,
        shareWritePermission
      );
  };

  const handleShareModal = (fileId, showModal) => {
    setFileId(fileId);
    setShowShareModal(showModal);
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await api.deleteFileApi(fileId);
      if (response.message) {
        setMessage(response.message);
        setType('success')
      } else {
        setMessage(response.error);
        setType('error');
      }
      const files = await api.getUserFilesApi();
        setOwnedFiles(files.ownedFiles);
        setSharedFiles(files.sharedFiles);
    } catch (error) {
       console.log(error);
    }
    setShowToast(true);
  }
  return (
    <div>
    <h2>My Files</h2>
    <div>
      <h3>Owned Files:</h3>
      <ul>
        {ownedFiles.map((file) => (
          <li key={file._id}>
            {file.name} -{' '}
            <a href={file.url} download>
              Download
            </a>{' '}
            - <button onClick={() => handleShareModal(file._id,true)}>Share</button>
            - <button onClick={() => handleDelete(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3>Shared Files:</h3>
      <ul>
        {sharedFiles.map((file) => (
          <li key={file._id}>
            {file.name} -{' '}
            <a href={file.url} download>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
    {showShareModal && (
        <div className="share-modal">
          <div className="share-content">
            <h2>Share File</h2>
            <input
              type="email"
              placeholder="Enter email"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <label>
              Read Permission
              <input
                type="checkbox"
                checked={shareReadPermission}
                onChange={() =>
                  setShareReadPermission(!shareReadPermission)
                }
              />
            </label>
            <label>
              Write Permission
              <input
                type="checkbox"
                checked={shareWritePermission}
                onChange={() =>
                  setShareWritePermission(!shareWritePermission)
                }
              />
            </label>
            <button onClick={() => handleShare()}>Share</button>
            <button onClick={() => handleShareModal('', false)}>Cancel</button>
          </div>
        </div>
      )}
      {showToast && (
        <Toast
          message={message}
          type={type}
          onClose={() => setShowToast(false)}
        />
      )}
  </div>
  );
};

export default MyFilesPage;
