import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaFileAlt, FaChartLine, FaPlus, FaClipboardCheck, FaLaptop } from 'react-icons/fa';

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
  background-color: #fff8e1;
  color: #ff8f00;
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
  background-color: #e8f5e9;
  color: #43a047;
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

const LMSCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const LMSCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

const LMSIcon = styled.div`
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

const LMSTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const LMSDescription = styled.p`
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

const LMSPlatformsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const LMSPlatformCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  padding: 1rem 1.5rem;
  cursor: pointer;
  width: 250px;
  position: relative;
`;

const PlatformIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || 'var(--primary-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const PlatformDetails = styled.div`
  flex: 1;
`;

const PlatformName = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
`;

const PlatformDescription = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
`;

const ConnectStatus = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${props => props.connected ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.connected ? '#2e7d32' : '#c62828'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const ConnectionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--dark-color)'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
`;

/**
 * LMS Dashboard component
 * @returns {React.ReactNode} Rendered component
 */
const LMSDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    apiKey: '',
    email: '',
    password: ''
  });
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);

  const lmsPlatforms = [
    {
      id: 'canvas',
      name: 'Canvas',
      description: 'Connect to your Canvas LMS',
      icon: 'C',
      bgColor: '#E21D39'
    },
    {
      id: 'moodle',
      name: 'Moodle',
      description: 'Connect to your Moodle instance',
      icon: 'M',
      bgColor: '#F98012'
    },
    {
      id: 'blackboard',
      name: 'Blackboard',
      description: 'Connect to your Blackboard Learn',
      icon: 'B',
      bgColor: '#2D3B45'
    }
  ];
  
  const handlePlatformClick = (platform) => {
    if (connectedPlatforms.includes(platform.id)) {
      // If already connected, show the platform details
      setCurrentFeature({
        title: `${platform.name} Integration Details`,
        description: `You are connected to ${platform.name}`,
        content: `Your ${platform.name} integration is active. You can access your courses, assignments, and grades directly from eduMate.`,
        platform: true
      });
      setShowFeatureModal(true);
    } else {
      // If not connected, show connection modal
      setCurrentPlatform(platform);
      setShowModal(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPlatform(null);
    setFormData({
      url: '',
      apiKey: '',
      email: '',
      password: ''
    });
  };

  const handleSubmitConnection = (e) => {
    e.preventDefault();
    if (!formData.url) {
      alert('Please enter your LMS URL');
      return;
    }

    // Simulating connection process
    setTimeout(() => {
      setConnectedPlatforms([...connectedPlatforms, currentPlatform.id]);
      alert(`Successfully connected to ${currentPlatform.name}!`);
      handleCloseModal();
    }, 1000);
  };

  const handleExploreFeatures = () => {
    // Check if at least one platform is connected
    if (connectedPlatforms.length === 0) {
      alert('Please connect at least one LMS platform first to explore features.');
      return;
    }
    
    setCurrentFeature({
      title: "Course Integration",
      description: "Access and manage your courses from various LMS platforms in one centralized location.",
      content: "With course integration, you can view all your courses in one place, see upcoming assignments, track your progress, and get notifications for new content.",
      demoView: true
    });
    setShowFeatureModal(true);
  };

  const handleConfigureSettings = () => {
    // Check if at least one platform is connected
    if (connectedPlatforms.length === 0) {
      alert('Please connect at least one LMS platform first to configure settings.');
      return;
    }
    
    setCurrentFeature({
      title: "Assignment Sync",
      description: "Automatically sync assignments and due dates from your LMS to your eduMate calendar.",
      content: "Configure which courses to sync, how often to update assignments, and set custom reminder notifications for upcoming due dates.",
      demoView: true
    });
    setShowFeatureModal(true);
  };

  const handleViewDemo = () => {
    setCurrentFeature({
      title: "Grade Tracking",
      description: "Monitor your academic performance with real-time grade updates from your LMS.",
      content: "Our grade tracking feature allows you to see your current grades, track your progress over time with visual charts, and receive alerts when new grades are posted.",
      demoView: true
    });
    setShowFeatureModal(true);
  };

  const handleLearnMore = () => {
    setCurrentFeature({
      title: "Learning Resources",
      description: "Access course materials, readings, and resources from your LMS directly in eduMate.",
      content: "All your course materials are organized by class and topic. Search across all resources, bookmark important materials, and download for offline access.",
      demoView: true
    });
    setShowFeatureModal(true);
  };

  const handleCloseFeatureModal = () => {
    setShowFeatureModal(false);
    setCurrentFeature(null);
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
        <PageTitle>LMS Integration</PageTitle>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PageDescription>
          Connect to popular Learning Management Systems like Canvas, Blackboard, and Moodle.
        </PageDescription>
      </motion.div>

      <ComingSoonCard variants={itemVariants}>
        <StatusBadge>⚡ Active</StatusBadge>
        <IconWrapper 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        >
          <FaGraduationCap />
        </IconWrapper>
        <Title>LMS Integration</Title>
        <Description>
          Connect to popular learning management systems like Canvas, Blackboard, and Moodle directly from eduMate.
          Start by connecting your LMS platforms below.
        </Description>

        <LMSPlatformsContainer>
          {lmsPlatforms.map(platform => (
            <LMSPlatformCard 
              key={platform.id} 
              onClick={() => handlePlatformClick(platform)}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
              }}
              variants={itemVariants}
            >
              <PlatformIcon bgColor={platform.bgColor}>{platform.icon}</PlatformIcon>
              <PlatformDetails>
                <PlatformName>{platform.name}</PlatformName>
                <PlatformDescription>Connect to {platform.name}</PlatformDescription>
              </PlatformDetails>
              <ConnectStatus connected={connectedPlatforms.includes(platform.id)}>
                {connectedPlatforms.includes(platform.id) ? '✅ Connected' : '❗ Setup Required'}
              </ConnectStatus>
            </LMSPlatformCard>
          ))}
        </LMSPlatformsContainer>

        <LMSCardGrid>
          <LMSCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <LMSIcon bgcolor="#e8f5e9" color="#43a047">
              <FaBook />
            </LMSIcon>
            <LMSTitle>Course Integration</LMSTitle>
            <LMSDescription>
              Access and manage your courses from various LMS platforms in one centralized location.
            </LMSDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreFeatures}
            >
              Explore features →
            </ManageLink>
          </LMSCard>

          <LMSCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <LMSIcon bgcolor="#e3f2fd" color="#1976d2">
              <FaClipboardCheck />
            </LMSIcon>
            <LMSTitle>Assignment Sync</LMSTitle>
            <LMSDescription>
              Automatically sync assignments and due dates from your LMS to your eduMate calendar.
            </LMSDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfigureSettings}
            >
              Configure settings →
            </ManageLink>
          </LMSCard>

          <LMSCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <LMSIcon bgcolor="#fff8e1" color="#ff8f00">
              <FaChartLine />
            </LMSIcon>
            <LMSTitle>Grade Tracking</LMSTitle>
            <LMSDescription>
              Monitor your academic performance with real-time grade updates from your LMS.
            </LMSDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDemo}
            >
              View demo →
            </ManageLink>
          </LMSCard>

          <LMSCard 
            variants={itemVariants}
            whileHover={{ 
              y: -5, 
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <LMSIcon bgcolor="#f3e5f5" color="#9c27b0">
              <FaLaptop />
            </LMSIcon>
            <LMSTitle>Learning Resources</LMSTitle>
            <LMSDescription>
              Access course materials, readings, and resources from your LMS directly in eduMate.
            </LMSDescription>
            <ManageLink 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
            >
              Learn more →
            </ManageLink>
          </LMSCard>
        </LMSCardGrid>
      </ComingSoonCard>

      {showModal && (
        <ConnectionModal>
          <ModalContent>
            <ModalTitle>Connect to {currentPlatform?.name}</ModalTitle>
            <form onSubmit={handleSubmitConnection}>
              <FormGroup>
                <label htmlFor="url">LMS URL</label>
                <input 
                  type="text" 
                  id="url" 
                  name="url" 
                  placeholder={`https://your${currentPlatform?.id.toLowerCase()}.com`}
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="apiKey">API Key (Optional)</label>
                <input 
                  type="text" 
                  id="apiKey" 
                  name="apiKey" 
                  placeholder="Your API key" 
                  value={formData.apiKey}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Your password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="button" onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" primary>Connect</Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ConnectionModal>
      )}

      {showFeatureModal && (
        <ConnectionModal>
          <ModalContent>
            <ModalTitle>{currentFeature?.title}</ModalTitle>
            <p style={{ fontWeight: '500', color: '#666', marginBottom: '1rem' }}>{currentFeature?.description}</p>
            
            {currentFeature?.platform ? (
              <div>
                <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>{currentFeature?.content}</p>
                
                <div style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  marginBottom: '20px' 
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Connection Status</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Status:</span>
                    <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span>Last Sync:</span>
                    <span>Just now</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span>Courses:</span>
                    <span>5 active</span>
                  </div>
                </div>
                
                <Button type="button" primary onClick={handleCloseFeatureModal} style={{ width: '100%' }}>
                  Manage Connection
                </Button>
              </div>
            ) : (
              <>
                <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>{currentFeature?.content}</p>
                
                {currentFeature?.demoView && (
                  <div style={{ marginBottom: '20px' }}>
                    {currentFeature?.title === "Course Integration" && (
                      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                          <h4 style={{ margin: '0' }}>Your Courses</h4>
                        </div>
                        <div style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontWeight: '500' }}>CS 101: Introduction to Programming</span>
                            <span style={{ color: '#2e7d32' }}>Active</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontWeight: '500' }}>MATH 201: Calculus II</span>
                            <span style={{ color: '#2e7d32' }}>Active</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontWeight: '500' }}>PHYS 101: Physics for Scientists</span>
                            <span style={{ color: '#2e7d32' }}>Active</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentFeature?.title === "Assignment Sync" && (
                      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                          <h4 style={{ margin: '0' }}>Sync Settings</h4>
                        </div>
                        <div style={{ padding: '15px' }}>
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Sync Frequency</label>
                            <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                              <option>Every 30 minutes</option>
                              <option>Every hour</option>
                              <option>Every 3 hours</option>
                              <option>Once a day</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Notification Settings</label>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                              <input type="checkbox" id="dueDateNotif" checked readOnly />
                              <label htmlFor="dueDateNotif" style={{ marginLeft: '8px' }}>Due date reminders</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input type="checkbox" id="newAssignNotif" checked readOnly />
                              <label htmlFor="newAssignNotif" style={{ marginLeft: '8px' }}>New assignment notifications</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentFeature?.title === "Grade Tracking" && (
                      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                          <h4 style={{ margin: '0' }}>Grade Overview</h4>
                        </div>
                        <div style={{ padding: '15px' }}>
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <span>CS 101:</span>
                              <span style={{ fontWeight: 'bold' }}>92% (A-)</span>
                            </div>
                            <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '92%', height: '100%', backgroundColor: '#4caf50' }}></div>
                            </div>
                          </div>
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <span>MATH 201:</span>
                              <span style={{ fontWeight: 'bold' }}>87% (B+)</span>
                            </div>
                            <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '87%', height: '100%', backgroundColor: '#4caf50' }}></div>
                            </div>
                          </div>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <span>PHYS 101:</span>
                              <span style={{ fontWeight: 'bold' }}>78% (C+)</span>
                            </div>
                            <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: '78%', height: '100%', backgroundColor: '#ff9800' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentFeature?.title === "Learning Resources" && (
                      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f5f5f5' }}>
                          <h4 style={{ margin: '0' }}>Course Materials</h4>
                        </div>
                        <div style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ marginRight: '10px', color: '#f44336' }}>📄</div>
                            <span>Week 3 - Python Functions.pdf</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ marginRight: '10px', color: '#2196f3' }}>📄</div>
                            <span>Assignment 2 - Data Structures.docx</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ marginRight: '10px', color: '#4caf50' }}>📄</div>
                            <span>Lecture Notes - Algorithms.pptx</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                            <div style={{ marginRight: '10px', color: '#ff9800' }}>📄</div>
                            <span>Study Guide - Midterm Exam.pdf</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <ButtonGroup>
                  <Button type="button" onClick={handleCloseFeatureModal}>Close</Button>
                  {connectedPlatforms.length > 0 ? (
                    <Button type="button" primary onClick={handleCloseFeatureModal}>
                      {currentFeature?.title === "Grade Tracking" ? "View Full Report" : 
                      currentFeature?.title === "Assignment Sync" ? "Save Settings" :
                      "Access Now"}
                    </Button>
                  ) : (
                    <Button type="button" primary onClick={() => {
                      handleCloseFeatureModal();
                      setCurrentPlatform(lmsPlatforms[0]);
                      setShowModal(true);
                    }}>
                      Connect an LMS
                    </Button>
                  )}
                </ButtonGroup>
              </>
            )}
          </ModalContent>
        </ConnectionModal>
      )}
    </motion.div>
  );
};

export default LMSDashboard; 