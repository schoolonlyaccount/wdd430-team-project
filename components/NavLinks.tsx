'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Show, SignOutButton } from '@clerk/nextjs';

export default function NavLinks() {
    const pathname = usePathname();
    const liStyle = "text-white border-r border-t border-white bg-[var(--nav-background-1)] block text-center w-[6rem] py-2 cursor-pointer transition-colors duration-250 ease-in-out hover:bg-[var(--nav-background-hover-1)]";
    const isActive = (path: string) => pathname === path ? 'underline' : '';

    return (
        <nav className="bg-[var(--primary-color)]">
            <ul className="flex">
                <li>
                    <Link href="/" className={`${liStyle} border-l ${isActive('/')}`}>Home</Link>
                </li>
                <Show when="signed-in">
                    <li>
                        <Link href="/dashboard" className={`${liStyle} ${isActive('/dashboard')}`}>Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/tasks?status=all" className={`${liStyle} ${isActive('/tasks')}`}>Tasks</Link>
                    </li>
                    <li>
                        <Link href="/profile" className={`${liStyle} ${isActive('/profile')}`}>Profile</Link>
                    </li>
                    <li>
                        <SignOutButton><button className={liStyle}>Sign Out</button></SignOutButton>
                    </li>
                </Show>
                <Show when="signed-out">
                    <li>
                        <Link href="/sign-in" className={`${liStyle} ${isActive('/sign-in')}`}>Sign In</Link>
                    </li>
                    <li>
                        <Link href="/sign-up" className={`${liStyle} ${isActive('/sign-up')}`}>Sign Up</Link>
                    </li>
                </Show>
            </ul>
        </nav>
    );
}