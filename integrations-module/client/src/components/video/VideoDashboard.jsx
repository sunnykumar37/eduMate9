import React, { useState } from 'react';
import styled from 'styled-components';
import { FaVideo, FaGoogle, FaMicrosoft, FaPlus, FaCheck, FaLink, FaCalendarPlus } from 'react-icons/fa';

const Container = styled.div`
  margin-bottom: 2rem;
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

const VideoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VideoCard = styled.div`
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const PlatformLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || 'var(--primary-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const PlatformName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const PlatformDescription = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => props.connected ? 'var(--success-color)' : 'var(--primary-color)'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.connected ? '#218838' : '#3a5be2'};
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${props => props.secondary ? 'transparent' : 'var(--primary-color)'};
  color: ${props => props.secondary ? 'var(--primary-color)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--primary-color)' : 'none'};
`;

const CreateMeetingContainer = styled.div`
  margin-top: 2rem;
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

const CreateMeetingTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const ServiceSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ServiceOption = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.selected ? 'rgba(74, 108, 247, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.selected ? 'var(--primary-color)' : '#ddd'};
  
  &:hover {
    background-color: rgba(74, 108, 247, 0.05);
  }
  
  span {
    margin-left: 0.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

/**
 * Video Conferencing Dashboard component
 * @returns {React.ReactNode} Rendered component
 */
const VideoDashboard = () => {
  const [zoomConnected, setZoomConnected] = useState(false);
  const [googleMeetConnected, setGoogleMeetConnected] = useState(false);
  const [teamsConnected, setTeamsConnected] = useState(false);
  
  const [selectedService, setSelectedService] = useState(null);
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    time: '',
    duration: 30,
  });
  
  const handleMeetingDataChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleConnectZoom = () => {
    alert('Connecting to Zoom...');
    // In a real implementation, this would redirect to Zoom OAuth
    window.open('https://zoom.us/oauth/authorize', '_blank');
    setZoomConnected(true);
  };
  
  const handleConnectGoogleMeet = () => {
    alert('Connecting to Google Meet...');
    // In a real implementation, this would redirect to Google OAuth
    window.open('https://meet.google.com/', '_blank');
    setGoogleMeetConnected(true);
  };
  
  const handleConnectTeams = () => {
    alert('Connecting to Microsoft Teams...');
    // In a real implementation, this would redirect to Microsoft OAuth
    window.open('https://teams.microsoft.com/', '_blank');
    setTeamsConnected(true);
  };
  
  const createMeeting = () => {
    if (!selectedService) {
      alert('Please select a video conferencing service');
      return;
    }
    
    if (!meetingData.title || !meetingData.date || !meetingData.time) {
      alert('Please fill in all meeting details');
      return;
    }
    
    const serviceMap = {
      zoom: 'Zoom',
      googleMeet: 'Google Meet',
      teams: 'Microsoft Teams'
    };
    
    alert(`Creating a ${meetingData.duration} minute meeting "${meetingData.title}" on ${serviceMap[selectedService]} for ${meetingData.date} at ${meetingData.time}`);
    
    // In a real implementation, this would send the meeting data to the server
  };
  
  return (
    <Container>
      <PageTitle>Video Conferencing Integration</PageTitle>
      <PageDescription>
        Connect with Zoom, Microsoft Teams, and Google Meet to schedule and join meetings
      </PageDescription>
      
      <VideoGridContainer>
        {/* Zoom Card */}
        <VideoCard>
          <CardHeader>
            <PlatformLogo bgColor="#2D8CFF">
              <FaVideo />
            </PlatformLogo>
            <PlatformName>Zoom</PlatformName>
          </CardHeader>
          <PlatformDescription>
            Connect to Zoom to schedule and join video conferences directly from eduMate.
          </PlatformDescription>
          <ActionButtons>
            {!zoomConnected ? (
              <Button onClick={handleConnectZoom}>
                <FaPlus /> Connect Zoom
              </Button>
            ) : (
              <>
                <Button connected>
                  <FaCheck /> Connected to Zoom
                </Button>
                <SecondaryButton secondary onClick={() => window.open('https://zoom.us/meeting', '_blank')}>
                  <FaLink /> Open Zoom
                </SecondaryButton>
              </>
            )}
          </ActionButtons>
        </VideoCard>
        
        {/* Google Meet Card */}
        <VideoCard>
          <CardHeader>
            <PlatformLogo bgColor="#00897B">
              <FaGoogle />
            </PlatformLogo>
            <PlatformName>Google Meet</PlatformName>
          </CardHeader>
          <PlatformDescription>
            Connect to Google Meet to schedule and join video conferences seamlessly.
          </PlatformDescription>
          <ActionButtons>
            {!googleMeetConnected ? (
              <Button onClick={handleConnectGoogleMeet}>
                <FaPlus /> Connect Google Meet
              </Button>
            ) : (
              <>
                <Button connected>
                  <FaCheck /> Connected to Google Meet
                </Button>
                <SecondaryButton secondary onClick={() => window.open('https://meet.google.com/', '_blank')}>
                  <FaLink /> Open Google Meet
                </SecondaryButton>
              </>
            )}
          </ActionButtons>
        </VideoCard>
        
        {/* Microsoft Teams Card */}
        <VideoCard>
          <CardHeader>
            <PlatformLogo bgColor="#6264A7">
              <FaMicrosoft />
            </PlatformLogo>
            <PlatformName>Microsoft Teams</PlatformName>
          </CardHeader>
          <PlatformDescription>
            Connect to Microsoft Teams to schedule and join video conferences directly.
          </PlatformDescription>
          <ActionButtons>
            {!teamsConnected ? (
              <Button onClick={handleConnectTeams}>
                <FaPlus /> Connect Teams
              </Button>
            ) : (
              <>
                <Button connected>
                  <FaCheck /> Connected to Teams
                </Button>
                <SecondaryButton secondary onClick={() => window.open('https://teams.microsoft.com/', '_blank')}>
                  <FaLink /> Open Teams
                </SecondaryButton>
              </>
            )}
          </ActionButtons>
        </VideoCard>
      </VideoGridContainer>
      
      <CreateMeetingContainer>
        <CreateMeetingTitle>
          <FaCalendarPlus /> Create a New Meeting
        </CreateMeetingTitle>
        
        <ServiceSelector>
          <ServiceOption 
            selected={selectedService === 'zoom'} 
            onClick={() => setSelectedService('zoom')}
            style={{ opacity: zoomConnected ? 1 : 0.5, cursor: zoomConnected ? 'pointer' : 'not-allowed' }}
            title={!zoomConnected ? 'Connect to Zoom first' : ''}
          >
            <FaVideo color="#2D8CFF" />
            <span>Zoom</span>
          </ServiceOption>
          
          <ServiceOption 
            selected={selectedService === 'googleMeet'} 
            onClick={() => setSelectedService('googleMeet')}
            style={{ opacity: googleMeetConnected ? 1 : 0.5, cursor: googleMeetConnected ? 'pointer' : 'not-allowed' }}
            title={!googleMeetConnected ? 'Connect to Google Meet first' : ''}
          >
            <FaGoogle color="#00897B" />
            <span>Google Meet</span>
          </ServiceOption>
          
          <ServiceOption 
            selected={selectedService === 'teams'} 
            onClick={() => setSelectedService('teams')}
            style={{ opacity: teamsConnected ? 1 : 0.5, cursor: teamsConnected ? 'pointer' : 'not-allowed' }}
            title={!teamsConnected ? 'Connect to Teams first' : ''}
          >
            <FaMicrosoft color="#6264A7" />
            <span>Microsoft Teams</span>
          </ServiceOption>
        </ServiceSelector>
        
        <FormGroup>
          <label htmlFor="meeting-title">Meeting Title</label>
          <input
            type="text"
            id="meeting-title"
            name="title"
            placeholder="Enter meeting title"
            value={meetingData.title}
            onChange={handleMeetingDataChange}
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="meeting-date">Date</label>
          <input
            type="date"
            id="meeting-date"
            name="date"
            value={meetingData.date}
            onChange={handleMeetingDataChange}
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="meeting-time">Time</label>
          <input
            type="time"
            id="meeting-time"
            name="time"
            value={meetingData.time}
            onChange={handleMeetingDataChange}
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="meeting-duration">Duration (minutes)</label>
          <select
            id="meeting-duration"
            name="duration"
            value={meetingData.duration}
            onChange={handleMeetingDataChange}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </FormGroup>
        
        <Button onClick={createMeeting} disabled={!selectedService}>
          <FaCalendarPlus /> Create Meeting
        </Button>
      </CreateMeetingContainer>
    </Container>
  );
};

export default VideoDashboard; 