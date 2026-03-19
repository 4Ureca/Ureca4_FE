import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const pageWrapper = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
});

export const pageHeader = style({
  backgroundImage: "linear-gradient(135deg, #0F2557 0%, #1D4ED8 60%, #6D28D9 100%)",
  backgroundColor: "#0F2557",
  padding: `${vars.spacing["8"]} ${vars.spacing["8"]} ${vars.spacing["6"]}`,
  flexShrink: 0,
});

export const headerBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: `3px ${vars.spacing["3"]}`,
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  color: "rgba(255,255,255,0.85)",
  backgroundColor: "rgba(255,255,255,0.1)",
  marginBottom: vars.spacing["2"],
});

export const headerTitle = style({
  fontSize: vars.fontSize["3xl"],
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
  margin: `0 0 4px 0`,
  letterSpacing: "-0.6px",
});

export const headerSubtitle = style({
  fontSize: vars.fontSize.sm,
  color: "rgba(255,255,255,0.65)",
  margin: 0,
});

export const content = style({
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  paddingBottom: vars.spacing["8"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
  animation: `${fadeIn} 0.35s ease`,
});

/* ─── Filter Bar ─── */

export const filterBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["4"],
  flexWrap: "wrap",
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  padding: vars.spacing["4"],
  flexShrink: 0,
});

export const filterGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
});

export const filterLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  whiteSpace: "nowrap",
});

export const filterSelect = style({
  padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  outline: "none",
  ":focus": { borderColor: vars.color.primary },
});

/* ─── Autocomplete ─── */

export const autocompleteWrap = style({
  position: "relative",
  width: "280px",
});

export const autocompleteInputWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const autocompleteInput = style({
  width: "100%",
  padding: `${vars.spacing["2"]} ${vars.spacing["8"]} ${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  outline: "none",
  transition: `border-color ${vars.transition.fast}`,
  ":focus": { borderColor: vars.color.primary },
  "::placeholder": { color: vars.color.textSecondary },
});

export const autocompleteClear = style({
  position: "absolute",
  right: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  borderRadius: vars.radius.full,
  border: "none",
  backgroundColor: "#CBD5E1",
  color: "#FFFFFF",
  fontSize: "12px",
  lineHeight: 1,
  cursor: "pointer",
  flexShrink: 0,
  ":hover": { backgroundColor: "#94A3B8" },
});

export const autocompleteDropdown = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
  maxHeight: "240px",
  overflowY: "auto",
  zIndex: 50,
  listStyle: "none",
  margin: 0,
  padding: "4px 0",
});

export const autocompleteItem = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  cursor: "pointer",
  ":hover": { backgroundColor: "#F8FAFC" },
});

export const autocompleteItemHighlighted = style([autocompleteItem, {
  backgroundColor: "#EFF6FF",
  color: vars.color.primary,
}]);

export const autocompleteEmpty = style({
  padding: `${vars.spacing["3"]} ${vars.spacing["3"]}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  textAlign: "center",
});

export const resetBtn = style({
  padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`,
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  backgroundColor: "transparent",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  ":hover": { color: vars.color.textPrimary, borderColor: vars.color.textSecondary },
});

export const totalCount = style({
  marginLeft: "auto",
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
});

/* ─── Pagination ─── */

export const pagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  flexShrink: 0,
});

export const pageBtn = style({
  minWidth: "32px",
  height: "32px",
  padding: `0 ${vars.spacing["2"]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": { borderColor: "#94A3B8", color: vars.color.textPrimary },
  ":disabled": { opacity: 0.4, cursor: "default", pointerEvents: "none" },
});

export const pageBtnActive = style([pageBtn, {
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
  color: "#FFFFFF",
  ":hover": { backgroundColor: vars.color.primaryHover, borderColor: vars.color.primaryHover },
}]);

export const inactiveBadge = style({
  display: "inline-flex",
  padding: `1px 6px`,
  borderRadius: vars.radius.full,
  fontSize: "10px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#F1F5F9",
  color: "#64748B",
  flexShrink: 0,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
});

export const card = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  overflow: "hidden",
  boxShadow: vars.shadow.sm,
});

export const cardHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["3"],
  padding: vars.spacing["4"],
  width: "100%",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  textAlign: "left",
  ":hover": { backgroundColor: "#F8FAFC" },
});

export const cardHeaderLeft = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  flex: 1,
  minWidth: 0,
});

export const cardHeaderRight = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  flexShrink: 0,
});

export const categoryPill = style({
  display: "inline-flex",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#EFF6FF",
  color: "#1E40AF",
  whiteSpace: "nowrap",
  flexShrink: 0,
});

export const cardTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const dateText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  whiteSpace: "nowrap",
});

export const chevron = style({
  fontSize: "18px",
  color: vars.color.textSecondary,
  transition: "transform 0.2s",
  lineHeight: 1,
});

export const cardBody = style({
  padding: `0 ${vars.spacing["4"]} ${vars.spacing["4"]}`,
  borderTop: `1px solid ${vars.color.border}`,
  paddingTop: vars.spacing["4"],
});

export const cardContent = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  lineHeight: vars.lineHeight.normal,
  whiteSpace: "pre-wrap",
  margin: 0,
});

export const stateText = style({
  textAlign: "center",
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});

/* ─── Modal Detail ─── */

export const modalDetailWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
});

export const modalInfoGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.spacing["3"],
  padding: vars.spacing["4"],
  backgroundColor: "#F9FAFB",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
});

export const modalInfoItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const modalInfoLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.medium,
});

export const modalInfoValue = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  fontWeight: vars.fontWeight.medium,
});

export const activeBadge = style({
  display: "inline-flex",
  padding: `1px 6px`,
  borderRadius: vars.radius.full,
  fontSize: "10px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#ECFDF5",
  color: "#059669",
  flexShrink: 0,
});

export const modalSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
});

export const modalSectionTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  margin: 0,
});

export const modalContentBox = style({
  padding: vars.spacing["4"],
  backgroundColor: "#F9FAFB",
  borderLeft: `3px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  lineHeight: vars.lineHeight.relaxed,
  whiteSpace: "pre-wrap",
});

/* ─── Bookmark ─── */

export const bookmarkBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  border: "none",
  background: "none",
  cursor: "pointer",
  color: vars.color.textSecondary,
  borderRadius: vars.radius.sm,
  flexShrink: 0,
  transition: `color ${vars.transition.fast}`,
  ":hover": { color: "#F59E0B" },
  ":disabled": { opacity: 0.4, cursor: "not-allowed" },
});
