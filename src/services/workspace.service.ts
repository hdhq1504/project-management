import { supabase } from '@/libs/supabase';
import type { Database } from '@/types/database.types';

export type Workspace = Database['public']['Tables']['workspaces']['Row'];

export const workspaceService = {
  async ensurePersonalWorkspace(): Promise<Workspace> {
    const { data, error } = await supabase.rpc('ensure_personal_workspace');

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Không thể khởi tạo workspace.');
    }

    return data;
  },

  async getCurrentWorkspace(): Promise<Workspace | null> {
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
};
