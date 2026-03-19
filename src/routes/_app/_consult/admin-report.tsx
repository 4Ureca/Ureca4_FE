import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRole } from "../../../shared/api/roleStore";
import { ROUTES } from "../../../shared/config/routes";
import { AdminReportPage } from "../../../pages/admin-report/AdminReportPage";

export const Route = createFileRoute("/_app/_consult/admin-report")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (getRole() !== "관리자") throw redirect({ to: ROUTES.EXCELLENT });
  },
  component: AdminReportPage,
});
