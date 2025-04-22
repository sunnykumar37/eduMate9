import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendarAlt, FaBookOpen, FaVideo, FaBars } from 'react-icons/fa';

// Styled components for the layout
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TopNavbar = styled.div`
  background-color: var(--dark-color);
  color: var(--white-color);
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 2rem;
  color: var(--white-color);
`;

const NavbarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--dark-color);
    z-index: 10;
  }
`;

const NavbarMenuItem = styled.li`
  margin-right: 1rem;
  
  a {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--light-color);
    text-decoration: none;
    transition: var(--transition);
    border-radius: 4px;
    
    &:hover, &.active {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--white-color);
    }
    
    svg {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    
    a {
      width: 100%;
    }
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: var(--white-color);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
  }
`;

const Content = styled.div`
  flex: 1;
  background-color: var(--body-bg);
`;

const MainContent = styled.main`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Layout component with horizontal navbar and main content area
 * @returns {React.ReactNode} Rendered component
 */
const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <LayoutContainer>
      <TopNavbar>
        <Logo><strong>Cross-Platform Integration</strong></Logo>
      </TopNavbar>
      <Content>
        <MainContent>
          <Outlet />
        </MainContent>
      </Content>
    </LayoutContainer>
  );
};

export default Layout; 