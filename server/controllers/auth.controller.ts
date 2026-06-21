import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";

export const authController = {
  async login(request: Request) {
    try {
      const body = await request.json();
      const result = await authService.login(body.email, body.password);
      return NextResponse.json({ success: true, ...result });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  },
  async signup(request: Request) {
    try {
      const body = await request.json();
      const result = await authService.signup(body.name, body.email, body.role || "student");
      return NextResponse.json({ success: true, ...result });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  },
  async logout() {
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  }
};
