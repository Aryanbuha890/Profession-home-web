import { authController } from "@/server/controllers/auth.controller";

export async function POST(request: Request) {
  return authController.signup(request);
}
