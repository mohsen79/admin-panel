import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuesAction = () => {
    return (
        <div>
            <Button><Link href="issues/new/">new Issues</Link></Button>
        </div>
    )
}

export default IssuesAction