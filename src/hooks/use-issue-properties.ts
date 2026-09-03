import { useState, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { getStatusObject } from '@/libs/issue-status';
import { getPriorityObject } from '@/libs/issue-priority';
import { getLabelSummary, getSelectedLabelObjects } from '@/libs/issue-label';
import type { IssueFields } from '@/schemas/issue.schema';

export function useIssueProperties() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [labelsOpen, setLabelsOpen] = useState(false);

  const status = useWatch<IssueFields, 'status'>({ name: 'status' }) ?? 'backlog';
  const priority = useWatch<IssueFields, 'priority'>({ name: 'priority' }) ?? 'no_priority';
  const labels = useWatch<IssueFields, 'labels'>({ name: 'labels' }) ?? [];

  const statusObj = useMemo(() => getStatusObject(status), [status]);
  const priorityObj = useMemo(() => getPriorityObject(priority), [priority]);
  const selectedLabels = useMemo(() => getSelectedLabelObjects(labels), [labels]);
  const labelSummary = useMemo(() => getLabelSummary(labels), [labels]);

  const priorityLabel = priority === 'no_priority' ? 'Priority' : priorityObj.name;

  return {
    status,
    statusObj,
    statusOpen,
    setStatusOpen,
    priority,
    priorityObj,
    priorityLabel,
    priorityOpen,
    setPriorityOpen,
    labels,
    selectedLabels,
    labelSummary,
    labelsOpen,
    setLabelsOpen
  };
}
