import PageHeading from "@/components/PageHeading";
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
    const userId = await requireUser();

    return (
        <PageHeading title="Your Dashboard" description={`User ID: ${userId}`} />
    );
}