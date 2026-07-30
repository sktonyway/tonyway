import { NextRequest, NextResponse } from "next/server";
import { Journal } from "@/lib/model";
import { matchClerkAndMongoUser } from "@/utils/match";

export async function GET() {
    try {
        const { mongo_id } = await matchClerkAndMongoUser();
        console.log(mongo_id)
        const journals = await Journal.find({ author: mongo_id }).sort({ createdAt: -1 })
        return NextResponse.json({ journals }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}



export async function POST(request: NextRequest) {
    try {
        // Basic validation
        const body = request.json()
        const { title, content } = await body;

        if (!title || !content) {
            return NextResponse.json(
                { success: false, error: "Title and content are required fields" },
                { status: 400 }
            );
        }

        // Checks user, find their id and save their note to the database
        const { mongo_id } = await matchClerkAndMongoUser();

        const newJournal = await Journal.create({
            title,
            content,
            author: mongo_id
        });

        return NextResponse.json(
            { success: true, data: newJournal },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving data", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }

}