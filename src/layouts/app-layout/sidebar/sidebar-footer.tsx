import { Button } from '@/components/atoms/button/button';
import { useLogout } from '@/features/auth';
import { LogOut } from 'lucide-react';

export default function SidebarFooter() {
  const logoutMutation = useLogout();

  return (
    <div className="flex">
      <Button
        variant="outline"
        className="flex-1 justify-start"
        disabled={logoutMutation.isPending}
        onClick={() => logoutMutation.mutate()}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
