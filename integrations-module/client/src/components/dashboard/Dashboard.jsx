import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCloud, FaCalendarAlt, FaBookOpen, FaVideo, FaExternalLinkAlt } from 'react-icons/fa';

const PageTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
`;

const GreetingText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
`;

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const IntegrationCard = styled.div`
  background-color: var(--white-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IntegrationIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const IntegrationTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  color: var(--dark-color);
`;

const IntegrationDescription = styled.p`
  font-size: 1rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const IntegrationLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const IntegrationLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3a5be2;
  }
  
  svg {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
`;

/**
 * Main dashboard component
 * @returns {React.ReactNode} Rendered component
 */
const Dashboard = () => {
  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
      <GreetingText>
        Welcome, User! This dashboard shows all available integrations.
      </GreetingText>
      
      <IntegrationsGrid>
        {/* Cloud Storage Card */}
        <IntegrationCard>
          <IntegrationIcon>
            <FaCloud />
          </IntegrationIcon>
          <IntegrationTitle>Cloud Storage</IntegrationTitle>
          <IntegrationDescription>
            Connect and manage files across Google Drive, OneDrive, and Dropbox. Upload, download, and organize your files.
          </IntegrationDescription>
          <IntegrationLinks>
            <IntegrationLink to="/storage">
              Manage Storage <FaExternalLinkAlt />
            </IntegrationLink>
          </IntegrationLinks>
        </IntegrationCard>
        
        {/* Calendar Card */}
        <IntegrationCard>
          <IntegrationIcon>
            <FaCalendarAlt />
          </IntegrationIcon>
          <IntegrationTitle>Calendar</IntegrationTitle>
          <IntegrationDescription>
            Sync and manage events from Google Calendar, iCal, and Outlook Calendar. Create, edit, and view events.
          </IntegrationDescription>
          <IntegrationLinks>
            <IntegrationLink to="/calendar">
              Manage Calendar <FaExternalLinkAlt />
            </IntegrationLink>
          </IntegrationLinks>
        </IntegrationCard>
        
        {/* LMS Card */}
        <IntegrationCard>
          <IntegrationIcon>
            <FaBookOpen />
          </IntegrationIcon>
          <IntegrationTitle>Learning Management</IntegrationTitle>
          <IntegrationDescription>
            Connect with Canvas, Blackboard, and Moodle. Access assignments, grades, and course materials.
          </IntegrationDescription>
          <IntegrationLinks>
            <IntegrationLink to="/lms">
              Manage LMS <FaExternalLinkAlt />
            </IntegrationLink>
          </IntegrationLinks>
        </IntegrationCard>
        
        {/* Video Conferencing Card */}
        <IntegrationCard>
          <IntegrationIcon>
            <FaVideo />
          </IntegrationIcon>
          <IntegrationTitle>Video Conferencing</IntegrationTitle>
          <IntegrationDescription>
            Schedule and join meetings with Zoom, Microsoft Teams, and Google Meet. Create and manage video conferences.
          </IntegrationDescription>
          <IntegrationLinks>
            <IntegrationLink to="/video">
              Manage Meetings <FaExternalLinkAlt />
            </IntegrationLink>
          </IntegrationLinks>
        </IntegrationCard>
      </IntegrationsGrid>
    </div>
  );
};

export default Dashboard; 