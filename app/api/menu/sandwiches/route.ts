import { getSandwiches } from "@/lib/data/menu";
import { NextResponse } from "next/server";

export async function GET() {
    const sandwiches = await getSandwiches();
    return NextResponse.json(sandwiches);
}
