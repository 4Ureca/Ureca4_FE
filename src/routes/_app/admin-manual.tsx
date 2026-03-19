import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminManualListPage } from "../../pages/admin/manual/AdminManualListPage";
import { getRole } from "../../shared/api/roleStore";
import { ROUTES } from "../../shared/config/routes";

export const Route = createFileRoute("/_app/admin-manual")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (getRole() !== "관리자") {
			throw redirect({ to: ROUTES.EXCELLENT });
		}
	},
	component: AdminManualListPage,
});
