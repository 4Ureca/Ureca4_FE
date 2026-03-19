import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRole } from "../../../shared/api/roleStore";
import { ROUTES } from "../../../shared/config/routes";
import { OutboundPage } from "../../../pages/outbound/OutboundPage";

export const Route = createFileRoute("/_app/_consult/outbound-report")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (getRole() !== "관리자") throw redirect({ to: ROUTES.EXCELLENT });
  },
  component: OutboundPage,
});
