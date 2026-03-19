import { Link } from "@tanstack/react-router";
import { ROUTES } from "../../shared/config/routes";
import { ContextNavItem } from "../../shared/ui/ContextNavItem";
import { SidebarNavGroup } from "../../shared/ui/SidebarNavGroup";
import { AnalysisIcon, BookmarkIcon, MegaphoneIcon, SettingsIcon } from "../../shared/ui/icons";
import * as layout from "../../shared/ui/pageLayout.css";
import { AppSidebar } from "../AppSidebar/AppSidebar";

interface Props { isAdmin?: boolean; }

export function DashboardSidebar({ isAdmin }: Props) {
  return (
    <AppSidebar label="대시보드">
      <ContextNavItem icon={<MegaphoneIcon />} label="공지사항" to={ROUTES.NOTICE} />
      {isAdmin ? (
        <SidebarNavGroup icon={<AnalysisIcon />} label="우수사례">
          <Link
            to={ROUTES.EXCELLENT}
            className={layout.contextSubItem}
            activeProps={{ className: `${layout.contextSubItem} ${layout.contextItemActive}` }}
          >
            <AnalysisIcon />
            주간 우수사례
          </Link>
          <Link
            to={ROUTES.ADMIN_EXCELLENT_CASES}
            className={layout.contextSubItem}
            activeProps={{ className: `${layout.contextSubItem} ${layout.contextItemActive}` }}
          >
            <SettingsIcon />
            후보군 관리
          </Link>
        </SidebarNavGroup>
      ) : (
        <ContextNavItem icon={<AnalysisIcon />} label="주간 우수사례" to={ROUTES.EXCELLENT} />
      )}
      {!isAdmin && (
        <ContextNavItem icon={<BookmarkIcon />} label="내 북마크" to={ROUTES.MY_BOOKMARKS} />
      )}
    </AppSidebar>
  );
}
