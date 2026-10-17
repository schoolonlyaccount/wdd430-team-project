"use client";

import { useFormStatus } from "react-dom";

type TaskCardButtonProps = {
    actionType: "update" | "delete";
    children: React.ReactNode;
};

export default function TaskCardButton({
    actionType,
    children,
}: TaskCardButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="block text-center text-lg text-white w-full py-2 cursor-pointer disabled:opacity-60 bg-[var(--nav-background-1)] transition-colors duration-250 ease-in-out hover:bg-[var(--nav-background-hover-1)]"
        >
            {pending
                ? actionType === "update"
                    ? "Marking..."
                    : "Deleting..."
                : children}
        </button>
    );
}