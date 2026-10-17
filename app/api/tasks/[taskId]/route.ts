import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getTasksCollection } from "@/lib/tasks";
import { requireUser } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
    const userId = await requireUser();
    const { taskId } = await params;

    if (!ObjectId.isValid(taskId)) {
        return NextResponse.json(
            { message: "Invalid task ID" },
            { status: 400 }
        );
    }

    const task = await getTasksCollection();

    const result = await task.findOne({
        _id: new ObjectId(taskId),
        userId
    });

    if (!result) {
        return NextResponse.json(
            { message: "Task not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: "Task retrieved successfully", task: result },
        { status: 200 }
    );
}