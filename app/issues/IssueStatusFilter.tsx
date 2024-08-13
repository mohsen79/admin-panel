'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

const IssueStatusFilter = () => {
    const router = useRouter();
    const statuses: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' },
    ];

    return <Select.Root onValueChange={(status) => {
        const query = status ? `?status=${status}` : '';
        router.push('/issues' + query);
    }}>
        <Select.Trigger className="SelectTrigger" aria-label="Food" placeholder="Fitler by status..." >
            <ChevronDownIcon />
        </Select.Trigger>
        <Select.Content className="SelectContent">
            <Select.Group>
                {statuses.map(status => (
                    <Select.Item key={status.label}
                        value={status.value as string}>{status.label}
                    </Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
}

export default IssueStatusFilter