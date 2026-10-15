import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div>
            <section className="text-center p-4 mb-4 border-b border-white mx-auto">
                <h1 className="text-4xl m-2 font-bold text-white">Sign Up</h1>
                <p className="text-lg m-2 text-white">Fill out the form below to create your account.</p>
            </section>

            <section className="grid min-h-[calc(100vh-300px)] place-items-center p-4">
                <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
            </section>
        </div>
    );
}