import ky from "ky"

import { getAccessToken, setAccessToken } from "./tokenStore"

// 진행 중인 refresh 요청을 공유 — 동시 401이 여러 개 와도 한 번만 refresh
let refreshingPromise: Promise<string> | null = null

async function doRefresh(): Promise<string> {
	if (refreshingPromise) return refreshingPromise

	refreshingPromise = ky
		.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
			credentials: "include",
		})
		.json<{ accessToken?: string }>()
		.then((data) => {
			if (!data.accessToken) throw new Error("no token in refresh response")
			setAccessToken(data.accessToken)
			return data.accessToken
		})
		.finally(() => {
			refreshingPromise = null
		})

	return refreshingPromise
}

const kyInstance = ky.create({
	prefixUrl: import.meta.env.VITE_API_BASE_URL,
	credentials: "include",
	hooks: {
		beforeRequest: [
			(request) => {
				const token = getAccessToken()
				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`)
				}
			},
		],
		afterResponse: [
			async (request, _options, response) => {
				if (response.status !== 401) return response

				// 인증 엔드포인트 자체가 401이면 갱신 시도하지 않음
				if (
					request.url.includes("/auth/refresh") ||
					request.url.includes("/auth/login")
				) {
					setAccessToken(null)
					return response
				}

				try {
					const newToken = await doRefresh()
					request.headers.set("Authorization", `Bearer ${newToken}`)
					return ky(request)
				} catch {
					setAccessToken(null)
					// SSR 환경에서는 window 없음
					if (typeof window !== "undefined") {
						window.location.href = "/login"
					}
				}
			},
		],
	},
})

// orval mutator 함수 - orval이 생성한 코드가 이 함수를 통해 요청
export const apiClient = <T>(config: {
	url: string
	method: string
	headers?: Record<string, string>
	params?: Record<string, string | number | boolean>
	data?: unknown
	signal?: AbortSignal
}): Promise<T> => {
	const searchParams = config.params
		? Object.fromEntries(
				Object.entries(config.params).filter(([, v]) => v !== undefined && v !== null),
		  )
		: undefined;

	return kyInstance(config.url.replace(/^\//, ""), {
		method: config.method,
		searchParams,
		json: config.data,
		signal: config.signal,
	}).json<T>()
}
