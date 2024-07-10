import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Props {
    params: { id: string }
}

const IssueDetial = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    if (!issue) notFound();

    return (
        <Grid className='mx-5' columns={{ initial: '1', md: '2' }} gap="3">
            <Box>
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
                <Button>
                    <Pencil2Icon />
                    <Link href="">
                        Edit Issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetial