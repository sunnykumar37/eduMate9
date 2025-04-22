import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaVideo, FaUsers, FaDesktop, FaComments, FaBell } from 'react-icons/fa';

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
  background-color: #ffebee;
  color: #c62828;
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
  background-color: #ffebee;
  color: #e53935;
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
  margin-bottom: 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  margin-bottom: 15px;
  background-color: ${props => props.bgcolor || '#e3f2fd'};
  color: ${props => props.color || '#1976d2'};
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 0;
`;

const ManageLink = styled(motion.a)`
  display: inline-block;
  margin-top: 12px;
  color: #3498db;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const VideoConferenceDashboard = () => {
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
        <PageTitle>Video Conferencing Integration</PageTitle>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PageDescription>
          Connect and collaborate with Zoom, Microsoft Teams, and Google Meet directly from eduMate.
        </PageDescription>
      </motion.div>

      <ComingSoonCard variants={itemVariants}>
        <StatusBadge>❗Needs Setup</StatusBadge>
        <IconWrapper 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        >
          <FaVideo />
        </IconWrapper>
        <Title>Coming Soon</Title>
        <Description>
          We're working on seamless video conferencing integration. Soon you'll be able to schedule, 
          join, and manage video meetings directly within eduMate, connecting with your favorite 
          platforms like Zoom, Microsoft Teams, and Google Meet.
        </Description>

        <FeatureGrid>
          <FeatureCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <FeatureIcon bgcolor="#e8f5e9" color="#43a047">
              <FaUsers />
            </FeatureIcon>
            <FeatureTitle>Meeting Integration</FeatureTitle>
            <FeatureDescription>
              Schedule and join meetings directly from eduMate with your preferred video conferencing platform.
            </FeatureDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage settings →
            </ManageLink>
          </FeatureCard>

          <FeatureCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <FeatureIcon bgcolor="#e3f2fd" color="#1976d2">
              <FaDesktop />
            </FeatureIcon>
            <FeatureTitle>Screen Sharing</FeatureTitle>
            <FeatureDescription>
              Share your screen during meetings to present work, collaborate on projects, or provide assistance.
            </FeatureDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn more →
            </ManageLink>
          </FeatureCard>

          <FeatureCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <FeatureIcon bgcolor="#fff8e1" color="#ff8f00">
              <FaComments />
            </FeatureIcon>
            <FeatureTitle>Chat Integration</FeatureTitle>
            <FeatureDescription>
              Access meeting chats and messages within eduMate for seamless communication.
            </FeatureDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore features →
            </ManageLink>
          </FeatureCard>

          <FeatureCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <FeatureIcon bgcolor="#e1f5fe" color="#0288d1">
              <FaBell />
            </FeatureIcon>
            <FeatureTitle>Meeting Notifications</FeatureTitle>
            <FeatureDescription>
              Receive notifications for upcoming meetings, changes, and invitations all in one place.
            </FeatureDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configure alerts →
            </ManageLink>
          </FeatureCard>
        </FeatureGrid>
      </ComingSoonCard>
    </motion.div>
  );
};

export default VideoConferenceDashboard; 