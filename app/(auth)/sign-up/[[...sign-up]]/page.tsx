import PageHeading from "@/components/PageHeading";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div>
            <PageHeading title="Sign Up" description="Fill out the form below to create your account." />

            <section className="grid min-h-[calc(100vh-300px)] place-items-center p-4">
                <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
            </section>
        </div>
    );
}