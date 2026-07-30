import { NextRequest, NextResponse } from "next/server";
import { Todo } from "@/lib/model";
import { matchClerkAndMongoUser } from "@/utils/match";

export async function GET() {
    try {
        const { mongo_id } = await matchClerkAndMongoUser();
        const todos = await Todo.find({ author: mongo_id }).sort({ isCompleted: 1, priority: -1, date: 1, createdAt: -1 });
        return NextResponse.json({ todos });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, content, isCompleted, priority, date } = await request.json();

        if (!title?.trim()) {
            return NextResponse.json(
                { success: false, error: "Title is required" },
                { status: 400 }
            );
        }

        const { mongo_id } = await matchClerkAndMongoUser();

        const newTodo = await Todo.create({
            title: title.trim(),
            content,
            isCompleted,
            priority,
            ...(date && { date: new Date(date) }),
            author: mongo_id
        });

        return NextResponse.json(
            { success: true, data: newTodo },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving todo", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { _id, ...updateFields } = await request.json();

        if (!_id) {
            return NextResponse.json({ error: "Todo id is required" }, { status: 400 });
        }

        const {mongo_id} = await matchClerkAndMongoUser();

        const updatedTodo = await Todo.findByIdAndUpdate({_id, author: mongo_id}, { $set: updateFields }, { new: true });
        if (!updatedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedTodo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update todo" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { _id } = await request.json();

        if (!_id) {
            return NextResponse.json({ error: "Todo id is required" }, { status: 400 });
        }

        const {mongo_id} = await matchClerkAndMongoUser();


        const deletedTodo = await Todo.findByIdAndDelete({ _id, author: mongo_id });
        if (!deletedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 });
    }
}
