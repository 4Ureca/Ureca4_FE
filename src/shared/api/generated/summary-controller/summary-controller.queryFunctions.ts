import { apiClient } from "../../client";
import type {
	ConsultationSummaryDetailResponse,
	ListParams,
	PageConsultationSummaryDto,
} from "../api.schemas";

export const getSummaryList = (params?: ListParams, signal?: AbortSignal) => {
	return apiClient<PageConsultationSummaryDto>({
		url: `/api/summaries`,
		method: "GET",
		params: params as Record<string, string | number | boolean> | undefined,
		signal,
	});
};

export const getSummaryDetail = (consultId: number, signal?: AbortSignal) => {
	return apiClient<ConsultationSummaryDetailResponse>({
		url: `/api/summaries/${consultId}`,
		method: "GET",
		signal,
	});
};
