"use client";

import PageHeading from "@/components/PageHeading";
import { createTask, State } from "@/lib/actions";
import { useActionState } from "react";

const initialState: State = {
    message: '',
    errors: {},
};

export default function TaskNewPage() {
    const [state, formAction, isPending] = useActionState(createTask, initialState);

    const inputStyle = "border border-white my-2 p-2 rounded-[4px] bg-[var(--tertiary-color)] focus:text-green-400";
    const labelStyle = "text-2xl font-bold";

    return (
        <div>
            <PageHeading title="Create Task" description="Fill out the information below to create a new task." />

            <section className="p-4">
                <form action={formAction} className="flex flex-col bg-[var(--secondary-color)] p-4 mx-4 border-2 border-white">
                    {state.message && (
                        <p aria-live="polite" className="text-red-600 mb-4">
                            {state.message}
                        </p>
                    )}

                    <label htmlFor="title" className={labelStyle}>Title*</label>
                    <input id="title" type="text" name="title" required aria-invalid={!!state.errors?.title?.length} aria-describedby="title-error" className={inputStyle} />
                    <div id="title-error" aria-live="polite">
                        {state.errors?.title?.map((error, index) => (
                            <p key={`${error}-${index}`} className="text-red-600 my-4">{error}</p>
                        ))}
                    </div>

                    <label htmlFor="details" className={labelStyle}>Details*</label>
                    <input id="details" type="text" name="details" required aria-invalid={!!state.errors?.details?.length} aria-describedby="details-error" className={inputStyle} />
                    <div id="details-error" aria-live="polite">
                        {state.errors?.details?.map((error, index) => (
                            <p key={`${error}-${index}`} className="text-red-600 my-4">{error}</p>
                        ))}
                    </div>

                    <label htmlFor="dueDate" className={labelStyle}>Due Date*</label>
                    <input id="dueDate" type="text" name="dueDate" placeholder="DD/MM/YYYY" pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}" required aria-invalid={!!state.errors?.dueDate?.length} aria-describedby="dueDate-error" className={inputStyle} />
                    <div id="dueDate-error" aria-live="polite">
                        {state.errors?.dueDate?.map((error, index) => (
                            <p key={`${error}-${index}`} className="text-red-600 my-4">{error}</p>
                        ))}
                    </div>

                    <button type="submit" disabled={isPending}
                        className="cursor-pointer rounded-[4px] bg-[var(--nav-background-1)] p-2 mt-2 disabled:opacity-60 text-white text-2xl w-[50%] mx-auto border-2 border-white transition-colors duration 250 ease-in-out hover:bg-[var(--nav-background-hover-1)]">
                        {isPending ? 'Adding Task...' : 'Add Task'}
                    </button>
                </form>
            </section>
        </div>
    );
}