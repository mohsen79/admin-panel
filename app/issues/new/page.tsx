// 'use client';

import IssueForm from "../_components/IssueForm";

// import React, { useState } from 'react';
// import { Button, Callout, TextField } from '@radix-ui/themes';
// import "easymde/dist/easymde.min.css";
// import { useForm, Controller } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { createIssueSchema } from '@/app/schemas/validationSchemas';
// import { z } from 'zod';
// import { ErrorMessage, Spinner } from '@/app/components';
// import dynamic from 'next/dynamic';

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//     ssr: false
// });

// type IssueForm = z.infer<typeof createIssueSchema>;

// const NewIssue = () => {
//     const [error, setError] = useState('');
//     const [spinner, setSpinner] = useState(false);
//     const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
//         resolver: zodResolver(createIssueSchema)
//     });
//     const router = useRouter();


//     const submitForm = async (data: object) => {
//         setSpinner(true);
//         const res = await fetch('/api/issues', {
//             method: 'POST',
//             body: JSON.stringify(data)
//         });

//         if (res.ok) {
//             router.push('/issues');
//             setSpinner(false);
//         } else {
//             setError('an unexpected error');
//             setSpinner(false);
//         }
//     }
const newIssue = () => {
    return <IssueForm />
}

export default newIssue;