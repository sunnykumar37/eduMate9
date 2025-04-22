import React from 'react';
import styled from 'styled-components';
import { FaVideo, FaUsers, FaDesktop, FaComments } from 'react-icons/fa';

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

const ComingSoonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 3rem 2rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--secondary-color);
  max-width: 600px;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white-color);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: not-allowed;
  opacity: 0.8;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-color);
  text-align: center;
`;

/**
 * Video Conferencing Dashboard component
 * @returns {React.ReactNode} Rendered component
 */
const VideoConferencingDashboard = () => {
  const videoFeatures = [
    {
      id: 1,
      icon: <FaVideo />,
      title: 'Virtual Classrooms',
      description: 'Host and join virtual classrooms with video, audio, and chat'
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: 'Group Collaboration',
      description: 'Create breakout rooms for team discussions and group work'
    },
    {
      id: 3,
      icon: <FaDesktop />,
      title: 'Screen Sharing',
      description: 'Share your screen for presentations and demonstrations'
    },
    {
      id: 4,
      icon: <FaComments />,
      title: 'Live Chat',
      description: 'Communicate via text chat during video sessions'
    }
  ];
  
  return (
    <Container>
      <PageTitle>Video Conferencing Integration</PageTitle>
      <PageDescription>
        Connect with popular video conferencing platforms for virtual classrooms and meetings
      </PageDescription>
      
      <ComingSoonCard>
        <IconWrapper>
          <FaVideo />
        </IconWrapper>
        <Title>Video Conferencing</Title>
        <Description>
          Our video conferencing integration will allow you to seamlessly connect with Zoom, Microsoft Teams, and Google Meet for virtual classrooms, meetings, and office hours.
        </Description>
        
        <FeatureGrid>
          {videoFeatures.map(feature => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </ComingSoonCard>
    </Container>
  );
};

export default VideoConferencingDashboard; 