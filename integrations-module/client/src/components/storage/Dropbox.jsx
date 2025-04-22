import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaFolder, FaFile, FaDownload, FaTrash, FaUpload, FaPlus, FaDropbox } from 'react-icons/fa';

// Styled components
const Container = styled.div`
  margin-bottom: 2rem;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'var(--white-color)'};
  color: ${props => props.primary ? 'var(--white-color)' : 'var(--dark-color)'};
  border: 1px solid ${props => props.primary ? 'var(--primary-color)' : '#ddd'};
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a5be2' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  width: 260px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilesTable = styled.div`
  background-color: var(--white-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: auto 120px 120px 100px;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
  
  @media (max-width: 768px) {
    grid-template-columns: auto 80px;
  }
`;

const TableHeaderCell = styled.div`
  &:first-child {
    padding-left: 0.5rem;
  }
  
  @media (max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;

const TableBody = styled.div`
  max-height: 450px;
  overflow-y: auto;
`;

const FileRow = styled.div`
  display: grid;
  grid-template-columns: auto 120px 120px 100px;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: auto 80px;
  }
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 0.5rem;
  
  svg {
    font-size: 1.2rem;
    color: ${props => props.isFolder ? '#ffc107' : '#6c757d'};
  }
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FileCell = styled.div`
  @media (max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;

const ActionButtonsCell = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.danger ? 'rgba(220, 53, 69, 0.1)' : 'rgba(74, 108, 247, 0.1)'};
  color: ${props => props.danger ? 'var(--danger-color)' : 'var(--primary-color)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.danger ? 'rgba(220, 53, 69, 0.2)' : 'rgba(74, 108, 247, 0.2)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const ConnectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const ConnectIcon = styled.div`
  font-size: 3rem;
  color: #0061FF;
  margin-bottom: 1.5rem;
`;

const ConnectTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const ConnectDescription = styled.p`
  font-size: 1.1rem;
  color: var(--secondary-color);
  max-width: 500px;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ConnectButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #0061FF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0052D9;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const AccountAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const AccountDetails = styled.div`
  flex: 1;
`;

const AccountName = styled.div`
  font-weight: 500;
`;

const AccountEmail = styled.div`
  font-size: 0.9rem;
  color: var(--secondary-color);
`;

const StorageUsage = styled.div`
  font-size: 0.9rem;
`;

const DisconnectButton = styled.button`
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: var(--danger-color);
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * Dropbox component
 * @returns {React.ReactNode} Rendered component
 */
const Dropbox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [files, setFiles] = useState([
    { 
      id: '1', 
      name: 'Photos', 
      size: null, 
      modifiedTime: '2023-07-10T15:30:00Z', 
      mimeType: 'folder' 
    },
    { 
      id: '2', 
      name: 'Resume Latest.pdf', 
      size: 1024 * 512, 
      modifiedTime: '2023-07-08T13:20:00Z', 
      mimeType: 'application/pdf' 
    },
    { 
      id: '3', 
      name: 'Client Presentation.pptx', 
      size: 1024 * 1024 * 4.2, 
      modifiedTime: '2023-07-05T09:15:00Z', 
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    },
    { 
      id: '4', 
      name: 'Project Documentation.docx', 
      size: 1024 * 1024 * 1.7, 
      modifiedTime: '2023-06-30T10:45:00Z', 
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    }
  ]);
  
  const uploadInputRef = useRef();
  
  const handleConnect = () => {
    // Simulate Dropbox OAuth flow
    setTimeout(() => {
      setConnected(true);
      setUserInfo({
        name: 'Sarah Miller',
        email: 'sarah.miller@example.com',
        avatar: null,
        storageUsed: '1.8 GB',
        storageLimit: '2 GB'
      });
    }, 1000);
  };
  
  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect from Dropbox?')) {
      setConnected(false);
      setUserInfo(null);
    }
  };
  
  // Handle file selection for upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newFile = {
        id: `file-${Date.now()}`,
        name: selectedFile.name,
        size: selectedFile.size,
        modifiedTime: new Date().toISOString(),
        mimeType: selectedFile.type
      };
      
      setFiles([newFile, ...files]);
      setSelectedFile(null);
      setUploading(false);
      
      // Reset the file input
      if (uploadInputRef.current) {
        uploadInputRef.current.value = '';
      }
    }, 1500);
  };
  
  // Handle file download
  const handleDownload = (fileId) => {
    const file = files.find(f => f.id === fileId);
    alert(`Downloading ${file.name} from Dropbox...`);
  };
  
  // Handle file deletion
  const handleDelete = (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(file => file.id !== fileId));
    }
  };
  
  // Filter files based on search term
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format file size
  const formatFileSize = (size) => {
    if (!size) return 'N/A';
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let formattedSize = parseInt(size, 10) || 0;
    let unitIndex = 0;
    
    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
      formattedSize /= 1024;
      unitIndex++;
    }
    
    return `${formattedSize.toFixed(1)} ${units[unitIndex]}`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Create a new folder
  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: folderName,
        size: null,
        modifiedTime: new Date().toISOString(),
        mimeType: 'folder'
      };
      
      setFiles([newFolder, ...files]);
    }
  };
  
  if (!connected) {
    return (
      <Container>
        <ConnectSection>
          <ConnectIcon>
            <FaDropbox />
          </ConnectIcon>
          <ConnectTitle>Connect to Dropbox</ConnectTitle>
          <ConnectDescription>
            Connect to your Dropbox account to access and manage your files directly from this platform.
            You'll be able to upload, download, and organize your files seamlessly.
          </ConnectDescription>
          <ConnectButton onClick={handleConnect}>
            <FaDropbox /> Connect Dropbox
          </ConnectButton>
        </ConnectSection>
      </Container>
    );
  }
  
  return (
    <Container>
      {userInfo && (
        <AccountInfo>
          <AccountAvatar src={userInfo.avatar}>
            {!userInfo.avatar && userInfo.name.charAt(0)}
          </AccountAvatar>
          <AccountDetails>
            <AccountName>{userInfo.name}</AccountName>
            <AccountEmail>{userInfo.email}</AccountEmail>
          </AccountDetails>
          <StorageUsage>
            {userInfo.storageUsed} used of {userInfo.storageLimit}
          </StorageUsage>
          <DisconnectButton onClick={handleDisconnect}>
            Disconnect
          </DisconnectButton>
        </AccountInfo>
      )}
      
      <ActionBar>
        <SearchInput
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ActionButtons>
          <Button onClick={handleCreateFolder}>
            <FaFolder /> New Folder
          </Button>
          <Button onClick={() => uploadInputRef.current.click()}>
            <FaUpload /> Select File
          </Button>
          <UploadInput
            type="file"
            ref={uploadInputRef}
            onChange={handleFileChange}
          />
          <Button 
            primary 
            onClick={handleUpload} 
            disabled={!selectedFile || uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </ActionButtons>
      </ActionBar>
      
      {selectedFile && (
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
          Selected file: <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})
        </div>
      )}
      
      <FilesTable>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Size</TableHeaderCell>
          <TableHeaderCell>Modified</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredFiles.map(file => (
            <FileRow key={file.id}>
              <FileName isFolder={file.mimeType === 'folder'}>
                {file.mimeType === 'folder' ? <FaFolder /> : <FaFile />}
                <span>{file.name}</span>
              </FileName>
              <FileCell>{formatFileSize(file.size)}</FileCell>
              <FileCell>{formatDate(file.modifiedTime)}</FileCell>
              <ActionButtonsCell>
                {file.mimeType !== 'folder' && (
                  <IconButton onClick={() => handleDownload(file.id)}>
                    <FaDownload />
                  </IconButton>
                )}
                <IconButton danger onClick={() => handleDelete(file.id)}>
                  <FaTrash />
                </IconButton>
              </ActionButtonsCell>
            </FileRow>
          ))}
          {filteredFiles.length === 0 && (
            <FileRow>
              <div style={{ gridColumn: '1 / 5', padding: '1rem', textAlign: 'center' }}>
                No files found matching your search.
              </div>
            </FileRow>
          )}
        </TableBody>
      </FilesTable>
    </Container>
  );
};

export default Dropbox; 