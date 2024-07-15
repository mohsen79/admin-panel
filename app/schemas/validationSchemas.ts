import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'title is required').max(100),
    description: z.string().min(1, 'description is requried')
});