import React from 'react';
import { Badge } from '@radix-ui/themes';
import { Status } from '@prisma/client';

const IssueStatusBadge = ({ status }: { status: Status }) => {
    const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
        OPEN: { label: 'open', color: 'red' },
        IN_PROGRESS: { label: 'In Progress', color: 'violet' },
        CLOSED: { label: 'closed', color: 'green' }
    }
    return (
        <div><Badge color={statusMap[status].color}>{statusMap[status].label}</Badge></div>
    )
}

export default IssueStatusBadge