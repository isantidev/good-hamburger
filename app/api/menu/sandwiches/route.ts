import { NextResponse } from "next/server";
import sandwiches from "@/lib/sandwich.json";

export async function GET() {
    return NextResponse.json(sandwiches);
}
