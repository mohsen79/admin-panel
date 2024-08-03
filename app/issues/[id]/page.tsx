import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons';
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}

const IssueDetial = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    if (!issue) notFound();

    return (
        <Grid className='mx-5' columns={{ initial: '1', sm: '5' }} gap="3">
            <Box className='md:col-span-4'>
                <Heading>{issue.title}</Heading>
                <Flex className='space-x-3' my="3">
                    <IssueStatusBadge status={issue.status} />
                    <p>{issue.createdAt.toDateString()}</p>
                </Flex>
                <Card className='prose'>
                    <Markdown>{issue.description}</Markdown>
                </Card>
            </Box>
            <Box>
                {session && <Flex direction='column' gap='3'>
                    <AssigneeSelect issue={issue} />
                    <Button>
                        <Pencil2Icon />
                        <Link href={`/issues/${issue.id}/edit`}>
                            Edit Issue
                        </Link>
                    </Button>
                    <DeleteIssueButton id={issue.id} />
                </Flex>}
            </Box>
        </Grid>
    )
}

export default IssueDetial