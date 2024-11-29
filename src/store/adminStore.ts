import { create } from 'zustand';
import { AdminState, UserData, RoleData } from '../types/admin';

const mockUsers: UserData[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-03-15',
    lastLogin: '2024-03-20'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    createdAt: '2024-03-16',
    lastLogin: '2024-03-19'
  }
];

const mockRoles: RoleData[] = [
  {
    id: '1',
    name: 'admin',
    permissions: ['all'],
    userCount: 1
  },
  {
    id: '2',
    name: 'moderator',
    permissions: ['read', 'write', 'moderate'],
    userCount: 0
  },
  {
    id: '3',
    name: 'user',
    permissions: ['read'],
    userCount: 1
  }
];

export const useAdminStore = create<AdminState>((set) => ({
  users: mockUsers,
  roles: mockRoles,

  addUser: (userData) => set((state) => ({
    users: [...state.users, {
      ...userData,
      id: String(state.users.length + 1),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    }]
  })),

  updateUser: (id, data) => set((state) => ({
    users: state.users.map(user =>
      user.id === id ? { ...user, ...data } : user
    )
  })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),

  addRole: (roleData) => set((state) => ({
    roles: [...state.roles, {
      ...roleData,
      id: String(state.roles.length + 1),
      userCount: 0
    }]
  })),

  updateRole: (id, data) => set((state) => ({
    roles: state.roles.map(role =>
      role.id === id ? { ...role, ...data } : role
    )
  })),

  deleteRole: (id) => set((state) => ({
    roles: state.roles.filter(role => role.id !== id)
  }))
}));