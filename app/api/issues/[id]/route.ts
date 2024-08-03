import { authOptions } from "@/app/auth/authOptions";
import { pathIssueSchema } from "@/app/schemas/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = pathIssueSchema.safeParse(body);
    const { title, description, assignedToUserId } = body;

    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });

        if (!user) return NextResponse.json('invalid user', { status: 400 });
    }

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

    if (!issue) return NextResponse.json('invalid issue', { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

    if (!issue) return NextResponse.json({ error: 'invalid issue' }, { status: 404 });

    await prisma.issue.delete({ where: { id: issue.id } });

    return NextResponse.json({});
}