'use client';

import { User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

const AssigneeSelect = () => {
    const fetchUser = async () => {
        const response = await fetch('/api/users');
        return await response.json();
    }

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUser,
        staleTime: 30000,
        retry: 3
    })

    if (error) return null;

    if (isLoading) return <Skeleton height='1.7rem' />

    return <Select.Root>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users?.map(user =>
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>
}

export default AssigneeSelect