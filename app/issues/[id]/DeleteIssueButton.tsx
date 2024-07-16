'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';


const DeleteIssueButton = ({ id }: { id: number }) => {
    const [error, setError] = useState(false);
    const router = useRouter();

    const deleteIssue = async () => {
        try {
            await fetch('/api/issues/' + id, {
                method: 'DELETE',
            });

            router.push('/issues');
            router.refresh();
        } catch {
            setError(true);
        }
    }

    return <Fragment>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <TrashIcon />
                    delete Issuse
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Delete Issue
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure to delete this issue?
                </AlertDialog.Description>
                <Flex mt='4' gap='3'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={deleteIssue}>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>
                    something wnet wrong. can not delete this issue
                </AlertDialog.Description>
                <AlertDialog.Cancel>
                    <Button mt='4' variant='soft' color="gray" onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </Fragment>
}

export default DeleteIssueButton