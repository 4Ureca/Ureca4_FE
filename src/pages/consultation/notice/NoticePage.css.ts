import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

/* ─── Page Header ─── */

export const pageHeader    = style({ padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`, flexShrink: 0 });
export const pageHeaderRow = style({ display: "flex", alignItems: "center", justifyContent: "space-between" });
export const headerTitle  = style({ fontSize: vars.fontSize["2xl"], fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, letterSpacing: "-0.4px", margin: 0 });
export const headerSubtitle = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, marginTop: "5px" });

/* ─── Content Area ─── */

export const content = style({
  flex: 1,
  padding: vars.spacing["6"],
  paddingLeft: vars.spacing["8"],
  paddingRight: vars.spacing["8"],
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["4"],
  justifyContent: "center",
});

/* ─── Table ─── */

export const tableCard = style({ backgroundColor: vars.color.surface, borderRadius: vars.radius.lg, boxShadow: vars.shadow.sm, overflow: "hidden", width: "80%", marginLeft: "auto", marginRight: "auto" });
export const table     = style({ width: "100%", borderCollapse: "collapse" });
export const thead     = style({ borderBottom: `2px solid ${vars.color.border}` });

export const th = style({
  padding: `${vars.spacing["4"]} ${vars.spacing["4"]}`,
  textAlign: "left",
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  backgroundColor: "#F9FAFB",
  whiteSpace: "nowrap",
});

export const tr = style({
  borderBottom: `1px solid ${vars.color.border}`,
  cursor: "pointer",
  transition: `background-color ${vars.transition.fast}`,
  ":hover": { backgroundColor: "#F9FAFB" },
});

export const td          = style({ padding: `${vars.spacing["4"]} ${vars.spacing["4"]}`, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, verticalAlign: "middle" });
export const tdSecondary = style([td, { color: vars.color.textSecondary }]);
export const tdDate      = style([td, { color: vars.color.textSecondary, whiteSpace: "nowrap", width: "1%", minWidth: "90px" }]);

export const titleCell = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"], maxWidth: "420px" });
export const titleText = style({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: vars.fontSize.sm, color: vars.color.textPrimary, fontWeight: vars.fontWeight.medium });
export const pinIcon   = style({ color: vars.color.primary, fontSize: "12px", flexShrink: 0 });
export const newBadge  = style({ padding: `1px 6px`, borderRadius: vars.radius.full, fontSize: "10px", fontWeight: vars.fontWeight.bold, backgroundColor: vars.color.primary, color: "#FFFFFF", flexShrink: 0 });

export const typeBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  whiteSpace: "nowrap",
});

/* ─── Pagination ─── */

export const pagination  = style({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${vars.spacing["3"]} ${vars.spacing["4"]}` });
export const pageInfo    = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });
export const pageButtons = style({ display: "flex", alignItems: "center", gap: vars.spacing["1"] });

export const pageBtn = style({
  minWidth: "32px", height: "32px",
  padding: `0 ${vars.spacing["2"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  fontSize: vars.fontSize.xs,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": { borderColor: vars.color.primary, color: vars.color.primary },
});

export const pageBtnActive = style([pageBtn, {
  backgroundColor: vars.color.primary, borderColor: vars.color.primary,
  color: "#FFFFFF", fontWeight: vars.fontWeight.semibold,
  ":hover": { backgroundColor: vars.color.primaryHover, borderColor: vars.color.primaryHover },
}]);

export const pageBtnDisabled = style([pageBtn, {
  opacity: 0.4, cursor: "not-allowed",
  ":hover": { borderColor: vars.color.border, color: vars.color.textSecondary },
}]);

/* ─── Table Animate ─── */

const fadeIn = keyframes({ from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "translateY(0)" } });

export const tableAnimate = style({ animation: `${fadeIn} 180ms ease` });

/* ─── Action Buttons ─── */

export const actionBtn = style({
  width: "28px", height: "28px",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  border: "none", borderRadius: vars.radius.sm,
  backgroundColor: "transparent", color: vars.color.textSecondary,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  ":hover": { backgroundColor: "#F3F4F6", color: vars.color.textPrimary },
});

export const actionBtnDanger = style([actionBtn, {
  ":hover": { backgroundColor: "#FEE2E2", color: "#DC2626" },
}]);

/* ─── New Notice Banner ─── */

export const newNoticeBanner = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["3"],
  padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderLeft: `4px solid ${vars.color.primary}`,
  borderRadius: vars.radius.lg,
  cursor: "pointer",
  transition: `background-color ${vars.transition.fast}`,
  ":hover": { backgroundColor: "#DBEAFE" },
});

export const newNoticeBannerTitle = style({ fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: "#1E40AF", marginBottom: "2px" });
export const newNoticeBannerSub   = style({ fontSize: vars.fontSize.sm, color: vars.color.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });
export const newNoticeDismiss     = style({ marginLeft: "auto", flexShrink: 0, background: "none", border: "none", color: "#93C5FD", fontSize: "18px", cursor: "pointer", lineHeight: 1, padding: "0 4px" });

/* ─── State ─── */

export const stateText = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });
