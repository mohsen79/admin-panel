import { AlertDialog, Button, Dialog, Flex } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons';


const DeleteIssueButton = () => {
    return <AlertDialog.Root>
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
                    <Button color='red'>Delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
}

export default DeleteIssueButton