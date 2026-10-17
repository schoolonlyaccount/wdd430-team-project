'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
    createTask as dbCreateTask,
    updateTask as dbUpdateTask,
    deleteTask as dbDeleteTask,
    getTaskById
} from "./tasks-db";
import { TaskStatus } from "./type";

export type State = {
    message?: string;
    errors?: {
        title?: string[];
        details?: string[];
        dueDate?: string[];
    };
};

const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required."),
    details: z.string().min(1, "Details are required."),
    dueDate: z.string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            "Use DD/MM/YYYY format."
        )
        .refine((value) => {
            const [day, month, year] = value.split("/").map(Number);
            const date = new Date(Date.UTC(year, month - 1, day));

            return (
                date.getUTCFullYear() === year &&
                date.getUTCMonth() === month - 1 &&
                date.getUTCDate() === day
            );
        }, "Enter a valid calendar date."),
});

function getTaskFormData(formData: FormData) {
    const getString = (name: string): string => String(formData.get(name) ?? '').trim();

    return {
        title: getString("title"),
        details: getString("details"),
        dueDate: getString("dueDate")
    };
}

export async function createTask(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = TaskFormSchema.safeParse(getTaskFormData(formData));

    if (!validatedFields.success) {
        return {
            message: 'Please correct the errors below.',
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const { title, details, dueDate } = validatedFields.data;

    try {
        await dbCreateTask({ title, details, dueDate });
    } catch (error) {
        console.error('Error creating task: ', error);
        return {
            message: "Unable to create task. Please try again later."
        };
    }

    revalidatePath('/tasks');
    redirect('/tasks');
}

export async function updateTask(id: string): Promise<void> {
    try {
        const task = await getTaskById(id);

        if (!task) {
            throw new Error("Task not found.");
        }

        const nextStatus: TaskStatus =
            task.status === "completed" ? "in-progress" : "completed";

        const updated = await dbUpdateTask(id, nextStatus);

        if (!updated) {
            throw new Error("Task could not be updated.");
        }
    } catch (error) {
        console.error('Error updating task: ', error);
        throw new Error("Unable to update task status.");
    }

    revalidatePath('/tasks');
}

export async function deleteTask(id: string): Promise<void> {
    try {
        const deleted = await dbDeleteTask(id);

        if (!deleted) {
            throw new Error("Task not found or could not be deleted.");
        }
    } catch (error) {
        console.error('Error deleting task: ', error);
        throw new Error('Unable to delete this task. Please try again later.');
    }

    revalidatePath('/tasks');
}