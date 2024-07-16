'use client';

import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/schemas/validationSchemas';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueForm = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(IssueSchema)
    });
    const router = useRouter();


    const submitForm = async (data: object) => {
        try {
            setSpinner(true);
            if (issue)
                await fetch('/api/issues/' + issue.id, {
                    method: 'PATCH',
                    body: JSON.stringify(data)
                });
            else
                await fetch('/api/issues', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });

            router.push('/issues');
            router.refresh();
        } catch {
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
                <TextField.Root defaultValue={issue?.title} placeholder="new issue" {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    defaultValue={issue?.description}
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>{issue ? 'Update' : 'Add'}{spinner && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm