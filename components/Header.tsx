import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className="bg-[var(--primary-color)] border-t border-r border-white">
            <p className="text-white text-2xl font-bold p-4 border-l border-white">
                TaskTrack
            </p>

            <NavLinks />
        </header>
    );
}