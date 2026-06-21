import { userRepository } from "../repositories/user.repository";

export const authService = {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    // In production, compare hashed password here
    return { token: "mock-jwt-token", user };
  },
  async signup(name: string, email: string, role: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error("User already exists");
    const user = await userRepository.create({ name, email, role });
    return { token: "mock-jwt-token", user };
  }
};
