import { NextResponse } from "next/server";
import { userRepository } from "@/server/repositories/user.repository";

export async function GET() {
  const users = await userRepository.getAll();
  return NextResponse.json({ success: true, data: users });
}
