import prisma from '@/prisma/client';
import delay from 'delay';
import IssuesAction from './IssuesAction';
import { Issue, Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssueTable, { columnsName, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
    searchParams: IssueQuery
}

const Issues = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ?
        searchParams.status : undefined;
    const where = { status };

    const orderBy = columnsName.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany(
        {
            where,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize
        }
    );

    const issueCount = await prisma.issue.count({ where });
    await delay(1000);

    return (
        <Flex direction='column' gap='3'>
            <IssuesAction />
            <IssueTable issues={issues} searchParams={searchParams} />
            <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount} />
        </Flex>

    )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Issue Tracker - Issue list',
    description: 'View a summary of issue'
}

export default Issues;