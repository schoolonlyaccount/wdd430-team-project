import PageHeading from "@/components/PageHeading";
import { requireUser } from "@/lib/auth";

export default async function ProfilePage() {
    const userId = await requireUser();

    return (
        <PageHeading title="Your Profile" description={`Clerk user ID: ${userId}`} />
    );
}