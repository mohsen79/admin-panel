'use client';

import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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

    return <Select.Root defaultValue={issue.assignedToUserId || null}
        onValueChange={(userId) => {
            const data = { assignedToUserId: userId || null };
            fetch('/api/issues/' + issue.id, {
                method: 'PATCH', body: JSON.stringify(data)
            });
        }}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value={null}>Unassigned</Select.Item>
                {users?.map(user =>
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>
}

export default AssigneeSelect