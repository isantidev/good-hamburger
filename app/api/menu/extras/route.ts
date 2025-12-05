import { NextResponse } from "next/server";
import extras from "@/lib/extras.json";

export async function GET() {
    return NextResponse.json(extras);
}
