import { NextRequest, NextResponse } from "next/server";
import { getExtras } from "@/lib/data/menu";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const extras = await getExtras();

    const extra = extras.find((x) => x.id === Number(id));

    if (!extra) {
        return new NextResponse(`Extra with ID: ${id} not found`, {
            status: 404,
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }

    return NextResponse.json(extra, {
        status: 200,
    });
}
