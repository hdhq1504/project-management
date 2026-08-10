-- ========================================================
-- SUPABASE COMPLETE SETUP SCRIPT (11 MVP TABLES + RLS + SEED DATA)
-- Ready to run directly in Supabase SQL Editor
-- ========================================================

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up existing tables if re-running script
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS task_labels CASCADE;
DROP TABLE IF EXISTS labels CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_statuses CASCADE;
DROP TABLE IF EXISTS sprints CASCADE;
DROP TABLE IF EXISTS project_members CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- --------------------------------------------------------
-- 1. USERS
-- --------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. WORKSPACES
-- --------------------------------------------------------
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT NULL,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. WORKSPACE MEMBERS
-- --------------------------------------------------------
CREATE TABLE workspace_members (
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

-- --------------------------------------------------------
-- 4. PROJECTS
-- --------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    key VARCHAR(10) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    lead_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_projects_workspace_key UNIQUE (workspace_id, key)
);

-- --------------------------------------------------------
-- 5. PROJECT MEMBERS
-- --------------------------------------------------------
CREATE TABLE project_members (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('LEAD', 'MEMBER')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (project_id, user_id)
);

-- --------------------------------------------------------
-- 6. SPRINTS
-- --------------------------------------------------------
CREATE TABLE sprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    goal TEXT NULL,
    start_date TIMESTAMPTZ NULL,
    end_date TIMESTAMPTZ NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PLANNED' CHECK (status IN ('PLANNED', 'ACTIVE', 'COMPLETED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 7. TASK STATUSES
-- --------------------------------------------------------
CREATE TABLE task_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('TODO', 'IN_PROGRESS', 'DONE', 'CANCELLED')),
    position INT NOT NULL DEFAULT 0,
    color VARCHAR(20) DEFAULT '#6B7280',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 8. TASKS
-- --------------------------------------------------------
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    sprint_id UUID NULL REFERENCES sprints(id) ON DELETE SET NULL,
    parent_id UUID NULL REFERENCES tasks(id) ON DELETE CASCADE,
    status_id UUID NOT NULL REFERENCES task_statuses(id) ON DELETE RESTRICT,
    task_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    assignee_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ NULL,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_tasks_project_number UNIQUE (project_id, task_number)
);

-- --------------------------------------------------------
-- 9. LABELS
-- --------------------------------------------------------
CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL DEFAULT '#3B82F6',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 10. TASK LABELS
-- --------------------------------------------------------
CREATE TABLE task_labels (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, label_id)
);

-- --------------------------------------------------------
-- 11. COMMENTS
-- --------------------------------------------------------
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- --------------------------------------------------------
CREATE INDEX idx_tasks_project_status ON tasks(project_id, status_id);
CREATE INDEX idx_tasks_sprint ON tasks(sprint_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_position ON tasks(status_id, position ASC);
CREATE INDEX idx_comments_task ON comments(task_id, created_at ASC);

-- --------------------------------------------------------
-- ENABLE ROW LEVEL SECURITY (RLS) WITH PERMISSIVE POLICIES
-- Allow full access for MVP development
-- --------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write access to users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to workspaces" ON workspaces FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to workspace_members" ON workspace_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to project_members" ON project_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to sprints" ON sprints FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to task_statuses" ON task_statuses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to tasks" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to labels" ON labels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to task_labels" ON task_labels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access to comments" ON comments FOR ALL USING (true) WITH CHECK (true);

-- --------------------------------------------------------
-- SAMPLE SEED DATA FOR TESTING
-- --------------------------------------------------------
DO $$
DECLARE
    v_user_id UUID;
    v_workspace_id UUID;
    v_project_id UUID;
    v_status_todo_id UUID;
    v_status_in_progress_id UUID;
    v_status_done_id UUID;
    v_task1_id UUID;
    v_label_frontend_id UUID;
BEGIN
    -- 1. Create Demo User
    INSERT INTO users (email, password_hash, full_name, avatar_url)
    VALUES ('alex@example.com', '$2a$10$demo_hash_value', 'Alex Morgan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex')
    RETURNING id INTO v_user_id;

    -- 2. Create Demo Workspace
    INSERT INTO workspaces (name, slug, owner_id)
    VALUES ('Acme Corp', 'acme-corp', v_user_id)
    RETURNING id INTO v_workspace_id;

    -- Workspace Member
    INSERT INTO workspace_members (workspace_id, user_id, role)
    VALUES (v_workspace_id, v_user_id, 'OWNER');

    -- 3. Create Demo Project
    INSERT INTO projects (workspace_id, key, name, description, lead_id)
    VALUES (v_workspace_id, 'PRJ', 'Project Alpha', 'Frontend React Project Management App', v_user_id)
    RETURNING id INTO v_project_id;

    -- Project Member
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (v_project_id, v_user_id, 'LEAD');

    -- 4. Create Task Statuses
    INSERT INTO task_statuses (project_id, name, category, position, color)
    VALUES (v_project_id, 'To Do', 'TODO', 0, '#6B7280')
    RETURNING id INTO v_status_todo_id;

    INSERT INTO task_statuses (project_id, name, category, position, color)
    VALUES (v_project_id, 'In Progress', 'IN_PROGRESS', 1, '#3B82F6')
    RETURNING id INTO v_status_in_progress_id;

    INSERT INTO task_statuses (project_id, name, category, position, color)
    VALUES (v_project_id, 'Done', 'DONE', 2, '#10B981')
    RETURNING id INTO v_status_done_id;

    -- 5. Create Labels
    INSERT INTO labels (workspace_id, name, color)
    VALUES (v_workspace_id, 'Frontend', '#3B82F6')
    RETURNING id INTO v_label_frontend_id;

    INSERT INTO labels (workspace_id, name, color)
    VALUES (v_workspace_id, 'Bug', '#EF4444');

    -- 6. Create Sample Tasks
    INSERT INTO tasks (project_id, status_id, task_number, title, description, priority, reporter_id, assignee_id, position)
    VALUES (v_project_id, v_status_todo_id, 1, 'Setup Supabase Integration', 'Connect Supabase SDK and apply database schema', 'HIGH', v_user_id, v_user_id, 0)
    RETURNING id INTO v_task1_id;

    INSERT INTO tasks (project_id, status_id, task_number, title, description, priority, reporter_id, assignee_id, position)
    VALUES (v_project_id, v_status_in_progress_id, 2, 'Build Kanban Board Layout', 'Create drag-and-drop Kanban columns with Tailwind CSS', 'MEDIUM', v_user_id, v_user_id, 0);

    -- Task Label
    INSERT INTO task_labels (task_id, label_id)
    VALUES (v_task1_id, v_label_frontend_id);

    -- Sample Comment
    INSERT INTO comments (task_id, author_id, content)
    VALUES (v_task1_id, v_user_id, 'Database schema applied successfully! Ready for frontend integration.');

END $$;
