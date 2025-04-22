import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--secondary-color)'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    color: var(--primary-color);
    background-color: #f5f5f5;
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Storage tabs component
 * @param {Object} props Component props
 * @param {Array} props.tabs Array of tab objects
 * @param {string} props.activeTab ID of the active tab
 * @param {Function} props.onTabChange Function to call when a tab is clicked
 * @returns {React.ReactNode} Rendered component
 */
const StorageTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabsContainer>
      {tabs.map(tab => (
        <motion.div
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Tab
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            <TabContent>
              {tab.icon}
              {tab.content || tab.label}
            </TabContent>
          </Tab>
        </motion.div>
      ))}
    </TabsContainer>
  );
};

export default StorageTabs; 