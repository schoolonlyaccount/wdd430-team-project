import { NextRequest, NextResponse } from "next/server";
import { getTasksCollection } from "@/lib/tasks-db";
import { requireUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const userId = await requireUser();
        const tasks = await getTasksCollection();

        const status = request.nextUrl.searchParams.get("status") ?? "all";

        if (!["all", "active", "completed"].includes(status)) {
            return NextResponse.json(
                { message: "Invalid status filter." },
                { status: 400 }
            );
        }

        const filter: {
            userId: string;
            status?: "in-progress" | "completed";
        } = { userId };

        if (status === "active") {
            filter.status = "in-progress";
        } else if (status === "completed") {
            filter.status = "completed";
        }

        const result = await tasks
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json(
            {
                message: "Tasks retrieved successfully",
                tasks: result,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving tasks:", error);

        return NextResponse.json(
            { message: "Failed to retrieve tasks." },
            { status: 500 }
        );
    }
}