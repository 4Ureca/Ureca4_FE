import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

/* ─── Keyframes (declared first — used throughout file) ─── */

const panelSlideIn = keyframes({
  from: { opacity: 0, transform: "translateX(-24px)" },
  to:   { opacity: 1, transform: "translateX(0)" },
});

const panelSlideOut = keyframes({
  from: { opacity: 1, transform: "translateX(0)" },
  to:   { opacity: 0, transform: "translateX(-24px)" },
});

const contentSlideRight = keyframes({
  from: { transform: "translateX(-120px)", opacity: 0.7 },
  to:   { transform: "translateX(0)",      opacity: 1 },
});

const contentSlideLeft = keyframes({
  from: { transform: "translateX(120px)",  opacity: 0.7 },
  to:   { transform: "translateX(0)",      opacity: 1 },
});

const panelRowFadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(10px)" },
  to:   { opacity: 1, transform: "translateY(0)" },
});

export const pageWrapper = style({
  flex: 1,
  overflowY: "auto",
});

export const header = style({
  padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`,
  flexShrink: 0,
});

export const headerRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.spacing["4"],
});

export const title = style({
  fontSize: vars.fontSize["2xl"],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  letterSpacing: "-0.4px",
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  marginTop: "5px",
});

export const refreshBtn = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  color: vars.color.textPrimary,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  whiteSpace: "nowrap",
  flexShrink: 0,
  marginTop: "4px",
  transition: `all ${vars.transition.fast}`,
  selectors: {
    "&:hover": { backgroundColor: "#F3F4F6", borderColor: vars.color.textSecondary },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" },
  },
});

/* ─── Body Layout ─── */

export const body = style({
  display: "flex",
  gap: vars.spacing["6"],
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  alignItems: "flex-start",
  maxWidth: "960px",
  margin: "0 auto",
  width: "100%",
  boxSizing: "border-box",
});

export const contentArea = style({
  flex: 1,
  minWidth: 0,
  maxWidth: "640px",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
});

export const contentGroup = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  gap: vars.spacing["6"],
  alignItems: "flex-start",
});

export const contentGroupExpanded = style([contentGroup, {
  animation: `${contentSlideRight} 300ms ease forwards`,
}]);

export const contentGroupClosing = style([contentGroup, {
  animation: `${contentSlideLeft} 300ms ease forwards`,
}]);

/* ─── Progress Panel ─── */

export const progressPanelWrapper = style({
  width: "220px",
  flexShrink: 0,
  position: "sticky",
  top: vars.spacing["6"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
});

export const progressPanel = style({
  width: "100%",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  padding: vars.spacing["4"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
});

export const progressTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  margin: 0,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const progressCount = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  margin: 0,
});

export const progressBar = style({
  height: "6px",
  backgroundColor: "#E5E7EB",
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: "#10B981",
  borderRadius: vars.radius.full,
  transition: `width ${vars.transition.fast}`,
});

export const progressList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const progressItem = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: vars.fontSize.xs,
});

export const checkDone = style({
  width: "16px",
  height: "16px",
  borderRadius: vars.radius.full,
  backgroundColor: "#10B981",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
});

export const checkEmpty = style({
  width: "16px",
  height: "16px",
  borderRadius: vars.radius.full,
  border: `1.5px solid #D1D5DB`,
  backgroundColor: "#F9FAFB",
  flexShrink: 0,
});

export const progressLabelDone = style({
  color: vars.color.textPrimary,
});

export const progressLabel = style({
  color: "#9CA3AF",
});

export const chatBtn = style({
  marginTop: vars.spacing["1"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  textAlign: "center",
  transition: `all ${vars.transition.fast}`,
  selectors: {
    "&:hover": { backgroundColor: "#F3F4F6", color: vars.color.textPrimary },
  },
});

export const manualBtn = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1.5px solid #EAB308`,
  borderRadius: vars.radius.md,
  backgroundColor: "#FEFCE8",
  color: "#713F12",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  cursor: "pointer",
  textAlign: "center",
  transition: `all ${vars.transition.fast}`,
  selectors: {
    "&:hover": { backgroundColor: "#FEF08A", borderColor: "#CA8A04" },
  },
});

export const summaryFetchBtn = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1.5px solid #EA580C`,
  borderRadius: vars.radius.md,
  backgroundColor: "#FFF7ED",
  color: "#7C2D12",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  cursor: "pointer",
  textAlign: "center",
  transition: `all ${vars.transition.fast}`,
  selectors: {
    "&:hover": { backgroundColor: "#FED7AA", borderColor: "#C2410C" },
  },
});

/* ─── Notice ─── */

export const noticeCard = style({
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: vars.radius.lg,
  padding: vars.spacing["4"],
  flexShrink: 0,
});

export const noticeTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: "#1D4ED8",
  margin: `0 0 ${vars.spacing["1"]} 0`,
});

export const noticeText = style({
  fontSize: vars.fontSize.xs,
  color: "#3B82F6",
  margin: 0,
  lineHeight: vars.lineHeight.normal,
});

/* ─── Card ─── */

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  boxShadow: vars.shadow.sm,
  flexShrink: 0,
});

export const cardHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["4"]} ${vars.spacing["5"]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: "#FAFAFA",
});

export const cardTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
});

export const cardTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  margin: 0,
});

export const cardMeta = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.medium,
  letterSpacing: "0.04em",
});

export const cardMetaEditable = style([cardMeta, {
  color: vars.color.primary,
}]);

export const aiBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  color: "#1D4ED8",
  fontWeight: vars.fontWeight.medium,
});

export const cardBody = style({
  padding: vars.spacing["5"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
});

/* ─── Grid Layouts ─── */

export const grid2 = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.spacing["3"],
});

export const grid3 = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: vars.spacing["3"],
});

/* ─── Field ─── */

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const fieldLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.medium,
});

export const fieldValue = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  backgroundColor: "#F9FAFB",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  minHeight: "38px",
  display: "flex",
  alignItems: "center",
});

export const fieldValuePlaceholder = style([fieldValue, {
  color: "#9CA3AF",
  fontStyle: "italic",
}]);

export const textarea = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: vars.lineHeight.normal,
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.borderFocus },
  },
});

export const textareaError = style({
  borderColor: "#EF4444",
  selectors: {
    "&::placeholder": { color: "#EF4444" },
  },
});

/* ─── Footer ─── */

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingBottom: vars.spacing["4"],
  flexShrink: 0,
});

export const submitBtn = style({
  padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
  backgroundColor: vars.color.primary,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: "#FFFFFF",
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  selectors: {
    "&:hover": { backgroundColor: vars.color.primaryHover },
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
});

/* ─── State ─── */

export const stateText = style({
  textAlign: "center",
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});

export const successMsg = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.success,
  fontWeight: vars.fontWeight.medium,
  alignSelf: "center",
  marginRight: "auto",
});

/* ─── Product Table ─── */

export const productTableWrapper = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: "hidden",
});

export const productTableHeader = style({
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr 2fr 1fr",
  gap: vars.spacing["3"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  backgroundColor: "#F3F4F6",
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.semibold,
});

export const productTableRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr 2fr 1fr",
  gap: vars.spacing["3"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: "#F9FAFB",
  selectors: {
    "&:not(:last-child)": { borderBottom: `1px solid ${vars.color.border}` },
  },
});

export const productTableCell = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

/* ─── Progress Panel Sections ─── */

export const sectionItem = style({
  display: "flex",
  flexDirection: "column",
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  padding: `6px ${vars.spacing["1"]}`,
  cursor: "pointer",
  background: "none",
  border: "none",
  width: "100%",
  textAlign: "left",
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": { backgroundColor: "#F3F4F6" },
  },
});

export const sectionChevron = style({
  fontSize: "9px",
  color: vars.color.textSecondary,
  flexShrink: 0,
  width: "10px",
});

export const sectionLabel = style({
  flex: 1,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
});

export const sectionLabelDone = style({
  flex: 1,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: "#10B981",
});

export const subList = style({
  listStyle: "none",
  margin: `0 0 ${vars.spacing["1"]} 0`,
  padding: `0 0 0 20px`,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const subItem = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: vars.fontSize.xs,
});

/* ─── Manual Card Layout ─── */

export const bodyExpanded = style({
  display: "flex",
  gap: vars.spacing["6"],
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  alignItems: "flex-start",
  width: "100%",
  boxSizing: "border-box",
});

const manualCardBase = {
  flex: 1,
  minWidth: "280px",
  maxWidth: "420px",
  alignSelf: "flex-start" as const,
  position: "sticky" as const,
  top: vars.spacing["6"],
  display: "flex",
  flexDirection: "column" as const,
  gap: vars.spacing["5"],
  paddingRight: vars.spacing["6"],
  borderRight: `1.5px solid ${vars.color.border}`,
};

export const manualCardContainer = style({
  ...manualCardBase,
  animation: `${panelSlideIn} 280ms ease forwards`,
});

export const manualCardContainerClosing = style({
  ...manualCardBase,
  animation: `${panelSlideOut} 280ms ease forwards`,
  pointerEvents: "none",
});

/* ─── Manual Panel Inner (카드 형태) ─── */

export const manualPanelInner = style({
  backgroundColor: "#FFFBEB",
  border: `1.5px solid #EAB308`,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(234,179,8,0.15)",
  display: "flex",
  flexDirection: "column",
  maxHeight: "calc(100vh - 160px)",
});

export const manualPanelHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["2"],
  padding: `${vars.spacing["4"]} ${vars.spacing["5"]}`,
  borderBottom: `1px solid #FDE047`,
  backgroundColor: "#FEF9C3",
  flexShrink: 0,
});

/* 주황 계열 카드 — 상담 요약 상세 */
export const summaryDetailCard = style({
  backgroundColor: "#FFF7ED",
  border: `1.5px solid #EA580C`,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(234,88,12,0.15)",
  display: "flex",
  flexDirection: "column",
  animation: `${panelSlideIn} 280ms ease forwards`,
});

export const summaryDetailHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["2"],
  padding: `${vars.spacing["4"]} ${vars.spacing["5"]}`,
  borderBottom: `1px solid #FDBA74`,
  backgroundColor: "#FFEDD5",
  flexShrink: 0,
});

export const manualPanelTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  flex: 1,
});

export const manualPanelCategory = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  backgroundColor: "#EFF6FF",
  border: `1px solid #BFDBFE`,
  borderRadius: vars.radius.full,
  padding: `2px 8px`,
  maxWidth: "120px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const manualPanelCloseBtn = style({
  padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  flexShrink: 0,
  selectors: {
    "&:hover": { backgroundColor: "#F3F4F6", color: vars.color.textPrimary },
  },
});

export const manualPanelBody = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.spacing["5"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
});

export const manualPanelState = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  textAlign: "center",
  padding: `${vars.spacing["8"]} 0`,
});

export const manualPanelList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["1"],
});

export const manualPanelItem = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  overflow: "hidden",
});

export const manualPanelItemHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["2"],
  padding: `${vars.spacing["3"]} ${vars.spacing["3"]}`,
  background: "none",
  border: "none",
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  selectors: {
    "&:hover": { backgroundColor: "#F9FAFB" },
  },
});

export const manualPanelItemTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  flex: 1,
  lineHeight: "1.4",
});

export const manualPanelChevron = style({
  fontSize: "16px",
  color: vars.color.textSecondary,
  flexShrink: 0,
  transition: `transform ${vars.transition.fast}`,
});

export const manualPanelItemBody = style({
  padding: `0 ${vars.spacing["3"]} ${vars.spacing["3"]}`,
  borderTop: `1px solid #F3F4F6`,
});

export const manualPanelItemContent = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  margin: `${vars.spacing["2"]} 0 0`,
  whiteSpace: "pre-wrap",
});

/* ─── Manual Button fade ─── */

const fadeOut = keyframes({
  from: { opacity: 1, maxHeight: "40px", paddingTop: "8px", paddingBottom: "8px" },
  to:   { opacity: 0, maxHeight: 0,      paddingTop: 0,     paddingBottom: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0, maxHeight: 0,      paddingTop: 0,     paddingBottom: 0 },
  to:   { opacity: 1, maxHeight: "40px", paddingTop: "8px", paddingBottom: "8px" },
});

export const manualBtnHiding = style({
  overflow: "hidden",
  animation: `${fadeOut} 200ms ease forwards`,
  pointerEvents: "none",
});

export const manualBtnShowing = style({
  overflow: "hidden",
  animation: `${fadeIn} 200ms ease forwards`,
});

/* ─── Bookmark Panels Row ─── */

export const bookmarkPanelsRow = style({
  display: "flex",
  gap: vars.spacing["4"],
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  paddingTop: 0,
  width: "100%",
  boxSizing: "border-box",
  animation: `${panelRowFadeIn} 300ms ease forwards`,
});

export const bookmarkPanel = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "180px",
});

export const bookmarkPanelHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: "#FAFAFA",
  flexShrink: 0,
});

export const bookmarkPanelTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  margin: 0,
  letterSpacing: "0.04em",
});

export const bookmarkPanelLarge = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "170px",
});

export const bookmarkPanelBody = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.spacing["3"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["1"],
});

export const searchRow = style({
  display: "flex",
  gap: vars.spacing["1"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  flexShrink: 0,
});

export const searchInput = style({
  flex: 1,
  padding: `${vars.spacing["1"]} ${vars.spacing["2"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.borderFocus },
  },
});

export const searchSubmitBtn = style({
  padding: `${vars.spacing["1"]} ${vars.spacing["2"]}`,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.primary,
  color: "#FFFFFF",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  cursor: "pointer",
  flexShrink: 0,
  selectors: {
    "&:hover": { backgroundColor: vars.color.primaryHover },
  },
});

export const bookmarkPanelEmpty = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  textAlign: "center",
  padding: `${vars.spacing["6"]} 0`,
});

export const bookmarkPanelItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["2"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
  selectors: {
    "&:hover": { backgroundColor: "#F9FAFB", borderColor: vars.color.primary },
  },
});

export const bookmarkPanelItemText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textPrimary,
  fontWeight: vars.fontWeight.medium,
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const bookmarkPanelItemMeta = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  flexShrink: 0,
});

/* ─── Progress Panel Expanded (bookmark panels inline) ─── */

export const progressPanelWrapperExpanded = style({
  width: "600px",
  flexShrink: 0,
  position: "sticky",
  top: vars.spacing["6"],
  alignSelf: "flex-start",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
});

export const progressPanelNarrow = style({
  width: "220px",
  alignSelf: "flex-end",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
});

export const bookmarkPanelsRowInline = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
  animation: `${panelRowFadeIn} 300ms ease forwards`,
});

/* ─── Bookmark Detail Card ─── */

export const bookmarkDetailCard = style({
  backgroundColor: "#FFF7ED",
  border: `1.5px solid #EA580C`,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(234,88,12,0.15)",
  display: "flex",
  flexDirection: "column",
  animation: `${panelSlideIn} 280ms ease forwards`,
});

export const bookmarkDetailBody = style({
  padding: vars.spacing["4"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
  overflowY: "auto",
  maxHeight: "260px",
});

export const bookmarkDetailLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  marginBottom: "4px",
});

export const bookmarkDetailValue = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textPrimary,
  lineHeight: vars.lineHeight.relaxed,
  whiteSpace: "pre-wrap",
});
