export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Aryan Buha", email: "aryan@example.com", role: "student" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "researcher" },
];

export const userRepository = {
  async findByEmail(email: string): Promise<User | null> {
    return mockUsers.find(u => u.email === email) || null;
  },
  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { id: String(mockUsers.length + 1), ...user };
    mockUsers.push(newUser);
    return newUser;
  },
  async getAll(): Promise<User[]> {
    return mockUsers;
  }
};
