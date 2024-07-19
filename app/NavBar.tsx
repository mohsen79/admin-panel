'use client';

import Link from "next/link";
import { FC } from "react";
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar: FC = () => {
    const path = usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];
    const { status, data: session } = useSession();
    console.log(session);

    return (
        <nav className="border-b p-3 mb-3">
            <Flex justify="between">
                <Flex align="center" gap="3">
                    <Link href="/"><AiFillBug /></Link>
                    <ul className="flex space-x-3 text-zinc-500">
                        {links.map((link, index) => <li key={index}><Link
                            className={classNames({
                                'text-zinc-800': path === link.href,
                                'hover:text-zinc-600': true
                            })}
                            key={link.href}
                            href={link.href}>{link.label}</Link></li>)}
                    </ul>
                </Flex>
                <Box>
                    {status === 'authenticated' &&
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar
                                    src={session.user!.image!}
                                    fallback="?"
                                    size="2"
                                    radius="full"
                                    className="cursor-pointer"
                                />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Label>
                                    <Text>
                                        {session.user?.email}
                                    </Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item>
                                    <Link href="/api/auth/signout">Sign out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    }

                    {status === 'unauthenticated' &&
                        <Link href="/api/auth/signin">Sign in</Link>}
                </Box>
            </Flex>
        </nav>
    )
}

export default NavBar;