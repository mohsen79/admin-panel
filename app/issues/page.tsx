import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Link from '../components/Link';
import { IssueStatusBadge } from '@/app/components';
import delay from 'delay';
import IssuesAction from './IssuesAction';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
    searchParams: {
        status: Status,
        orderBy: keyof Issue
    }
}

const Issues = async ({ searchParams }: Props) => {
    const columns: { label: string, value: keyof Issue, className?: string }[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'CreateAt', value: 'createdAt', className: 'hidden md:table-cell' }
    ]
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ?
        searchParams.status : undefined;

    const orderBy = columns.map(column => column.value)
        .includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

    const issues = await prisma.issue.findMany(
        {
            where: { status: status },
            orderBy
        }
    );
    await delay(2000);

    return (
        <div className='mx-5 space-y-3'>
            <IssuesAction />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => <Table.ColumnHeaderCell className={column.className}>
                            <NextLink href={{
                                query: { ...searchParams, orderBy: column.value },
                            }}>
                                {column.label}
                                {column.value === searchParams.orderBy &&
                                    <ArrowUpIcon className='inline' />
                                }
                            </NextLink>
                        </Table.ColumnHeaderCell>)}
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