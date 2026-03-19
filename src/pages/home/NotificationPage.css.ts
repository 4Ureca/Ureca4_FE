import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to:   { opacity: 1, transform: "translateY(0)" },
});

/* ─── Page Wrapper ─── */

export const pageWrapper = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
});

/* ─── Page Header ─── */

export const pageHeader = style({
  backgroundImage: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  padding: `${vars.spacing["8"]} ${vars.spacing["8"]} ${vars.spacing["6"]}`,
});

export const pageHeaderRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
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

export const headerTitle    = style({ fontSize: vars.fontSize["3xl"], fontWeight: vars.fontWeight.bold, color: "#FFFFFF", margin: `0 0 4px 0`, letterSpacing: "-0.6px" });
export const headerSubtitle = style({ fontSize: vars.fontSize.sm, color: "rgba(255,255,255,0.65)", margin: 0 });

export const unreadChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  padding: `3px ${vars.spacing["3"]}`,
  backgroundColor: "rgba(225,0,106,0.25)",
  border: "1px solid rgba(225,0,106,0.5)",
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
  color: "#FFB3D1",
  marginTop: vars.spacing["4"],
});

/* ─── Content ─── */

export const content   = style({ padding: vars.spacing["6"], paddingLeft: vars.spacing["8"], paddingRight: vars.spacing["8"], paddingBottom: vars.spacing["8"], display: "flex", flexDirection: "column", gap: vars.spacing["4"], animation: `${fadeIn} 0.35s ease` });
export const stateText = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });

/* ─── List ─── */

export const list = style({ display: "flex", flexDirection: "column", gap: vars.spacing["2"] });

/* ─── Item ─── */

const itemBase = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["3"],
  padding: `${vars.spacing["4"]} ${vars.spacing["4"]}`,
  borderRadius: vars.radius.lg,
  cursor: "pointer",
  transition: `all ${vars.transition.fast}`,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.sm,
  ":hover": { transform: "translateY(-1px)", boxShadow: vars.shadow.md },
});

export const itemUnread = style([itemBase, {
  borderLeft: `3px solid #E1006A`,
  backgroundColor: "#FFF8FB",
}]);
export const itemRead = style([itemBase, { borderLeft: `3px solid transparent` }]);

export const typeIcon = style({
  width: "36px",
  height: "36px",
  borderRadius: vars.radius.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  flexShrink: 0,
});

export const itemBody    = style({ flex: 1, minWidth: 0 });
export const itemRow     = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"] });
export const itemMessage = style({ fontSize: vars.fontSize.sm, color: vars.color.textPrimary, margin: 0, lineHeight: "1.5", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });
export const itemMessageUnread = style([{ fontWeight: 600 }]);
export const itemMeta    = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"], marginTop: "6px" });
export const itemTime    = style({ fontSize: "11px", color: vars.color.textSecondary, marginLeft: "auto" });

export const typeBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `2px ${vars.spacing["2"]}`,
  borderRadius: vars.radius.full,
  fontSize: "11px",
  fontWeight: vars.fontWeight.semibold,
  whiteSpace: "nowrap",
});

export const unreadDot = style({ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E1006A", flexShrink: 0 });

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
