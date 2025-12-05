import { NextResponse } from "next/server";
import sandwiches from "@/lib/sandwich.json";
import extras from "@/lib/extras.json";

export async function GET() {
    return NextResponse.json({ sandwiches, extras });
}
