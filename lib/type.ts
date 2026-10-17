import { ObjectId } from "mongodb";

// Task Statuses
export type TaskStatus = "in-progress" | "completed";

// Creating
export type NewTask = {
    title: string;
    details: string;
    dueDate: string; // DD/MM/YYYY
}

// Full Task
export type TaskDocument = {
    _id: ObjectId;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    status: TaskStatus;
} & NewTask;