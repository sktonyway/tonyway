import { NextRequest, NextResponse } from "next/server";
import { Note } from "@/lib/model";
import { matchClerkAndMongoUser } from "@/utils/match";

export async function GET() {

    try {
        const {mongo_id} = await matchClerkAndMongoUser();
        const notes = await Note.find({ author: mongo_id }).sort({ createdAt: -1 })
        return NextResponse.json({ notes })

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
        const {mongo_id} = await matchClerkAndMongoUser();
        const newNote = await Note.create({
            title,
            content,
            author: mongo_id
        });

        return NextResponse.json(
            { success: true, data: { title: newNote.title, content: newNote.content } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving data", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }

}