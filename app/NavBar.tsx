import Link from "next/link";
import { FC } from "react";
import { AiFillBug } from 'react-icons/ai';

const NavBar: FC = () => {
    const links = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Issuses', href: '/issues' },
    ];

    return (
        <nav className="flex space-x-5 px-3 h-10 border-b items-center mb-3">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-3 text-zinc-100">
                {links.map(link => <li><Link
                    className="hover:text-zinc-300"
                    key={link.href}
                    href={link.href}>{link.label}</Link></li>)}
            </ul>
        </nav>
    )
}

export default NavBar;