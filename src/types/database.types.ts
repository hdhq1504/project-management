export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url: string | null;
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name: string;
          avatar_url?: string | null;
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          avatar_url?: string | null;
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at?: string;
          updated_at?: string;
        };
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      workspace_members: {
        Row: {
          workspace_id: string;
          user_id: string;
          role: 'OWNER' | 'ADMIN' | 'MEMBER';
          joined_at: string;
        };
        Insert: {
          workspace_id: string;
          user_id: string;
          role?: 'OWNER' | 'ADMIN' | 'MEMBER';
          joined_at?: string;
        };
        Update: {
          workspace_id?: string;
          user_id?: string;
          role?: 'OWNER' | 'ADMIN' | 'MEMBER';
          joined_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          workspace_id: string;
          key: string;
          name: string;
          description: string | null;
          lead_id: string | null;
          status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          key: string;
          name: string;
          description?: string | null;
          lead_id?: string | null;
          status?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          key?: string;
          name?: string;
          description?: string | null;
          lead_id?: string | null;
          status?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
          created_at?: string;
          updated_at?: string;
        };
      };
      project_members: {
        Row: {
          project_id: string;
          user_id: string;
          role: 'LEAD' | 'MEMBER';
          joined_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          role?: 'LEAD' | 'MEMBER';
          joined_at?: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
          role?: 'LEAD' | 'MEMBER';
          joined_at?: string;
        };
      };
      sprints: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          goal: string | null;
          start_date: string | null;
          end_date: string | null;
          status: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          goal?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          status?: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          goal?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          status?: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
          created_at?: string;
        };
      };
      task_statuses: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          category: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
          position: number;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          category: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
          position?: number;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          category?: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
          position?: number;
          color?: string;
          created_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          project_id: string;
          sprint_id: string | null;
          parent_id: string | null;
          status_id: string;
          task_number: number;
          title: string;
          description: string | null;
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
          reporter_id: string;
          assignee_id: string | null;
          due_date: string | null;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          sprint_id?: string | null;
          parent_id?: string | null;
          status_id: string;
          task_number: number;
          title: string;
          description?: string | null;
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
          reporter_id: string;
          assignee_id?: string | null;
          due_date?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          sprint_id?: string | null;
          parent_id?: string | null;
          status_id?: string;
          task_number?: number;
          title?: string;
          description?: string | null;
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
          reporter_id?: string;
          assignee_id?: string | null;
          due_date?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      labels: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          color?: string;
          created_at?: string;
        };
      };
      task_labels: {
        Row: {
          task_id: string;
          label_id: string;
        };
        Insert: {
          task_id: string;
          label_id: string;
        };
        Update: {
          task_id?: string;
          label_id?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          task_id: string;
          author_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          author_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
