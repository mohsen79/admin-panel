'use client';

import Link from "next/link";
import { FC } from "react";
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar: FC = () => {
    const path = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issuses', href: '/issues' },
    ];

    return (
        <nav className="flex space-x-5 px-3 h-10 border-b items-center mb-3">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex space-x-3 text-zinc-500">
                {links.map(link => <li><Link
                    className={classNames({
                        'text-zinc-100': path === link.href,
                        'hover:text-zinc-300': true
                    })}
                    key={link.href}
                    href={link.href}>{link.label}</Link></li>)}
            </ul>
        </nav>
    )
}

export default NavBar;