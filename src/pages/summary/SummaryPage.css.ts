import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

export const pageWrapper = style({ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" });

export const header = style({ padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-between" });

export const headerLeft = style({ display: "flex", flexDirection: "column", gap: "5px" });

export const savedFiltersBtn = style({ display: "inline-flex", alignItems: "center", gap: vars.spacing["2"], padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", transition: `all ${vars.transition.fast}`, ":hover": { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF" } });

export const title = style({ fontSize: vars.fontSize["2xl"], fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, letterSpacing: "-0.4px", margin: 0 });

export const subtitle = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, marginTop: "5px" });

export const content = style({ paddingTop: vars.spacing["4"], paddingLeft: vars.spacing["8"], paddingRight: vars.spacing["8"], paddingBottom: 0, display: "flex", flexDirection: "column", backgroundColor: vars.color.surface, margin: `${vars.spacing["4"]} ${vars.spacing["8"]} ${vars.spacing["6"]}`, borderRadius: vars.radius.lg });

/* ─── Table ─── */

export const tableWrapper = style({ overflow: "auto" });

export const table = style({ width: "100%", borderCollapse: "collapse", fontSize: vars.fontSize.sm });

export const thead = style({ backgroundColor: "#F9FAFB", borderBottom: `1px solid ${vars.color.border}`, position: "sticky", top: 0, zIndex: 1 });

export const th = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, textAlign: "left", fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: vars.color.textSecondary, whiteSpace: "nowrap" });

export const tr = style({ borderBottom: "1px solid #F3F4F6", ":hover": { backgroundColor: "#FAFAFA" } });

export const td = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, color: vars.color.textPrimary, whiteSpace: "nowrap" });

export const tdEllipsis = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, color: vars.color.textPrimary, maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });

/* ─── Badges ─── */

const badgeBase = style({ display: "inline-flex", alignItems: "center", padding: `2px 8px`, borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

export const badgeVariant = styleVariants({
  green:  [badgeBase, { backgroundColor: "#ECFDF5", color: "#059669" }],
  red:    [badgeBase, { backgroundColor: "#FEF2F2", color: "#DC2626" }],
  orange: [badgeBase, { backgroundColor: "#FFF7ED", color: "#EA580C" }],
  gray:   [badgeBase, { backgroundColor: "#F3F4F6", color: "#6B7280" }],
  blue:   [badgeBase, { backgroundColor: "#EFF6FF", color: "#2563EB" }],
  purple: [badgeBase, { backgroundColor: "#F5F3FF", color: "#7C3AED" }],
});

/* ─── Buttons ─── */

export const actionBtnDetail = style({ padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", transition: `all ${vars.transition.fast}`, ":hover": { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF" } });

export const bookmarkBtn = style({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", border: "none", background: "none", cursor: "pointer", color: vars.color.textSecondary, borderRadius: vars.radius.sm, transition: `color ${vars.transition.fast}`, ":hover": { color: "#F59E0B" }, ":disabled": { opacity: 0.4, cursor: "not-allowed" } });

/* ─── State ─── */

export const stateText = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });
export const closeBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, color: vars.color.textSecondary, backgroundColor: vars.color.surface, cursor: "pointer" });
export const viewConsultBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["4"]}`, border: "none", borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.semibold, color: "#fff", backgroundColor: vars.color.primary, cursor: "pointer" });

/* ─── Modal: Info Section ─── */

export const infoSection = style({ display: "flex", gap: vars.spacing["4"], marginBottom: vars.spacing["4"] });

export const infoBlock = style({ flex: 1, backgroundColor: "#F9FAFB", borderRadius: vars.radius.md, border: `1px solid ${vars.color.border}`, padding: vars.spacing["4"] });

export const infoBlockTitle = style({ fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, margin: `0 0 ${vars.spacing["3"]} 0`, paddingBottom: vars.spacing["2"], borderBottom: `1px solid ${vars.color.border}` });

export const infoGrid = style({ display: "flex", flexDirection: "column", gap: "6px" });

export const infoRow = style({ display: "flex", alignItems: "baseline", gap: vars.spacing["2"] });

export const infoRowLabel = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, width: "64px", flexShrink: 0 });

export const infoRowValue = style({ fontSize: vars.fontSize.xs, color: vars.color.textPrimary, fontWeight: vars.fontWeight.medium, flex: 1, lineHeight: "1.4" });

/* ─── Modal: Content Sections ─── */

export const detailContent = style({ display: "flex", flexDirection: "column", gap: vars.spacing["4"] });

export const contentSection = style({ paddingTop: vars.spacing["4"], borderTop: `1px solid #F3F4F6` });

export const contentSectionTitle = style({ fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, margin: `0 0 ${vars.spacing["3"]} 0` });

export const summaryBox = style({ padding: vars.spacing["4"], backgroundColor: "#F0FDF4", borderLeft: `3px solid #059669`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const keywordsRow = style({ display: "flex", flexWrap: "wrap", gap: vars.spacing["2"], marginTop: vars.spacing["2"] });

export const keyword = style({ padding: `2px ${vars.spacing["3"]}`, backgroundColor: "#EFF6FF", color: "#2563EB", borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

/* ─── Modal: Cancellation ─── */

export const boolBadgeRow = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"], flexWrap: "wrap", marginBottom: vars.spacing["3"] });

export const boolBadgeLabel = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });

export const boolBadgeSep = style({ width: "1px", height: "12px", backgroundColor: vars.color.border, flexShrink: 0 });

const boolBase = style({ display: "inline-flex", alignItems: "center", padding: `1px 8px`, borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

export const boolBadgeYes  = style([boolBase, { backgroundColor: "#ECFDF5", color: "#059669" }]);
export const boolBadgeWarn = style([boolBase, { backgroundColor: "#FEF3C7", color: "#D97706" }]);
export const boolBadgeNo   = style([boolBase, { backgroundColor: "#F3F4F6", color: "#6B7280" }]);

export const defenseTag = style({ display: "inline-flex", padding: `2px ${vars.spacing["3"]}`, backgroundColor: "#EFF6FF", color: "#2563EB", borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium });

/* ─── Modal: Risk Flags ─── */

export const riskList = style({ display: "flex", flexDirection: "column", gap: vars.spacing["2"] });

export const riskRow = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"] });

const riskBase = style({ display: "inline-flex", justifyContent: "center", padding: `1px 8px`, borderRadius: vars.radius.full, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, flexShrink: 0, minWidth: "38px" });

export const riskLevelBadge = styleVariants({
  LOW:      [riskBase, { backgroundColor: "#F3F4F6", color: "#6B7280" }],
  MEDIUM:   [riskBase, { backgroundColor: "#FFF7ED", color: "#EA580C" }],
  HIGH:     [riskBase, { backgroundColor: "#FEF2F2", color: "#DC2626" }],
  CRITICAL: [riskBase, { backgroundColor: "#450A0A", color: "#FCA5A5" }],
});

export const riskType = style({ fontSize: vars.fontSize.xs, color: vars.color.textPrimary });

/* ─── Modal: IAM ─── */

export const iamGrid = style({ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: `0 ${vars.spacing["4"]}`, marginBottom: vars.spacing["3"] });

export const iamDivider = style({ width: "1px", backgroundColor: vars.color.border });

export const iamFieldLabel = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, margin: `0 0 4px` });

export const iamFieldValue = style({ fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed, margin: 0 });

export const matchRateWrap = style({ marginBottom: vars.spacing["3"] });

export const matchRateRow = style({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });

export const matchRateValue = style({ fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: vars.color.primary });

export const matchRateBar = style({ height: "5px", backgroundColor: "#E5E7EB", borderRadius: vars.radius.full, overflow: "hidden" });

export const matchRateFill = style({ height: "100%", backgroundColor: vars.color.primary, borderRadius: vars.radius.full });

export const summaryBoxBlue = style({ padding: vars.spacing["4"], backgroundColor: "#F0F9FF", borderLeft: `3px solid #0EA5E9`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const summaryBoxGray = style({ padding: vars.spacing["4"], backgroundColor: "#FAFAFA", borderLeft: `3px solid #D1D5DB`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

/* ─── Pagination ─── */

export const pagination = style({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: vars.spacing["4"], borderTop: `1px solid ${vars.color.border}`, flexShrink: 0 });

const fadeIn = keyframes({ from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "translateY(0)" } });

export const tableAnimate = style({ animation: `${fadeIn} 180ms ease` });

export const pageInfo = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });

export const pageButtons = style({ display: "flex", gap: vars.spacing["1"] });

const pageBtnBase = style({ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, cursor: "pointer", transition: `all ${vars.transition.fast}` });

export const pageBtn = style([pageBtnBase, { color: vars.color.textSecondary, backgroundColor: vars.color.surface, ":hover": { backgroundColor: "#F9FAFB" } }]);

export const pageBtnActive = style([pageBtnBase, { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF", ":hover": { opacity: 0.9 } }]);

export const pageBtnDisabled = style([pageBtnBase, { color: vars.color.textDisabled, backgroundColor: vars.color.surface, opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }]);

/* ─── SavedFiltersModal ─── */

export const savedFiltersList = style({ display: "flex", flexDirection: "column", gap: vars.spacing["1"] });

export const savedFiltersItem = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"], padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, backgroundColor: "#F9FAFB", borderRadius: vars.radius.md, border: `1px solid ${vars.color.border}` });

export const savedFiltersItemInfo = style({ display: "flex", flexDirection: "column", gap: "2px", flex: 1 });

export const savedFiltersItemName = style({ fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary });

export const savedFiltersItemMeta = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });

export const savedFiltersDetailBtn = style({ padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", ":hover": { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF" } });

export const savedFiltersBackBtn = style({ display: "inline-flex", alignItems: "center", gap: vars.spacing["1"], marginBottom: vars.spacing["3"], padding: `${vars.spacing["1"]} ${vars.spacing["2"]}`, border: "none", background: "none", fontSize: vars.fontSize.xs, color: vars.color.textSecondary, cursor: "pointer", ":hover": { color: vars.color.primary } });

export const savedFiltersDetailWrap = style({ display: "flex", flexDirection: "column", gap: vars.spacing["3"] });

export const savedFiltersDetailHeader = style({ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: vars.spacing["3"], borderBottom: `1px solid ${vars.color.border}` });

export const savedFiltersDetailName = style({ fontSize: vars.fontSize.md, fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary });

export const savedFiltersDetailDate = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });

export const savedFiltersTagGrid = style({ display: "flex", flexWrap: "wrap", gap: vars.spacing["2"] });

export const savedFiltersTag = style({ display: "inline-flex", alignItems: "center", gap: "4px", padding: `4px 10px`, backgroundColor: "#F0F9FF", border: `1px solid #BAE6FD`, borderRadius: vars.radius.full, fontSize: vars.fontSize.xs });

export const savedFiltersTagLabel = style({ color: "#0369A1", fontWeight: vars.fontWeight.semibold });

export const savedFiltersTagValue = style({ color: "#0C4A6E" });

export const savedFiltersActions = style({ display: "flex", gap: vars.spacing["1"], flexShrink: 0 });

export const savedFiltersDeleteBtn = style({ padding: `${vars.spacing["1"]} ${vars.spacing["3"]}`, border: `1px solid #FCA5A5`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: "#DC2626", backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", ":hover": { backgroundColor: "#FEF2F2" }, ":disabled": { opacity: 0.4, cursor: "not-allowed" } });

export const savedFiltersOrderBtns = style({ display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 });

export const savedFiltersOrderBtn = style({ padding: `2px ${vars.spacing["2"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, color: vars.color.textSecondary, backgroundColor: vars.color.surface, cursor: "pointer", lineHeight: 1, ":hover": { borderColor: vars.color.primary, color: vars.color.primary }, ":disabled": { opacity: 0.3, cursor: "not-allowed" } });

export const savedFiltersEditRow = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"], flex: 1 });

export const savedFiltersEditInput = style({ flex: 1, padding: `${vars.spacing["1"]} ${vars.spacing["2"]}`, border: `1px solid ${vars.color.borderFocus}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, outline: "none" });
