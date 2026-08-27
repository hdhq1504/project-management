import { SidebarNavigation } from './sidebar-navigation';
import { SidebarSection } from './sidebar-section';
import { workspaceNavigation } from './sidebar-data';

export default function SidebarContent() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <SidebarSection title="Your teams">
        <SidebarNavigation items={workspaceNavigation} />
      </SidebarSection>
    </div>
  );
}
