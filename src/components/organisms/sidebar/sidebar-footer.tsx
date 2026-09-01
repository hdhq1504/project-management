import { Button } from '@/components/atoms/button/button';
import { useLogout } from '@/hooks/use-logout';
import { LogOut } from 'lucide-react';

export function SidebarFooter() {
  const { mutate, isPending } = useLogout();

  return (
    <div className="flex">
      <Button variant="outline" className="flex-1 justify-start" disabled={isPending} onClick={() => mutate()}>
        <LogOut />
        Logout
      </Button>
    </div>
  );
}

export default SidebarFooter;
