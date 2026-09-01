import { create } from 'zustand';

type IssueModalState = {
  isOpen: boolean;
};

type IssueModalActions = {
  open: () => void;
  close: () => void;
};

export const useIssueModalStore = create<IssueModalState & IssueModalActions>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));
