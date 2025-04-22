import { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle, FaMicrosoft, FaDropbox } from 'react-icons/fa';
import { motion } from 'framer-motion';
import StorageTabs from './StorageTabs';
import GoogleDrive from './GoogleDrive';
import OneDrive from './OneDrive';
import Dropbox from './Dropbox';

const Container = styled.div`
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
`;

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  margin-right: 10px;
  background-color: ${props => props.bgcolor || '#e3f2fd'};
  color: ${props => props.color || '#1976d2'};
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => {
    if (props.status === 'connected') return '#e8f5e9';
    if (props.status === 'active') return '#fff8e1';
    return '#ffebee';
  }};
  color: ${props => {
    if (props.status === 'connected') return '#2e7d32';
    if (props.status === 'active') return '#ff8f00';
    return '#c62828';
  }};
  margin-left: 8px;
`;

/**
 * Storage Dashboard component with tabs for different cloud storage providers
 * @returns {React.ReactNode} Rendered component
 */
const StorageDashboard = () => {
  const [activeTab, setActiveTab] = useState('google');
  
  const tabs = [
    { 
      id: 'google', 
      label: 'Google Drive', 
      icon: (
        <IconCircle bgcolor="#e8f5e9" color="#43a047">
          <FaGoogle />
        </IconCircle>
      ), 
      status: 'connected'
    },
    { 
      id: 'onedrive', 
      label: 'OneDrive', 
      icon: (
        <IconCircle bgcolor="#e3f2fd" color="#1976d2">
          <FaMicrosoft />
        </IconCircle>
      ),
      status: 'active'
    },
    { 
      id: 'dropbox', 
      label: 'Dropbox', 
      icon: (
        <IconCircle bgcolor="#e1f5fe" color="#0288d1">
          <FaDropbox />
        </IconCircle>
      ),
      status: 'setup'
    }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'google':
        return <GoogleDrive />;
      case 'onedrive':
        return <OneDrive />;
      case 'dropbox':
        return <Dropbox />;
      default:
        return <GoogleDrive />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      component={Container}
    >
      <motion.div variants={itemVariants}>
        <PageTitle>Cloud Storage Integration</PageTitle>
      </motion.div>
      <motion.div variants={itemVariants}>
        <PageDescription>
          Connect and manage your files across multiple cloud storage providers
        </PageDescription>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StorageTabs 
          tabs={tabs.map(tab => ({
            ...tab,
            content: (
              <>
                {tab.label}
                <StatusBadge status={tab.status}>
                  {tab.status === 'connected' ? '✅ Connected' : 
                   tab.status === 'active' ? '⚡ Active' : '❗Needs Setup'}
                </StatusBadge>
              </>
            )
          }))}
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        {renderTabContent()}
      </motion.div>
    </motion.div>
  );
};

export default StorageDashboard; 