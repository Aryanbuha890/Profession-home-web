export type AppRole = "student" | "researcher" | "founder" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AppRole;
}

export const TEST_CREDENTIALS: Array<{
  role: AppRole;
  email: string;
  password: string;
  name: string;
}> = [
  {
    role: "student",
    email: "student@test.profhome.com",
    password: "Test@123456",
    name: "Test Student",
  },
  {
    role: "researcher",
    email: "researcher@test.profhome.com",
    password: "Test@123456",
    name: "Test Researcher",
  },
  {
    role: "founder",
    email: "founder@test.profhome.com",
    password: "Test@123456",
    name: "Test Founder",
  },
  {
    role: "admin",
    email: "admin@test.profhome.com",
    password: "Test@123456",
    name: "Test Admin",
  },
];
