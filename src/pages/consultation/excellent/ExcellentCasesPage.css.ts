import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

/* ─── Page Layout ─── */

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
  marginBottom: vars.spacing["4"],
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

export const weekNav = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["3"],
  backgroundColor: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: vars.radius.lg,
  padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`,
  backdropFilter: "blur(4px)",
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

export const statsRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["4"],
  marginTop: vars.spacing["3"],
  flexWrap: "wrap",
});

export const statChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: `3px ${vars.spacing["3"]}`,
  backgroundColor: "rgba(255,255,255,0.12)",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  color: "rgba(255,255,255,0.9)",
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
  gap: vars.spacing["6"],
  animation: `${fadeIn} 0.35s ease`,
});

/* ─── Section ─── */

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.textPrimary,
  margin: `0 0 ${vars.spacing["3"]} 0`,
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
});

export const sectionSub = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  fontWeight: vars.fontWeight.regular,
  marginLeft: vars.spacing["1"],
});

/* ─── Category Filter ─── */

export const filterRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  flexWrap: "wrap",
});

export const filterPill = style({
  padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`,
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  transition: `all ${vars.transition.fast}`,
  ":hover": { borderColor: vars.color.textSecondary },
});

export const filterPillActive = style([filterPill, {
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
  color: "#FFFFFF",
  ":hover": { backgroundColor: vars.color.primaryHover, borderColor: vars.color.primaryHover },
}]);

/* ─── Hero Card ─── */

export const heroCard = style({
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: vars.shadow.md,
  transition: `transform ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: vars.shadow.lg,
  },
});

export const heroInner = style({
  padding: vars.spacing["8"],
  position: "relative",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

export const heroOverlay = style({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
});

export const heroContent = style({
  position: "relative",
  zIndex: 1,
});

export const heroLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: `3px ${vars.spacing["2"]}`,
  backgroundColor: "#F59E0B",
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
  marginBottom: vars.spacing["2"],
});

export const heroTitle = style({
  fontSize: vars.fontSize["2xl"],
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
  margin: `0 0 ${vars.spacing["2"]} 0`,
  lineHeight: vars.lineHeight.tight,
});

export const heroMeta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["4"],
  flexWrap: "wrap",
});

export const heroMetaItem = style({
  fontSize: vars.fontSize.xs,
  color: "rgba(255,255,255,0.85)",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const heroScoreBadge = style({
  padding: `3px ${vars.spacing["3"]}`,
  backgroundColor: "#F59E0B",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
});

/* ─── Cases Grid ─── */

export const casesGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.spacing["4"],
});

/* ─── Case Card ─── */

export const caseCard = style({
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  boxShadow: vars.shadow.sm,
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  transition: `transform ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  border: `1px solid ${vars.color.border}`,
  ":hover": {
    transform: "translateY(-3px)",
    boxShadow: vars.shadow.md,
  },
});

export const caseCardStrip = style({
  height: "4px",
  flexShrink: 0,
});

export const caseCardBody = style({
  padding: vars.spacing["4"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
  flex: 1,
});

export const caseCardHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.spacing["2"],
});

export const categoryPill = style({
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  flexShrink: 0,
});

export const scoreBadge = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.bold,
  color: "#FFFFFF",
  flexShrink: 0,
});

export const caseTitle = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textPrimary,
  lineHeight: vars.lineHeight.normal,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  margin: 0,
});

export const caseSummary = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.normal,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const adminReason = style({
  fontSize: vars.fontSize.xs,
  color: "#475569",
  fontStyle: "italic",
  borderLeft: `3px solid #E2E8F0`,
  paddingLeft: vars.spacing["2"],
  lineHeight: vars.lineHeight.normal,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const caseCardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  paddingTop: vars.spacing["2"],
  borderTop: `1px solid ${vars.color.border}`,
});

export const counselorChip = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
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
});

/* ─── Empty / State ─── */

export const stateText = style({
  textAlign: "center",
  padding: `${vars.spacing["16"]} 0`,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.sm,
});
