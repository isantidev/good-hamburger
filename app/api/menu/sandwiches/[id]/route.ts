import { NextRequest, NextResponse } from "next/server";
import { getSandwiches } from "@/lib/data/menu";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const sandwiches = await getSandwiches();

    const sandwich = sandwiches.find((s) => s.id === Number(id));

    if (!sandwich) {
        return new NextResponse(`Sandwich with ID: ${id} not found`, {
            status: 404,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }

    return NextResponse.json(sandwich, {
        status: 200,
    });
}
