import { LABELS } from '@/constants/issue-label';

export function getLabelSummary(labelIds: string[]) {
  if (labelIds.length === 0) {
    return 'Labels';
  }

  if (labelIds.length === 1) {
    const label = LABELS.find((item) => item.id === labelIds[0]);
    return label?.name ?? 'Labels';
  }

  return `${labelIds.length} labels`;
}

export function getSelectedLabelObjects(labelIds: string[]) {
  return labelIds.map((id) => LABELS.find((item) => item.id === id)).filter((label) => label !== undefined);
}
