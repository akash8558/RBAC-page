import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'Admin@123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'User@123',
    name: 'Regular User',
    role: 'user'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email: string, password: string) => {
    // Simulate API authentication
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const mockToken = btoa(JSON.stringify(userWithoutPassword));
    
    localStorage.setItem('token', mockToken);
    set({ user: userWithoutPassword, token: mockToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  register: async (email: string, password: string, name: string) => {
    // Simulate user registration
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      password,
      name,
      role: 'user' as const
    };

    const { password: _, ...userWithoutPassword } = newUser;
    const mockToken = btoa(JSON.stringify(userWithoutPassword));
    
    localStorage.setItem('token', mockToken);
    set({ user: userWithoutPassword, token: mockToken, isAuthenticated: true });
  },
}));