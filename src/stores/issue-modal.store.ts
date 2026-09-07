import { create } from 'zustand';
import type { IssueFields } from '@/schemas/issue.schema';

type IssueModalState = {
  isOpen: boolean;
  defaultValues?: Partial<IssueFields>;
};

type IssueModalActions = {
  open: (defaultValues?: Partial<IssueFields>) => void;
  close: () => void;
};

export const useIssueModalStore = create<IssueModalState & IssueModalActions>()((set) => ({
  isOpen: false,
  defaultValues: undefined,
  open: (defaultValues) => set({ isOpen: true, defaultValues }),
  close: () => set({ isOpen: false, defaultValues: undefined })
}));
