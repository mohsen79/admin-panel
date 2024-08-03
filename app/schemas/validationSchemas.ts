import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'title is required').max(100),
    description: z.string().min(1, 'description is requried')
});

export const pathIssueSchema = z.object({
    title: z.string().min(1, 'title is required').max(100).optional(),
    description: z.string().min(1, 'description is requried').optional(),
    assignedToUserId: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable()
});