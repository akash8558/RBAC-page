export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface RoleData {
  id: string;
  name: string;
  permissions: string[];
  userCount: number;
}

export interface AdminState {
  users: UserData[];
  roles: RoleData[];
  addUser: (user: Omit<UserData, 'id' | 'createdAt' | 'lastLogin'>) => void;
  updateUser: (id: string, data: Partial<UserData>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<RoleData, 'id' | 'userCount'>) => void;
  updateRole: (id: string, data: Partial<RoleData>) => void;
  deleteRole: (id: string) => void;
}