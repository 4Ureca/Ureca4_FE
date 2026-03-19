import { style } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

export const pageWrapper = style({ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" });

export const header = style({ padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0` });

export const title = style({ fontSize: vars.fontSize["2xl"], fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, letterSpacing: "-0.4px", margin: 0 });

export const subtitle = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, marginTop: "5px" });

export const content = style({ paddingTop: vars.spacing["4"], paddingLeft: vars.spacing["8"], paddingRight: vars.spacing["8"], paddingBottom: 0, display: "flex", flexDirection: "column", backgroundColor: vars.color.surface, margin: `${vars.spacing["4"]} ${vars.spacing["8"]} ${vars.spacing["6"]}`, borderRadius: vars.radius.lg });

export const tableWrapper = style({ overflow: "auto" });

export const table = style({ width: "100%", borderCollapse: "collapse", fontSize: vars.fontSize.sm });

export const thead = style({ backgroundColor: "#F9FAFB", borderBottom: `1px solid ${vars.color.border}`, position: "sticky", top: 0, zIndex: 1 });

export const th = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, textAlign: "left", fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: vars.color.textSecondary, whiteSpace: "nowrap" });

export const tr = style({ borderBottom: "1px solid #F3F4F6", ":hover": { backgroundColor: "#FAFAFA" } });

export const td = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, color: vars.color.textPrimary, whiteSpace: "nowrap" });

export const stateText = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });

export const actionBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", transition: `all ${vars.transition.fast}`, ":hover": { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF" } });

export const deleteBtn = style({ padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid #FCA5A5`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.medium, color: "#DC2626", backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", ":hover": { backgroundColor: "#FEF2F2" }, ":disabled": { opacity: 0.4, cursor: "not-allowed" } });

export const btnGroup = style({ display: "flex", gap: vars.spacing["1"] });

/* ─── Detail panel ─── */

export const detailPanel = style({ padding: vars.spacing["4"], display: "flex", flexDirection: "column", gap: vars.spacing["3"] });

export const detailRow = style({ display: "flex", gap: vars.spacing["2"] });

export const detailLabel = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, width: "80px", flexShrink: 0, fontWeight: vars.fontWeight.medium, paddingTop: "2px" });

export const detailValue = style({ fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed, flex: 1 });

export const summaryBox = style({ padding: vars.spacing["4"], backgroundColor: "#F0FDF4", borderLeft: `3px solid #059669`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const resultBox = style({ padding: vars.spacing["4"], backgroundColor: "#F0F9FF", borderLeft: `3px solid #0EA5E9`, borderRadius: vars.radius.sm, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, lineHeight: vars.lineHeight.relaxed });

export const sectionTitle = style({ fontSize: vars.fontSize.sm, fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, margin: `0 0 ${vars.spacing["2"]} 0` });

export const backBtn = style({ display: "inline-flex", alignItems: "center", gap: vars.spacing["1"], padding: `${vars.spacing["1"]} ${vars.spacing["2"]}`, border: "none", background: "none", fontSize: vars.fontSize.xs, color: vars.color.textSecondary, cursor: "pointer", marginBottom: vars.spacing["3"], ":hover": { color: vars.color.primary } });
