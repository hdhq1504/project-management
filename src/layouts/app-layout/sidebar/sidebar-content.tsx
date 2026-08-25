import { SidebarNavigation } from './sidebar-navigation';
import { SidebarSection } from './sidebar-section';
import { workspaceNavigation } from './sidebar-data';

export default function SidebarContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pt-1">
      <SidebarSection title="Your teams">
        <SidebarNavigation items={workspaceNavigation} />
      </SidebarSection>
    </div>
  );
}
