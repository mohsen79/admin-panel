import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Table } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge } from './components'
import Link from 'next/link'

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card m='3'>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex justify='between'>
                                <Flex direction='column' gap='2'>
                                    <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                                    <IssueStatusBadge status={issue.status} />
                                </Flex>
                                {issue.assignedToUser &&
                                    <Avatar radius='full' src={issue.assignedToUser.image!} fallback='?' />}
                            </Flex>
                        </Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues