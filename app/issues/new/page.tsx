'use client';

import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string
    description: string
}

const NewIssue = () => {
    const [error, setError] = useState('');
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    const submitForm = async (data: object) => {
        const res = await fetch('/api/issues', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            router.push('/issues');
        } else {
            setError('an unexpected error');
        }
    }

    return (
        <div className="max-w-xl p-3">
            {error && <Callout.Root color="red" className="mb-3">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-2' onSubmit={handleSubmit((data) => submitForm(data))}>
                <TextField.Root placeholder="new issue" {...register('title')} />
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                <Button>Add</Button>
            </form>
        </div>
    )
}

export default NewIssue