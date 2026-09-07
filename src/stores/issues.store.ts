import { create } from 'zustand';
import type { Issue, CreateIssueInput, UpdateIssueInput } from '@/types/issue.types';

type IssuesState = {
  issues: Issue[];
  nextId: number;
};

type IssuesActions = {
  addIssue: (input: CreateIssueInput) => Issue;
  updateIssue: (id: string, patch: UpdateIssueInput) => void;
  deleteIssue: (id: string) => void;
};

export type IssuesStore = IssuesState & IssuesActions;

export const useIssuesStore = create<IssuesStore>()((set) => ({
  issues: [],
  nextId: 1,

  addIssue: (input: CreateIssueInput) => {
    let createdIssue: Issue = {
      id: '',
      title: input.title,
      description: input.description,
      status: input.status ?? 'backlog',
      priority: input.priority ?? 'no_priority',
      labels: input.labels || [],
      assigneeId: input.assigneeId ?? null,
      createdAt: new Date().toISOString()
    };

    set((state) => {
      const id = `QA-${state.nextId}`;
      createdIssue = { ...createdIssue, id };
      return {
        issues: [createdIssue, ...state.issues],
        nextId: state.nextId + 1
      };
    });

    return createdIssue;
  },

  updateIssue: (id: string, patch: UpdateIssueInput) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              ...patch,
              updatedAt: new Date().toISOString()
            }
          : issue
      )
    }));
  },

  deleteIssue: (id: string) => {
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id)
    }));
  }
}));
