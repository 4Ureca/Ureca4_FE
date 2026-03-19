import { useGetUnreadCountQuery } from "../../shared/api/generated/notification";
import { ROUTES } from "../../shared/config/routes";
import { ContextNavItem } from "../../shared/ui/ContextNavItem";
import { NoticeIcon } from "../../shared/ui/icons";
import * as layout from "../../shared/ui/pageLayout.css";

interface AppSidebarProps {
  label: string;
  children: React.ReactNode;
}

export function AppSidebar({ label, children }: AppSidebarProps) {
  const unreadCount = useGetUnreadCountQuery({ query: { staleTime: 0, refetchOnMount: "always", refetchInterval: 120_000 } }).data?.data ?? 0;

  return (
    <aside className={layout.contextPanel}>
      <div className={layout.contextLabel}>{label}</div>
      {children}
      <div style={{ marginTop: "auto" }}>
        <ContextNavItem
          to={ROUTES.NOTIFICATIONS}
          icon={<NoticeIcon />}
          label="알림"
          badge={unreadCount > 0 ? unreadCount : undefined}
        />
      </div>
    </aside>
  );
}
