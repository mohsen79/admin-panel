'use client';

import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/schemas/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();

    const submitForm = async (data: object) => {
        setSpinner(true);
        const res = await fetch('/api/issues', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            router.push('/issues');
            setSpinner(false);
        } else {
            setError('an unexpected error');
            setSpinner(false);
        }
    }

    return (
        <div className="max-w-xl p-3">
            {error && <Callout.Root color="red" className="mb-3">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-2' onSubmit={handleSubmit((data) => submitForm(data))}>
                <TextField.Root placeholder="new issue" {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Add{spinner && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssue