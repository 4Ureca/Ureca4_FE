export const ROUTES = {
  LOGIN: "/",
  MYPAGE: "/mypage",
  CONSULT: "/consultation-list",
  CONSULT_RESULT: "/consultation-result",
  EXCELLENT: "/excellent-cases",
  NOTICE: "/notice",
  SUMMARY: "/summary",
  ANALYSIS: "/analysis",
  ADMIN_REPORT: "/admin-report",
  ADMIN_EXCELLENT_CASES: "/admin-excellent-cases",
  MANUAL: "/manual",
  ADMIN_MANUAL: "/admin-manual",
  ADMIN_MANUAL_SETTINGS: "/admin-manual-settings",
  NOTIFICATIONS: "/notifications",
  ADMIN_EMPLOYEES: "/admin-employees",
  ADMIN_ANALYSIS_FAILED: "/admin-analysis-failed",
  OUTBOUND_REPORT: "/outbound-report",
  MY_BOOKMARKS: "/my-bookmarks",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
