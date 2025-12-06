import { getMenuData } from "@/lib/data/menu";
import { NextResponse } from "next/server";

export async function GET() {
    const menu = await getMenuData();
    return NextResponse.json(menu);
}
