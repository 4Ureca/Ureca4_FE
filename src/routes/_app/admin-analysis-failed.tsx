import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRole } from "../../shared/api/roleStore";
import { ROUTES } from "../../shared/config/routes";
import { AdminAnalysisFailedPage } from "../../pages/admin/analysisFailed/AdminAnalysisFailedPage";

export const Route = createFileRoute("/_app/admin-analysis-failed")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return;

    if (getRole() !== "관리자") {
      throw redirect({ to: ROUTES.EXCELLENT });
    }
  },
  component: AdminAnalysisFailedPage,
});