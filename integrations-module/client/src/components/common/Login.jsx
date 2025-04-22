import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import { login, initiateGoogleAuth } from '../../services/api/authService';

// Styled components for login page
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--body-bg);
`;

const LoginCard = styled.div`
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const LoginHeader = styled.div`
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

const LoginForm = styled.form`
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

const RegisterLink = styled.div`
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
 * Login component for user authentication
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Login handler function
 * @returns {React.ReactNode} Rendered component
 */
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { email, password } = formData;
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const data = await login(formData);
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
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <h1>Welcome Back</h1>
          <p>Sign in to continue</p>
        </LoginHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginForm onSubmit={handleSubmit}>
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
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </LoginForm>
        
        <OAuthSection>
          <p>Or</p>
          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <FaGoogle />
            Sign in with Google
          </GoogleButton>
        </OAuthSection>
        
        <RegisterLink>
          Don't have an account? <Link to="/register">Sign up</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 