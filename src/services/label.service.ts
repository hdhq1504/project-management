import { supabase } from '@/libs/supabase';
import type { Database } from '@/types/database.types';

export type LabelRow = Database['public']['Tables']['labels']['Row'];

export type LabelItem = {
  readonly id: string;
  readonly name: string;
  readonly color: string;
  readonly workspace_id: string;
};

const DEFAULT_LABELS: Omit<Database['public']['Tables']['labels']['Insert'], 'workspace_id'>[] = [
  { name: 'Bug', color: '#ef5b61' },
  { name: 'Feature', color: '#a875eb' },
  { name: 'Improvement', color: '#4da3ee' }
];

export const labelService = {
  async getLabels(workspaceId: string): Promise<LabelItem[]> {
    const { data, error } = await supabase
      .from('labels')
      .select('id, name, color, workspace_id')
      .eq('workspace_id', workspaceId)
      .order('name', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      return data;
    }

    const inserts = DEFAULT_LABELS.map((label) => ({
      ...label,
      workspace_id: workspaceId
    }));

    const { data: seeded, error: seedError } = await supabase
      .from('labels')
      .insert(inserts)
      .select('id, name, color, workspace_id');

    if (seedError) {
      throw new Error(seedError.message);
    }

    return seeded ?? [];
  }
};
