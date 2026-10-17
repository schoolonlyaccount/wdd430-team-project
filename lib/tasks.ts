import { Collection } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { Task } from "@/lib/type";

export async function getTasksCollection(): Promise<Collection<Task>> {
    const client = await clientPromise;
    const db = client.db();

    return db.collection<Task>("tasks");
}