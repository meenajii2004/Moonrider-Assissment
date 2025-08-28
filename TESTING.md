# Testing Documentation

This document provides comprehensive information about the testing setup for the Moonrider Dashboard project.

## Overview

The project uses Jest as the primary testing framework for both frontend and backend, with additional libraries for specific testing needs:

- **Frontend**: Jest + React Testing Library + User Event
- **Backend**: Jest + Supertest + MongoDB Memory Server

## Test Structure

```
Moonrider-Assissment/
├── src/
│   ├── __tests__/                    # Frontend test files
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── services/
│   ├── setupTests.ts                 # Frontend test setup
│   └── jest.config.ts               # Frontend Jest config
├── backend/
│   ├── __tests__/                    # Backend test files
│   │   ├── setup.js                  # Backend test setup
│   │   ├── auth.test.js             # Auth route tests
│   │   ├── users.test.js            # User route tests
│   │   └── middleware.test.js       # Middleware tests
│   └── jest.config.js               # Backend Jest config
├── run-tests.sh                     # Test runner script
└── TESTING.md                       # This file
```

## Running Tests

### Quick Start

```bash
# Run all tests
./run-tests.sh

# Run only frontend tests
./run-tests.sh frontend

# Run only backend tests
./run-tests.sh backend
```

### Manual Commands

#### Frontend Tests
```bash
cd src
npm test                    # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
npm test -- --watchAll=false  # Run tests once
```

#### Backend Tests
```bash
cd backend
npm test                    # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
npm test -- --watchAll=false  # Run tests once
```

## Test Configuration

### Frontend (Jest + React Testing Library)

**File**: `src/jest.config.ts`

```typescript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/src/**/?(*.)(spec|test).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### Backend (Jest + Supertest)

**File**: `backend/jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/jest.config.js',
    '!**/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testTimeout: 30000,
};
```

## Test Setup Files

### Frontend Setup (`src/setupTests.ts`)

- Configures Jest DOM matchers
- Mocks browser APIs (matchMedia, IntersectionObserver, etc.)
- Mocks external libraries (Socket.io, react-hot-toast, etc.)
- Sets up global test utilities

### Backend Setup (`backend/__tests__/setup.js`)

- Sets test environment variables
- Mocks external services (nodemailer, cloudinary, etc.)
- Provides global test utilities
- Handles unhandled promise rejections

## Writing Tests

### Frontend Component Tests

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    // Add assertions for form submission
  });
});
```

### Backend Route Tests

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../models/User');

describe('Auth Routes', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });
});
```

### Context Tests

```typescript
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

const TestComponent = () => {
  const { user, isAuthenticated, login } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>
        Login
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  it('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
  });
});
```

## Testing Best Practices

### Frontend Testing

1. **Use React Testing Library**: Focus on testing behavior, not implementation
2. **Test user interactions**: Use `fireEvent` and `userEvent` for realistic interactions
3. **Mock external dependencies**: Mock API calls, external libraries, and browser APIs
4. **Test accessibility**: Use semantic queries and test keyboard navigation
5. **Use data-testid sparingly**: Prefer semantic queries when possible

### Backend Testing

1. **Use in-memory database**: Use MongoDB Memory Server for isolated tests
2. **Test API endpoints**: Use Supertest for HTTP endpoint testing
3. **Mock external services**: Mock email, file upload, and third-party services
4. **Test error scenarios**: Include tests for validation errors and edge cases
5. **Clean up after tests**: Reset database state between tests

### General Guidelines

1. **Arrange-Act-Assert**: Structure tests with clear sections
2. **Descriptive test names**: Use clear, descriptive test names
3. **Test one thing**: Each test should verify one specific behavior
4. **Avoid test interdependence**: Tests should not depend on each other
5. **Use meaningful assertions**: Assert the most important aspects of the behavior

## Coverage Requirements

The project enforces a minimum coverage threshold of 70% for:
- Branches
- Functions
- Lines
- Statements

## Continuous Integration

Tests are automatically run in CI/CD pipelines:

1. **Frontend**: Tests run on every pull request
2. **Backend**: Tests run on every pull request
3. **Coverage**: Coverage reports are generated and tracked
4. **Quality Gates**: PRs must pass all tests to be merged

## Debugging Tests

### Frontend Debugging

```bash
# Run tests in debug mode
npm test -- --debug

# Run specific test file
npm test -- Login.test.tsx

# Run tests with verbose output
npm test -- --verbose
```

### Backend Debugging

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- auth.test.js

# Run tests in watch mode
npm test -- --watch
```

## Common Issues and Solutions

### Frontend Issues

1. **Module not found errors**: Check import paths and module resolution
2. **Mock not working**: Ensure mocks are defined before imports
3. **Async test failures**: Use `waitFor` for asynchronous operations
4. **Component not rendering**: Check for missing providers or context

### Backend Issues

1. **Database connection errors**: Ensure MongoDB Memory Server is properly configured
2. **Port conflicts**: Use dynamic port allocation for test servers
3. **Environment variables**: Ensure test environment variables are set
4. **Async test timeouts**: Increase timeout for slow operations

## Performance Testing

For performance testing, consider:

1. **Load testing**: Use tools like Artillery or k6
2. **Memory leaks**: Monitor memory usage in long-running tests
3. **Database performance**: Test with realistic data volumes
4. **API response times**: Set performance benchmarks

## Security Testing

Include security-focused tests:

1. **Authentication bypass**: Test unauthorized access attempts
2. **Input validation**: Test malicious input handling
3. **SQL injection**: Test database query security
4. **XSS prevention**: Test cross-site scripting protection

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
