'use client';

import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
    return (
        <div className='max-w-xl space-y-2 p-3'>
            <TextField.Root placeholder="new issue" />
            <SimpleMDE placeholder='description' />
            <Button>Add</Button>
        </div>
    )
}

export default NewIssue