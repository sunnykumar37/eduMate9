import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--body-bg);
  padding: 2rem;
  text-align: center;
`;

const NotFoundCode = styled.h1`
  font-size: 8rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: 700;
  line-height: 1;
`;

const NotFoundTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
`;

const NotFoundText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
  max-width: 500px;
`;

const NotFoundButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #3a5be2;
  }
`;

/**
 * 404 Not Found page
 * @returns {React.ReactNode} Rendered component
 */
const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundText>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </NotFoundText>
      <NotFoundButton to="/">Go to Dashboard</NotFoundButton>
    </NotFoundContainer>
  );
};

export default NotFound; 