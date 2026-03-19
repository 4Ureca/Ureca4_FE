import { useEffect, useState } from "react";
import { ROUTES } from "../../shared/config/routes";
import {
  AnalysisIcon,
  ConsultationIcon,
  SettingsIcon,
  UPlusLogoIcon,
} from "../../shared/ui/icons";
import { getRole } from "../../shared/api/roleStore";
import { NavTab } from "../../shared/ui/NavTab/NavTab";
import * as s from "./AppTopbar.css";
import { UserDropdown } from "./UserDropdown";

export function AppTopbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => { setIsAdmin(getRole() === "관리자"); }, []);

  return (
    <header className={s.topbar}>
      <div className={s.logo}>
        <UPlusLogoIcon height={28} color="white" />
        <span className={s.logoName}>상담관리</span>
      </div>

      <nav className={s.tabs}>
        <NavTab icon={<AnalysisIcon />} label="대시보드" to={ROUTES.EXCELLENT} />
        <NavTab icon={<ConsultationIcon />} label="상담 업무" to={ROUTES.CONSULT} />
        {isAdmin && <NavTab icon={<SettingsIcon />} label="관리" to={ROUTES.ADMIN_EMPLOYEES} />}
      </nav>

      <div className={s.topbarRight}>
        <UserDropdown />
      </div>
    </header>
  );
}
