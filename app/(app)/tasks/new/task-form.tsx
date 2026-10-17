"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export async function handleSubmit() {

    const inputStyle = "border border-white my-2 p-2 rounded-[4px] bg-[var(--tertiary-color)] focus:text-green-400";
    const labelStyle = "text-2xl font-bold";

    return (
        <form className="flex flex-col bg-[var(--secondary-color)] p-4 mx-4 border-2 border-white">

            <label htmlFor="title" className={labelStyle}>Title*</label>
            <input id="title" type="text" name="title" required aria-describedby="title-error" className={inputStyle} />

            <label htmlFor="details" className={labelStyle}>Details*</label>
            <input id="details" type="text" name="details" required aria-describedby="details-error" className={inputStyle} />

            <label htmlFor="dueDate" className={labelStyle}>Due Date*</label>
            <input id="dueDate" type="date" name="dueDate" required aria-describedby="dueDate-error" className={inputStyle} />

            <button type="submit" className="cursor-pointer rounded-[4px] bg-[var(--nav-background-1)] p-2 mt-2 text-white text-2xl w-[50%] mx-auto border-2 border-white transition-colors duration 250 ease-in-out hover:bg-[var(--nav-background-hover-1)]">
                Create
            </button>
        </form>
    );
}