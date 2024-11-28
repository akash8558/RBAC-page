# Role-Based Access Control (RBAC) Demo

A modern React application demonstrating Role-Based Access Control (RBAC) implementation with TypeScript, Tailwind CSS, and Zustand for state management.

## Features

### Authentication
- Secure user registration and login
- JWT-based authentication (simulated)
- Password validation with specific requirements
- Protected routes based on authentication status

### Authorization
- Role-based access control (RBAC)
- Three default roles: Admin, Moderator, and User
- Permission-based access to features and routes
- Role-specific UI elements

### Admin Panel
- User Management
  - Create, read, update, and delete users
  - Assign roles to users
  - View user details and history
- Role Management
  - Create and manage roles
  - Define permissions for each role
  - Track user count per role
- System Overview
  - Total users count
  - Active roles count
  - System health status

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: Zod
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Development**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── UserManagement.tsx
│   │   └── RoleManagement.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── ProtectedRoute.tsx
├── pages/
│   ├── AdminPanel.tsx
│   └── Dashboard.tsx
├── store/
│   ├── adminStore.ts
│   └── authStore.ts
├── types/
│   ├── admin.ts
│   └── auth.ts
├── utils/
│   └── validation.ts
└── App.tsx
```

## Authentication

### Login
- Email and password validation
- Secure credential verification
- JWT token storage
- Redirect to dashboard on success

### Registration
- New user account creation
- Automatic role assignment (default: user)
- Input validation
- Secure password requirements

## Authorization

### Roles and Permissions

1. **Admin**
   - Full system access
   - User management
   - Role management
   - System configuration

2. **Moderator**
   - Content moderation
   - Report management
   - Limited administrative access

3. **User**
   - Basic dashboard access
   - Profile management
   - Standard features

### Protected Routes
Routes are protected based on user authentication and role permissions using the `ProtectedRoute` component.

```typescript
<ProtectedRoute allowedRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>
```

## State Management

### Auth Store
- User authentication state
- Login/logout functionality
- Token management
- Role-based permissions

### Admin Store
- User management
- Role management
- System statistics
- CRUD operations

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code

## Testing

### Test Accounts

1. Admin Account
   - Email: admin@example.com
   - Password: Admin@123

2. User Account
   - Email: user@example.com
   - Password: User@123

## Security Features

1. **Password Requirements**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

2. **Route Protection**
   - Authentication check
   - Role-based access control
   - Unauthorized access prevention

3. **Input Validation**
   - Email format validation
   - Password strength requirements
   - Form input sanitization

## Best Practices

1. **Code Organization**
   - Component-based architecture
   - Separation of concerns
   - Type safety with TypeScript
   - Modular state management

2. **Security**
   - Protected routes
   - Role-based access
   - Input validation
   - Secure authentication flow

3. **User Experience**
   - Responsive design
   - Loading states
   - Error handling
   - Toast notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.