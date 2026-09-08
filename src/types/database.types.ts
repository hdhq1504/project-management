export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
          next_issue_number: number;
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
          next_issue_number?: number;
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
          next_issue_number?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
      issues: {
        Row: {
          id: string;
          project_id: string;
          sprint_id: string | null;
          parent_id: string | null;
          issue_number: number;
          title: string;
          description: string | null;
          status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';
          priority: 'no_priority' | 'urgent' | 'high' | 'medium' | 'low';
          reporter_id: string;
          assignee_id: string | null;
          due_date: string | null;
          position: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          sprint_id?: string | null;
          parent_id?: string | null;
          issue_number: number;
          title: string;
          description?: string | null;
          status?: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';
          priority?: 'no_priority' | 'urgent' | 'high' | 'medium' | 'low';
          reporter_id: string;
          assignee_id?: string | null;
          due_date?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          sprint_id?: string | null;
          parent_id?: string | null;
          issue_number?: number;
          title?: string;
          description?: string | null;
          status?: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';
          priority?: 'no_priority' | 'urgent' | 'high' | 'medium' | 'low';
          reporter_id?: string;
          assignee_id?: string | null;
          due_date?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
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
        Relationships: [];
      };
      issue_labels: {
        Row: {
          issue_id: string;
          label_id: string;
        };
        Insert: {
          issue_id: string;
          label_id: string;
        };
        Update: {
          issue_id?: string;
          label_id?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          issue_id: string;
          author_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          issue_id: string;
          author_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          issue_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_issue: {
        Args: {
          p_project_id: string;
          p_title: string;
          p_description?: string | null;
          p_status?: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled';
          p_priority?: 'no_priority' | 'urgent' | 'high' | 'medium' | 'low';
          p_assignee_id?: string | null;
          p_label_ids?: string[];
        };
        Returns: Database['public']['Tables']['issues']['Row'];
      };
    };
    Enums: Record<string, never>;
  };
}
