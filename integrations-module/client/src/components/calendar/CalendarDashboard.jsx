import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaGoogle, FaApple, FaMicrosoft, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 30px;
`;

const ComingSoonCard = styled(motion.div)`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 4px 10px;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f3e5f5;
  color: #9c27b0;
  font-size: 40px;
  margin: 0 auto 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const Description = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const ConnectButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ConnectButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.bgcolor || '#f8f9fa'};
  color: ${props => props.color || '#2c3e50'};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

/**
 * Calendar Dashboard component
 * @returns {React.ReactNode} Rendered component
 */
const CalendarDashboard = () => {
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

  const handleConnectGoogle = () => {
    alert('Connecting to Google Calendar...');
  };
  
  const handleConnectApple = () => {
    alert('Connecting to Apple Calendar...');
  };
  
  const handleConnectOutlook = () => {
    alert('Connecting to Outlook Calendar...');
  };
  
  const handleConnectOther = () => {
    alert('Connect another calendar...');
  };
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      component={Container}
    >
      <motion.div variants={itemVariants}>
        <PageTitle>Calendar Integration</PageTitle>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PageDescription>
          Sync and manage your events from Google Calendar, iCal, and Outlook Calendar.
        </PageDescription>
      </motion.div>

      <ComingSoonCard variants={itemVariants}>
        <StatusBadge>✅ Connected</StatusBadge>
        <IconWrapper 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        >
          <FaCalendarAlt />
        </IconWrapper>
        <Title>Coming Soon</Title>
        <Description>
          We're working on seamless calendar integration. Soon you'll be able to sync, view, and manage 
          your calendars from various providers directly within eduMate.
        </Description>

        <ConnectButtonsContainer>
          <ConnectButton 
            bgcolor="#f3e5f5" 
            color="#9c27b0" 
            onClick={handleConnectGoogle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGoogle /> Google Calendar
          </ConnectButton>
          <ConnectButton 
            bgcolor="#e8f5e9" 
            color="#43a047" 
            onClick={handleConnectApple}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaApple /> Apple Calendar
          </ConnectButton>
          <ConnectButton 
            bgcolor="#e3f2fd" 
            color="#1976d2" 
            onClick={handleConnectOutlook}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMicrosoft /> Outlook Calendar
          </ConnectButton>
          <ConnectButton 
            onClick={handleConnectOther}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Other Calendar
          </ConnectButton>
        </ConnectButtonsContainer>
      </ComingSoonCard>
    </motion.div>
  );
};

export default CalendarDashboard; 