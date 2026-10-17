'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Show } from "@clerk/nextjs";
import React from "react";

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <section>
            <nav className="p-2 border-l border-r border-b bg-[var(--secondary-color)]">
                <ul className="flex flex-row gap-x-2 p-2">
                    <li>
                        <Link href="/tasks/new"
                            className={`text-white border border-white bg-[var(--nav-background-1)] block text-center w-[6rem] py-2 cursor-pointer transition-colors duration-250 ease-in-out hover:bg-[var(--nav-background-hover-1)] ${pathname === '/tasks/new' ? 'underline' : ''}`}
                            aria-current={pathname === '/' ? 'page' : undefined}>
                            Create Task
                        </Link>
                    </li>
                </ul>
            </nav>

            {children}
        </section>
    );
}