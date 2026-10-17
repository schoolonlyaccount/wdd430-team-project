import { Collection, ObjectId, OptionalId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { NewTask, TaskStatus, TaskDocument } from "@/lib/type";
import { requireUser } from "./auth";

const ITEMS_PER_PAGE = 5;

export type TaskFilterStatus = "all" | "in-progress" | "completed";

export async function getTasksCollection(): Promise<Collection<OptionalId<TaskDocument>>> {
    const client = await clientPromise;
    const db = client.db();

    return db.collection<OptionalId<TaskDocument>>("tasks");
}

export async function getTasks(query: string = '', currentPage: number = 1, status: TaskFilterStatus): Promise<TaskDocument[]> {
    const userId = await requireUser();
    const tasks = await getTasksCollection();

    const offset = (Math.max(1, currentPage) - 1) * ITEMS_PER_PAGE;

    const filter = {
        userId,
        ...(query.trim()
            ? {
                title: {
                    $regex: query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                    $options: "i",
                },
            }
            : {}),
        ...(status === "in-progress" ? { status: "in-progress" as const } : status === "completed" ? { status: "completed" as const } : {})
    };

    return tasks.aggregate<TaskDocument>([
        { $match: filter },
        {
            $addFields: {
                _sortDueDate: {
                    $dateFromString: {
                        dateString: "$dueDate",
                        format: "%d/%m/%Y",
                    },
                },
            },
        },
        { $sort: { _sortDueDate: 1 } },
        { $skip: offset },
        { $limit: ITEMS_PER_PAGE },
        { $project: { _sortDueDate: 0 } },
    ]).toArray();
}

export async function getTasksPages(query: string = "", status: TaskFilterStatus): Promise<number> {
    const userId = await requireUser();
    const tasks = await getTasksCollection();

    const filter = {
        userId,
        ...(query.trim()
            ? {
                title: {
                    $regex: query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                    $options: "i",
                },
            }
            : {}),
        ...(status === "in-progress"
            ? { status: "in-progress" as const }
            : status === "completed"
                ? { status: "completed" as const }
                : {}),
    };

    const totalTasks = await tasks.countDocuments(filter);

    return Math.ceil(totalTasks / ITEMS_PER_PAGE);
}

export async function getTaskById(id: string): Promise<TaskDocument | null> {
    const userId = await requireUser();
    const tasks = await getTasksCollection();

    if (!ObjectId.isValid(id)) {
        return null;
    }

    return tasks.findOne({
        _id: new ObjectId(id),
        userId
    });
}

export async function createTask(data: NewTask): Promise<TaskDocument> {
    const userId = await requireUser();
    const tasks = await getTasksCollection();
    const now = new Date();

    const newTask = {
        ...data,
        status: "in-progress" as const,
        userId,
        createdAt: now,
        updatedAt: now,
    };

    const result = await tasks.insertOne(newTask);

    return {
        ...newTask,
        _id: result.insertedId,
    };
}

export async function updateTask(id: string, status: TaskStatus): Promise<boolean> {
    const userId = await requireUser();

    if (!ObjectId.isValid(id)) {
        return false;
    }

    const tasks = await getTasksCollection();

    const result = await tasks.updateOne(
        {
            _id: new ObjectId(id),
            userId
        },
        {
            $set: {
                status,
                updatedAt: new Date()
            },
        }
    );

    return result.matchedCount === 1;
}

export async function deleteTask(id: string): Promise<boolean> {
    const userId = await requireUser();

    if (!ObjectId.isValid(id)) {
        return false;
    }

    const tasks = await getTasksCollection();

    const result = await tasks.deleteOne({
        _id: new ObjectId(id),
        userId,
    });

    return result.deletedCount === 1;
}