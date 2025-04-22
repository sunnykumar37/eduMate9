import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import { register, initiateGoogleAuth } from '../../services/api/authService';

// Reuse styled components from Login with some modifications
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--body-bg);
`;

const RegisterCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--dark-color);
  }
  
  p {
    color: var(--secondary-color);
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
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
      box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
    }
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #3a5be2;
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const OAuthSection = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  
  p {
    margin-bottom: 1rem;
    color: var(--secondary-color);
    position: relative;
    
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 35%;
      height: 1px;
      background-color: #ddd;
    }
    
    &::before {
      left: 0;
    }
    
    &::after {
      right: 0;
    }
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: var(--dark-color);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    margin-right: 0.5rem;
    color: #DB4437;
  }
`;

const LoginLink = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  
  a {
    color: var(--primary-color);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--danger-color);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

/**
 * Register component for user registration
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Login handler function
 * @returns {React.ReactNode} Rendered component
 */
const Register = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { name, email, password, confirmPassword } = formData;
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Don't send confirmPassword to the server
      const { confirmPassword, ...registerData } = formData;
      
      const data = await register(registerData);
      onLogin(data.token);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = initiateGoogleAuth();
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </RegisterHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </SubmitButton>
        </RegisterForm>
        
        <OAuthSection>
          <p>Or</p>
          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <FaGoogle />
            Sign up with Google
          </GoogleButton>
        </OAuthSection>
        
        <LoginLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register; 