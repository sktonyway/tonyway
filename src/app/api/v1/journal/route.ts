import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Journal } from "@/lib/model";

export async function GET() {
    try {
        await connectDB();
        const journals = await Journal.find({})
        return NextResponse.json({ journals }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}



export async function POST(request: NextRequest) {
    try {
        const body = request.json()
        const { title, content } = await body;

        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: "Title and content are required fields" },
                { status: 400 }
            );
        }

        await connectDB();

        const newJournal = await Journal.create({
            title,
            content
        });

        return NextResponse.json(
            { success: true, data: newJournal },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving data", error)
        return NextResponse.json({success: false}, {status: 500})
    }

}