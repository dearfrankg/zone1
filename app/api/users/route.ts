const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(users);
}
