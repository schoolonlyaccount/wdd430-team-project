import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
    const userId = await requireUser();

    return (
        <section className="text-center p-4 mb-4 border-b border-white mx-auto">
            <h1 className="text-4xl m-2 font-bold text-white">Your Dashboard</h1>
            <p className="text-lg m-2 text-white">User ID: {userId}</p>
        </section>
    );
}