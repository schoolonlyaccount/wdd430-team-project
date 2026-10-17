import { NextResponse } from "next/server";
import { getTasksCollection } from "@/lib/tasks";
import { requireUser } from "@/lib/auth";

export async function GET() {
    const userId = await requireUser();

    const tasks = await getTasksCollection();

    const result = await tasks
        .find({ userId })
        .sort({ dueDate: 1 })
        .toArray();

    if (result.length === 0) {
        return NextResponse.json(
            { message: "No tasks found", tasks: [] },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { message: "Tasks retrieved successfully", tasks: result },
        { status: 200 }
    );
}