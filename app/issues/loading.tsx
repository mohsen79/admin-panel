import React from 'react';
import { Skeleton, Table } from '@radix-ui/themes';
import IssuesAction from './IssuesAction';

const Loading = () => {
    const issues = [1, 2, 3, 4];
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
                    {issues.map(() => (
                        <Table.Row>
                            <Table.Cell>
                                <Skeleton />
                                <span className='block md:hidden'><Skeleton />
                                </span>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default Loading