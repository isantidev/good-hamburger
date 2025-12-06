import { getExtras } from "@/lib/data/menu";
import { NextResponse } from "next/server";

export async function GET() {
    const extras = await getExtras();
    return NextResponse.json(extras);
}
