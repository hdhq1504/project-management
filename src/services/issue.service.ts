import { supabase } from '@/libs/supabase';
import type { Database } from '@/types/database.types';
import type { CreateIssueInput, Issue, UpdateIssueInput } from '@/types/issue.types';

export type IssueRow = Database['public']['Tables']['issues']['Row'];

export function mapIssueRowToIssue(row: IssueRow, workspaceSlug = 'QUA', labelIds: string[] = []): Issue {
  return {
    id: row.id,
    identifier: `${workspaceSlug.toUpperCase()}-${row.issue_number}`,
    issueNumber: row.issue_number,
    workspaceId: row.workspace_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description ?? undefined,
    status: row.status,
    priority: row.priority,
    labelIds,
    assigneeId: row.assignee_id,
    reporterId: row.reporter_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export const issueService = {
  async createIssue(workspaceId: string, input: CreateIssueInput, workspaceSlug?: string): Promise<Issue> {
    const { data, error } = await supabase.rpc('create_issue', {
      p_workspace_id: workspaceId,
      p_title: input.title.trim(),
      p_description: input.description?.trim() ? input.description.trim() : null,
      p_status: input.status ?? 'backlog',
      p_priority: input.priority ?? 'no_priority',
      p_assignee_id: input.assigneeId ?? null,
      p_label_ids: input.labelIds ?? [],
      p_project_id: input.projectId ?? null
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Không nhận được dữ liệu phản hồi từ máy chủ.');
    }

    return mapIssueRowToIssue(data, workspaceSlug, input.labelIds ?? []);
  },

  async getIssues(workspaceId: string, workspaceSlug?: string): Promise<Issue[]> {
    const { data: issuesData, error: issuesError } = await supabase
      .from('issues')
      .select('*')
      .eq('workspace_id', workspaceId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (issuesError) {
      throw new Error(issuesError.message);
    }

    if (!issuesData || issuesData.length === 0) {
      return [];
    }

    const issueIds = issuesData.map((issue) => issue.id);
    const { data: issueLabelsData, error: issueLabelsError } = await supabase
      .from('issue_labels')
      .select('issue_id, label_id')
      .in('issue_id', issueIds);

    if (issueLabelsError) {
      throw new Error(issueLabelsError.message);
    }

    const labelsByIssueId: Record<string, string[]> = {};
    if (issueLabelsData) {
      for (const item of issueLabelsData) {
        if (!labelsByIssueId[item.issue_id]) {
          labelsByIssueId[item.issue_id] = [];
        }
        labelsByIssueId[item.issue_id].push(item.label_id);
      }
    }

    return issuesData.map((row) => {
      const labelIds = labelsByIssueId[row.id] ?? [];
      return mapIssueRowToIssue(row, workspaceSlug, labelIds);
    });
  },

  async updateIssue(issueId: string, input: UpdateIssueInput, workspaceSlug?: string): Promise<Issue> {
    const { data, error } = await supabase.rpc('update_issue', {
      p_issue_id: issueId,
      p_status: input.status ?? null,
      p_priority: input.priority ?? null,
      p_label_ids: input.labelIds ?? null,
      p_assignee_id: input.assigneeId ?? null,
      p_assignee_id_is_set: input.assigneeId !== undefined
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Không nhận được dữ liệu phản hồi từ máy chủ.');
    }

    return mapIssueRowToIssue(data, workspaceSlug, input.labelIds ?? []);
  }
};
