import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const token = request.headers.get("Authorization");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}
