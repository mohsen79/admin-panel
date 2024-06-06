'use client';

import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string
    description: string
}

const NewIssue = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    const submitForm = async (data: object) => {
        await fetch('/api/issues', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        router.push('/issues');
    }

    return (
        <form className='max-w-xl space-y-2 p-3' onSubmit={handleSubmit((data) => submitForm(data))}>
            <TextField.Root placeholder="new issue" {...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
            />
            <Button>Add</Button>
        </form>
    )
}

export default NewIssue