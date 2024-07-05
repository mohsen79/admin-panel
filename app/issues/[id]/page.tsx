import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

interface Props {
    params: { id: string }
}

const IssueDetial = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    if (!issue) notFound();

    return (
        <div className='mx-5'>
            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="3">
                <IssueStatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className='prose'>
                <Markdown>{issue.description}</Markdown>
            </Card>
        </div>
    )
}

export default IssueDetial