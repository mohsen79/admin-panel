'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';

const IssueStatusFilter = () => {
    const router = useRouter();
    const statuses: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' },
    ];
    const searchParams = useSearchParams();

    return <Select.Root
        defaultValue={searchParams.get('status') || ''}
        onValueChange={(status) => {
            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
            const query = params.size ? '?' + params.toString() : '';
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