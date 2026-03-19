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
import { getAccessToken, setAccessToken } from "../shared/api/tokenStore";
import { ROUTES } from "../shared/config/routes";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		beforeLoad: async ({ location }) => {
			// SSR 환경(서버)에서는 localStorage·쿠키에 접근 불가 → 클라이언트에서 처리
			if (typeof window === "undefined") return;

			const isAuthPath =
				location.pathname === ROUTES.LOGIN ||
				location.pathname.startsWith("/oauth");
			if (isAuthPath) return;

			// 토큰이 있으면 통과 (만료 여부는 afterResponse 401 hook이 처리)
			if (getAccessToken()) return;

			// 토큰이 없으면 httpOnly 쿠키의 refresh token으로 갱신 시도
			try {
				const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
				const res = await fetch(
					`${baseUrl.replace(/\/$/, "")}/auth/refresh`,
					{ method: "POST", credentials: "include" },
				);
				if (!res.ok) throw new Error("refresh failed");
				const body = (await res.json()) as { accessToken?: string };
				if (!body.accessToken) throw new Error("no token in response");
				setAccessToken(body.accessToken);
			} catch {
				throw redirect({ to: ROUTES.LOGIN });
			}
		},
		head: () => ({
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ title: "상담4조" },
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
