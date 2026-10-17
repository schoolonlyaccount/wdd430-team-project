import PageHeading from "@/components/PageHeading";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div>
            <PageHeading title="Sign In" description="Fill out the form below to sign in to your account." />

            <section className="grid min-h-[calc(100vh-300px)] place-items-center p-4">
                <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
            </section>
        </div>
    );
}