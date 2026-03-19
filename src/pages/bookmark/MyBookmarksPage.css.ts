import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const pageWrapper = style({ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" });

export const header = style({ padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`, display: "flex", alignItems: "flex-end", justifyContent: "space-between" });

export const headerLeft = style({ display: "flex", flexDirection: "column", gap: "5px" });

export const title = style({ fontSize: vars.fontSize["2xl"], fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, letterSpacing: "-0.4px", margin: 0 });

export const subtitle = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, marginTop: "5px" });

/* ─── Tabs ─── */

export const tabBar = style({ display: "flex", gap: vars.spacing["1"], padding: `${vars.spacing["4"]} ${vars.spacing["8"]} 0` });

const tabBase = style({ padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`, borderRadius: `${vars.radius.md} ${vars.radius.md} 0 0`, fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.medium, cursor: "pointer", border: `1px solid ${vars.color.border}`, borderBottom: "none", transition: `all ${vars.transition.fast}` });

export const tab = styleVariants({
  active:   [tabBase, { backgroundColor: vars.color.surface, color: vars.color.primary, borderColor: vars.color.border }],
  inactive: [tabBase, { backgroundColor: "#F9FAFB", color: vars.color.textSecondary, ":hover": { color: vars.color.textPrimary } }],
});

/* ─── Content ─── */

export const content = style({ paddingTop: vars.spacing["4"], paddingLeft: vars.spacing["8"], paddingRight: vars.spacing["8"], paddingBottom: 0, display: "flex", flexDirection: "column", backgroundColor: vars.color.surface, margin: `0 ${vars.spacing["8"]} ${vars.spacing["6"]}`, borderRadius: `0 ${vars.radius.lg} ${vars.radius.lg} ${vars.radius.lg}`, border: `1px solid ${vars.color.border}`, animation: `${fadeIn} 0.35s ease` });

/* ─── Table ─── */

export const tableWrapper = style({ overflow: "auto" });

export const table = style({ width: "100%", borderCollapse: "collapse", fontSize: vars.fontSize.sm });

export const thead = style({ backgroundColor: "#F9FAFB", borderBottom: `1px solid ${vars.color.border}`, position: "sticky", top: 0, zIndex: 1 });

export const th = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, textAlign: "left", fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: vars.color.textSecondary, whiteSpace: "nowrap" });

export const tr = style({ borderBottom: "1px solid #F3F4F6", ":hover": { backgroundColor: "#FAFAFA" } });

export const td = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, color: vars.color.textPrimary, whiteSpace: "nowrap" });

export const tdEllipsis = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, color: vars.color.textPrimary, maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });

export const stateText = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });

/* ─── Buttons ─── */

export const actionBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", transition: `all ${vars.transition.fast}`, ":hover": { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF" } });

export const deleteBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid #FCA5A5`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: "#DC2626", backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", ":hover": { backgroundColor: "#FEF2F2" }, ":disabled": { opacity: 0.4, cursor: "not-allowed" } });

export const btnGroup = style({ display: "flex", gap: vars.spacing["1"] });

export const bookmarkBtn = style({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", border: "none", background: "none", cursor: "pointer", color: vars.color.textSecondary, borderRadius: vars.radius.sm, transition: `color ${vars.transition.fast}`, ":hover": { color: "#F59E0B" }, ":disabled": { opacity: 0.4, cursor: "not-allowed" } });

/* ─── Badges ─── */

const badgeBase = style({ display: "inline-flex", alignItems: "center", padding: `2px 8px`, borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

export const badgeVariant = styleVariants({
  green:  [badgeBase, { backgroundColor: "#ECFDF5", color: "#059669" }],
  red:    [badgeBase, { backgroundColor: "#FEF2F2", color: "#DC2626" }],
  gray:   [badgeBase, { backgroundColor: "#F3F4F6", color: "#6B7280" }],
  blue:   [badgeBase, { backgroundColor: "#EFF6FF", color: "#2563EB" }],
});

/* ─── Modal detail ─── */

export const detailRow = style({ display: "flex", gap: vars.spacing["2"] });

export const detailLabel = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, width: "80px", flexShrink: 0, fontWeight: vars.fontWeight.medium, paddingTop: "2px" });

export const detailValue = style({ fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed, flex: 1 });

export const sectionTitle = style({ fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, margin: `0 0 ${vars.spacing["2"]} 0` });

export const summaryBox = style({ padding: vars.spacing["4"], backgroundColor: "#F0FDF4", borderLeft: `3px solid #059669`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const resultBox = style({ padding: vars.spacing["4"], backgroundColor: "#F0F9FF", borderLeft: `3px solid #0EA5E9`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const contentBox = style({ padding: vars.spacing["4"], backgroundColor: "#F9FAFB", borderLeft: `3px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed, whiteSpace: "pre-wrap" });

export const detailSections = style({ display: "flex", flexDirection: "column", gap: vars.spacing["4"] });

export const tagRow = style({ display: "flex", flexWrap: "wrap", gap: vars.spacing["1"] });

export const tagChip = style({ padding: `2px ${vars.spacing["2"]}`, backgroundColor: "#EFF6FF", color: "#2563EB", borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

/* ─── Pagination ─── */

export const pagination = style({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: vars.spacing["4"], borderTop: `1px solid ${vars.color.border}`, flexShrink: 0 });

export const pageInfo = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });

export const pageButtons = style({ display: "flex", gap: vars.spacing["1"] });

const pageBtnBase = style({ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, cursor: "pointer", transition: `all ${vars.transition.fast}` });

export const pageBtn = style([pageBtnBase, { color: vars.color.textSecondary, backgroundColor: vars.color.surface, ":hover": { backgroundColor: "#F9FAFB" } }]);

export const pageBtnActive = style([pageBtnBase, { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF", ":hover": { opacity: 0.9 } }]);

export const pageBtnDisabled = style([pageBtnBase, { color: vars.color.textDisabled, backgroundColor: vars.color.surface, opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }]);

export const tableAnimate = style({ animation: `${fadeIn} 180ms ease` });
