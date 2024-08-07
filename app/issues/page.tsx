import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Link from '../components/Link';
import React, { useEffect } from 'react';
import { IssueStatusBadge } from '@/app/components';
import delay from 'delay';
import IssuesAction from './IssuesAction';

const Issues = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000);

    return (
        <div className='mx-5 space-y-3'>
            <IssuesAction />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>
                            Issue
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                <span className='block md:hidden'><IssueStatusBadge status={issue.status} /></span>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>

    )
}

export const dynamic = 'force-dynamic';

export default Issues;