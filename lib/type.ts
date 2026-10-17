export type TaskStatus = "active" | "completed";

export type Task = {
    userId: string;
    title: string;
    details: string;
    dueDate: Date;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}