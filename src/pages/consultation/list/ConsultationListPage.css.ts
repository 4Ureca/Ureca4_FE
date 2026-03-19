import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

export const pageWrapper = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

export const header = style({
  padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`,
  flexShrink: 0,
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

export const content = style({
  flex: 1,
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
});

/* ─── Filter Bar ─── */

export const filterBar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["2"],
  padding: vars.spacing["3"],
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  maxWidth: "480px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
});

export const filterRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing["2"],
  flexWrap: "wrap",
});

export const searchGroup = style({
  display: "flex",
  width: "100%",
  gap: 0,
});

export const searchInput = style({
  flex: 1,
  padding: vars.spacing["2"],
  border: `1px solid ${vars.color.border}`,
  borderRight: "none",
  borderRadius: `${vars.radius.md} 0 0 ${vars.radius.md}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: "#F9FAFB",
  outline: "none",
  ":focus": {
    borderColor: vars.color.borderFocus,
    backgroundColor: vars.color.surface,
  },
});

export const searchBtn = style({
  padding: vars.spacing["2"],
  border: `1px solid ${vars.color.primary}`,
  borderRadius: `0 ${vars.radius.md} ${vars.radius.md} 0`,
  backgroundColor: vars.color.primary,
  color: "#FFFFFF",
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: `all 150ms ease`,
  ":hover": { opacity: 0.9 },
});

export const dropdownWrapper = style({
  position: "relative",
  display: "inline-block",
  flexShrink: 0,
});

export const dropdownTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing["1"],
  padding: vars.spacing["2"],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  transition: `border-color 150ms ease, background-color 150ms ease`,
  selectors: {
    "&:hover": { borderColor: vars.color.textSecondary },
  },
});

export const dropdownTriggerActive = style({
  borderColor: vars.color.primary,
  color: vars.color.primary,
  backgroundColor: "#EFF6FF",
  selectors: {
    "&:hover": { borderColor: vars.color.primary },
  },
});

export const dropdownChevron = style({
  fontSize: "9px",
  color: "inherit",
  transition: `transform 150ms ease`,
});

export const dropdownChevronOpen = style({
  transform: "rotate(180deg)",
});

export const dropdownMenu = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  minWidth: "100%",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
  zIndex: 50,
  overflow: "hidden",
  padding: `${vars.spacing["1"]} 0`,
});

export const dropdownItem = style({
  display: "block",
  width: "100%",
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  selectors: {
    "&:hover": { backgroundColor: "#F3F4F6" },
  },
});

export const dropdownItemActive = style({
  color: vars.color.primary,
  fontWeight: vars.fontWeight.medium,
  backgroundColor: "#EFF6FF",
  selectors: {
    "&:hover": { backgroundColor: "#DBEAFE" },
  },
});

/* ─── Table ─── */

export const tableWrapper = style({
  overflow: "auto",
  flex: 1,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: vars.fontSize.sm,
});

export const thead = style({
  backgroundColor: "#F9FAFB",
  borderBottom: `1px solid ${vars.color.border}`,
  position: "sticky",
  top: 0,
  zIndex: 1,
});

export const th = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  textAlign: "left",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  whiteSpace: "nowrap",
});

export const tr = style({
  borderBottom: "1px solid #F3F4F6",
  ":hover": { backgroundColor: "#FAFAFA" },
});

export const td = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  color: vars.color.textPrimary,
  whiteSpace: "nowrap",
});

/* ─── Badges ─── */

const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px 8px`,
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
});

export const badgeVariant = styleVariants({
  blue:   [badgeBase, { backgroundColor: "#EFF6FF", color: "#2563EB" }],
  red:    [badgeBase, { backgroundColor: "#FEF2F2", color: "#DC2626" }],
  green:  [badgeBase, { backgroundColor: "#ECFDF5", color: "#059669" }],
  orange: [badgeBase, { backgroundColor: "#FFF7ED", color: "#EA580C" }],
  purple: [badgeBase, { backgroundColor: "#F5F3FF", color: "#7C3AED" }],
  gray:   [badgeBase, { backgroundColor: "#F3F4F6", color: "#6B7280" }],
});

/* ─── Stars ─── */

export const starsFilled = style({ color: "#F59E0B" });
export const starsEmpty  = style({ color: "#E5E7EB" });

/* ─── Action Buttons ─── */

export const actionGroup = style({
  display: "flex",
  gap: vars.spacing["1"],
});

export const actionBtn = style({
  padding: `2px ${vars.spacing["2"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": {
    backgroundColor: "#F9FAFB",
    borderColor: vars.color.textSecondary,
  },
});

export const actionBtnDetail = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  whiteSpace: "nowrap",
  ":hover": {
    backgroundColor: vars.color.primary,
    borderColor: vars.color.primary,
    color: "#FFFFFF",
  },
});

/* ─── Pagination ─── */

export const pagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
});

export const pageInfo = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
});

export const pageButtons = style({
  display: "flex",
  gap: vars.spacing["1"],
});

const pageBtnBase = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
});

export const pageBtn = style([pageBtnBase, {
  color: vars.color.textSecondary,
  backgroundColor: vars.color.surface,
  ":hover": { backgroundColor: "#F9FAFB" },
}]);

export const pageBtnActive = style([pageBtnBase, {
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
  color: "#FFFFFF",
  ":hover": { backgroundColor: vars.color.primaryHover },
}]);

export const pageBtnDisabled = style([pageBtnBase, {
  color: vars.color.textDisabled,
  backgroundColor: vars.color.surface,
  opacity: 0.4,
  cursor: "not-allowed",
  pointerEvents: "none",
}]);

/* ─── Animation ─── */

const fadeIn = keyframes({ from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "translateY(0)" } });

export const tableAnimate = style({ animation: `${fadeIn} 180ms ease` });

/* ─── States ─── */

export const stateText = style({
  textAlign: "center",
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});
