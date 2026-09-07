import { ISSUE_STATUSES } from '@/constants/issue-status';
import type { Issue, GroupedIssues } from '@/types/issue.types';

/**
 * Pure function to group issues by status in standard workflow order:
 * Backlog -> Todo -> In Progress -> Done -> Canceled
 */
export function groupIssuesByStatus(issues: Issue[]): GroupedIssues[] {
  return ISSUE_STATUSES.map((status) => {
    const matchedIssues = issues.filter((issue) => issue.status === status.id);
    return {
      status: status.id,
      name: status.name,
      issues: matchedIssues
    };
  });
}

/**
 * Format ISO date string into Linear-style short date (e.g. "Mar 3")
 */
export function formatIssueDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
