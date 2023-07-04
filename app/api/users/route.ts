import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET() {
  return waitFor(200).then(() => NextResponse.json(users));
}
