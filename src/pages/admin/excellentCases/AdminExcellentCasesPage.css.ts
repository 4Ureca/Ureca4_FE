import { style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

/* ─── Page Header ─── */

export const pageHeader = style({
  backgroundImage: "linear-gradient(135deg, #0F2557 0%, #1D4ED8 60%, #6D28D9 100%)",
  backgroundColor: "#0F2557",
  padding: `${vars.spacing["8"]} ${vars.spacing["8"]} ${vars.spacing["6"]}`,
  flexShrink: 0,
});

export const headerTop = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.spacing["4"],
});

export const weekNav = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["3"],
  backgroundColor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: vars.radius.lg,
  padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`,
  backdropFilter: "blur(4px)",
  flexShrink: 0,
});

export const weekNavBtn = style({
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: vars.radius.md,
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "#FFFFFF",
  cursor: "pointer",
  fontSize: "14px",
  transition: `all ${vars.transition.fast}`,
  ":hover": { backgroundColor: "rgba(255,255,255,0.25)" },
});

export const weekLabel = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: "#FFFFFF",
  minWidth: "120px",
  textAlign: "center",
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

/* ─── Stat Box Filter (4-column grid) ─── */

export const statBoxGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: vars.spacing["3"],
  marginBottom: vars.spacing["2"],
  flexShrink: 0,
});

export const statBox = style({
  backgroundColor: vars.color.surface,
  border: `2px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.spacing["4"],
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": {
    borderColor: "#94A3B8",
    boxShadow: vars.shadow.sm,
  },
});

export const statBoxAll = style([statBox, {
  selectors: {
    "&[data-active='true']": {
      borderColor: "#1D4ED8",
      backgroundColor: "#EFF6FF",
    },
  },
}]);

export const statBoxPending = style([statBox, {
  selectors: {
    "&[data-active='true']": {
      borderColor: "#D97706",
      backgroundColor: "#FFFBEB",
    },
  },
}]);

export const statBoxSelected = style([statBox, {
  selectors: {
    "&[data-active='true']": {
      borderColor: "#059669",
      backgroundColor: "#ECFDF5",
    },
  },
}]);

export const statBoxRejected = style([statBox, {
  selectors: {
    "&[data-active='true']": {
      borderColor: "#DC2626",
      backgroundColor: "#FEF2F2",
    },
  },
}]);

export const statBoxCount = style({
  fontSize: vars.fontSize["2xl"],
  fontWeight: vars.fontWeight.bold,
  lineHeight: 1,
  marginBottom: "4px",
});

export const statBoxLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.medium,
});

export const pageWrapper = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
});

/* ─── Content Area ─── */

export const content = style({
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  paddingBottom: vars.spacing["8"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
});

/* ─── Toolbar ─── */

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.spacing["3"],
  flexWrap: "wrap",
  flexShrink: 0,
});

export const toolbarLeft = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  flexWrap: "wrap",
});

export const toolbarRight = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
});

export const searchWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const searchInput = style({
  width: "220px",
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  paddingLeft: "34px",
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

export const searchIcon = style({
  position: "absolute",
  left: "10px",
  pointerEvents: "none",
  color: vars.color.textSecondary,
});

export const filterSelect = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  outline: "none",
});

export const dropdownWrapper = style({ position: "relative", display: "inline-block", flexShrink: 0 });
export const dropdownTrigger = style({ display: "inline-flex", alignItems: "center", gap: vars.spacing["1"], padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: `border-color 150ms ease, background-color 150ms ease`, selectors: { "&:hover": { borderColor: vars.color.textSecondary } } });
export const dropdownTriggerActive = style({ borderColor: vars.color.primary, color: vars.color.primary, backgroundColor: "#EFF6FF", selectors: { "&:hover": { borderColor: vars.color.primary } } });
export const dropdownChevron = style({ fontSize: "9px", color: "inherit", transition: `transform 150ms ease` });
export const dropdownChevronOpen = style({ transform: "rotate(180deg)" });
export const dropdownMenu = style({ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: "100%", backgroundColor: vars.color.surface, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, boxShadow: vars.shadow.md, zIndex: 50, overflow: "hidden", padding: `${vars.spacing["1"]} 0` });
export const dropdownItem = style({ display: "block", width: "100%", padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", whiteSpace: "nowrap", selectors: { "&:hover": { backgroundColor: "#F3F4F6" } } });
export const dropdownItemActive = style({ color: vars.color.primary, fontWeight: vars.fontWeight.medium, backgroundColor: "#EFF6FF", selectors: { "&:hover": { backgroundColor: "#DBEAFE" } } });

/* ─── Sort Row ─── */

export const sortRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const sectionTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  margin: 0,
});

/* ─── Table Wrapper ─── */

export const tableWrap = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  overflow: "hidden",
  flexShrink: 0,
});

export const tableScroll = style({
  overflowX: "auto",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const thead = style({
  backgroundColor: "#F8FAFC",
});

export const th = style({
  padding: "10px 14px",
  textAlign: "left",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  borderBottom: `1px solid ${vars.color.border}`,
  whiteSpace: "nowrap",
});

export const thCenter = style([th, { textAlign: "center" }]);

export const tr = style({
  cursor: "pointer",
});

export const td = style({
  padding: "12px 14px",
  fontSize: vars.fontSize.sm,
  borderBottom: `1px solid #F1F5F9`,
  verticalAlign: "middle",
  selectors: {
    "tr:last-child &": { borderBottom: "none" },
    "tr:hover &": { backgroundColor: "#F8FAFC" },
  },
});

export const tdCenter = style([td, { textAlign: "center" }]);

export const tableFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
  borderTop: `1px solid ${vars.color.border}`,
  flexShrink: 0,
});

export const pagination = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const pageBtn = style({
  minWidth: "30px",
  height: "30px",
  padding: `0 ${vars.spacing["2"]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": {
    borderColor: "#94A3B8",
    color: vars.color.textPrimary,
  },
  ":disabled": {
    opacity: 0.4,
    cursor: "default",
    pointerEvents: "none",
  },
});

export const pageBtnActive = style([pageBtn, {
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
  color: "#FFFFFF",
  ":hover": {
    backgroundColor: vars.color.primaryHover,
    borderColor: vars.color.primaryHover,
  },
}]);

export const tableFooterText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
});

/* ─── Cell Elements ─── */

export const categoryPill = style({
  display: "inline-flex",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#EFF6FF",
  color: "#1E40AF",
  whiteSpace: "nowrap",
});

export const titleCell = style({
  minWidth: "320px",
});

export const titleText = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  wordBreak: "keep-all",
  whiteSpace: "normal",
});

export const titleTag = style({
  display: "inline-block",
  marginRight: "4px",
  padding: "1px 5px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: vars.fontWeight.bold,
  backgroundColor: "#EDE9FE",
  color: "#6D28D9",
  verticalAlign: "middle",
  flexShrink: 0,
});

export const scoreBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
});

export const counselorChip = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
});

export const counselorAvatar = style({
  width: "24px",
  height: "24px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.primary,
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
});

export const dateText = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  whiteSpace: "nowrap",
});

/* ─── Action Buttons ─── */

export const actionCell = style({
  display: "flex",
  gap: "6px",
  justifyContent: "center",
});

export const btnSelect = style({
  padding: `4px 10px`,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#EFF6FF",
  color: "#1D4ED8",
  border: `1px solid #BFDBFE`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  whiteSpace: "nowrap",
  ":hover": { backgroundColor: "#DBEAFE" },
});

export const btnReject = style({
  padding: `4px 10px`,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#FEF2F2",
  color: "#DC2626",
  border: `1px solid #FECACA`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  whiteSpace: "nowrap",
  ":hover": { backgroundColor: "#FEE2E2" },
});

/* ─── Status Badge ─── */

export const statusBadgePending = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#FEF3C7",
  color: "#92400E",
});

export const statusBadgeSelected = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#DCFCE7",
  color: "#166534",
});

export const statusBadgeRejected = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  backgroundColor: "#FEF2F2",
  color: "#991B1B",
});

/* ─── Empty / State ─── */

export const stateText = style({
  textAlign: "center",
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});
