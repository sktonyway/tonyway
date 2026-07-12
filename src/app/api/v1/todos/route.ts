import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Todo } from "@/lib/model";

export async function GET() {
    try {
        await connectDB();
        // priority 3 = High, 2 = Medium, 1 = Low
        const todos = await Todo.find({ isCompleted: false }).sort({ priority: -1, createdAt: -1 })
        return NextResponse.json({ todos })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}



export async function POST(request: NextRequest) {
    try {
        const body = request.json()
        const { title, content, isCompleted, priority } = await body;

        if (!title) {
            return NextResponse.json(
                { success: false, error: "Wrong input" },
                { status: 400 }
            );
        }

        await connectDB();

        const newTodo = await Todo.create({
            title,
            content,
            isCompleted,
            priority
        });

        return NextResponse.json(
            { success: true, data: newTodo },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving todo", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }

}

export async function PATCH(request: NextRequest) {
    try {
        // Alternate super clean approach
        const { _id, ...updateFields } = await request.json();
        const updatedTodo = await Todo.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
        if (!updatedTodo) { return NextResponse.json({ error: 'Todo not found' }, { status: 404 }); }
        return NextResponse.json(updatedTodo, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}