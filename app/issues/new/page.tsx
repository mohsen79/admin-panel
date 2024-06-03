import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewIssue = () => {
    return (
        <div className='max-w-xl space-y-2 p-3'>
            <TextField.Root placeholder="new issue" />
            <TextArea placeholder='description' />
            <Button>Add</Button>
        </div>
    )
}

export default NewIssue