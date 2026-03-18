import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	redirect,
	Scripts,
} from "@tanstack/react-router";

import { Providers } from "../app/providers";
import appCss from "../app/styles.css?url";
import { getAccessToken } from "../shared/api/tokenStore";
import { ROUTES } from "../shared/config/routes";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		beforeLoad: ({ location }) => {
			const isAuthPath = location.pathname === ROUTES.LOGIN || location.pathname.startsWith("/oauth");
			if (!isAuthPath && !getAccessToken()) {
				throw redirect({ to: ROUTES.LOGIN });
			}
		},
		head: () => ({
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: "상담4조",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg",
				},
			],
		}),
		component: RootComponent,
		shellComponent: RootDocument,
	},
);

function RootComponent() {
	return (
		<Providers>
			<Outlet />
		</Providers>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
