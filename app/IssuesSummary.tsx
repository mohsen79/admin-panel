import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
    const statuses: { label: string, value: number, status: Status }[] = [
        { label: 'open', value: open, status: 'OPEN' },
        { label: 'inProgress', value: inProgress, status: 'IN_PROGRESS' },
        { label: 'closed', value: closed, status: 'CLOSED' },
    ];

    return (
        <Flex gap='3' ml='3'>
            {statuses.map(status => <Card> <Flex direction='column' gap='3'>
                <Link href={`issues?status=${status.status}`}>
                    <Text>{status.label}</Text>
                    <p>{status.value}</p>
                </Link>
            </Flex>
            </Card>)}
        </Flex>
    )
}

export default IssuesSummary