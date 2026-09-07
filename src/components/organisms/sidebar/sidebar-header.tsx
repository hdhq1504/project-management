import { Avatar, AvatarBadge } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button/button';
import { EditIcon, SearchIcon } from '@/components/atoms/icon';
import { useIssueModalStore } from '@/stores/issue-modal.store';

function SidebarHeader() {
  const openNewIssueModal = useIssueModalStore((state) => state.open);

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* Workspace Switcher */}
        <Button variant="ghost">
          <div className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-[#9e7c0c] text-[13px]">MW</div>
          <span className="text-sm font-medium">My Workspace</span>
        </Button>

        {/* Avatar */}
        <Button variant="ghost" size="icon">
          <Avatar size="sm" fallback="CN">
            <AvatarBadge className="bg-decoration-green" />
          </Avatar>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        {/* New Issue Button */}
        <Button variant="outline" className="flex flex-1 justify-start" onClick={() => openNewIssueModal()}>
          <EditIcon />
          New Issue
        </Button>

        {/* Search Button */}
        <Button variant="outline" size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
      </div>
    </header>
  );
}

export { SidebarHeader };
