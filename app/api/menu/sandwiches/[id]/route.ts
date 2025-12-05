import { NextRequest, NextResponse } from "next/server";
import sandwiches from "@/lib/sandwich.json";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const sandwich = sandwiches.find((s) => s.id === Number(id));
    console.log(sandwich);

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
