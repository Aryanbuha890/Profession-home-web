import { authController } from "@/server/controllers/auth.controller";

export async function POST() {
  return authController.logout();
}
