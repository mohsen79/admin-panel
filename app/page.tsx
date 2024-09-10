import prisma from '@/prisma/client'
import IssuesSummary from './IssuesSummary'
import LatestIssues from './LatestIssues'

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return <>
    <LatestIssues />
    <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
  </>
}