import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

export const pageHeader    = style({ padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`, flexShrink: 0 });
export const pageHeaderRow = style({ display: "flex", alignItems: "center", justifyContent: "space-between" });
export const headerTitle   = style({ fontSize: vars.fontSize["2xl"], fontWeight: vars.fontWeight.bold, color: vars.color.textPrimary, letterSpacing: "-0.4px", margin: 0 });
export const headerSubtitle = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary, marginTop: "5px" });

export const filterCard  = style({ backgroundColor: vars.color.surface, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.lg, padding: vars.spacing["3"], boxShadow: vars.shadow.sm, marginTop: vars.spacing["3"], marginLeft: vars.spacing["8"], marginRight: vars.spacing["3"], width: "fit-content" });

globalStyle(`${filterCard} button[type="button"]`, {
	height: "auto",
	padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
	fontSize: vars.fontSize.sm,
});
export const filterRow   = style({ display: "flex", gap: vars.spacing["3"], alignItems: "center" });
export const searchInput = style({ flex: 1, maxWidth: "300px", padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, outline: "none", ":focus": { borderColor: vars.color.primary } });

export const dropdownWrapper = style({ position: "relative", display: "inline-block", flexShrink: 0 });
export const dropdownTrigger = style({ display: "inline-flex", alignItems: "center", gap: vars.spacing["1"], padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: `border-color 150ms ease, background-color 150ms ease`, selectors: { "&:hover": { borderColor: vars.color.textSecondary } } });
export const dropdownTriggerActive = style({ borderColor: vars.color.primary, color: vars.color.primary, backgroundColor: "#EFF6FF", selectors: { "&:hover": { borderColor: vars.color.primary } } });
export const dropdownChevron = style({ fontSize: "9px", color: "inherit", transition: `transform 150ms ease` });
export const dropdownChevronOpen = style({ transform: "rotate(180deg)" });
export const dropdownMenu = style({ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: "100%", backgroundColor: vars.color.surface, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, boxShadow: vars.shadow.md, zIndex: 50, overflow: "hidden", padding: `${vars.spacing["1"]} 0` });
export const dropdownItem = style({ display: "block", width: "100%", padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", whiteSpace: "nowrap", selectors: { "&:hover": { backgroundColor: "#F3F4F6" } } });
export const dropdownItemActive = style({ color: vars.color.primary, fontWeight: vars.fontWeight.medium, backgroundColor: "#EFF6FF", selectors: { "&:hover": { backgroundColor: "#DBEAFE" } } });

export const content = style({ flex: 1, padding: vars.spacing["6"], paddingLeft: vars.spacing["8"], paddingRight: vars.spacing["8"], overflowY: "auto", display: "flex", flexDirection: "column", gap: vars.spacing["4"] });

export const tableCard    = style({ backgroundColor: vars.color.surface, borderRadius: vars.radius.lg, boxShadow: vars.shadow.sm, overflow: "hidden" });
export const table        = style({ width: "100%", borderCollapse: "collapse" });
export const thead        = style({ borderBottom: `2px solid ${vars.color.border}` });
export const th           = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, textAlign: "left", fontSize: vars.fontSize.xs, fontWeight: vars.fontWeight.semibold, color: vars.color.textSecondary, backgroundColor: "#F9FAFB", whiteSpace: "nowrap" });
export const tr           = style({ borderBottom: `1px solid ${vars.color.border}`, cursor: "pointer", transition: `background-color ${vars.transition.fast}`, ":hover": { backgroundColor: "#F9FAFB" } });
export const td           = style({ padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, verticalAlign: "middle" });
export const tdSecondary  = style([td, { color: vars.color.textSecondary }]);

export const statusBadge = style({ display: "inline-flex", alignItems: "center", padding: `2px ${vars.spacing["2"]}`, borderRadius: vars.radius.full, fontSize: "11px", fontWeight: vars.fontWeight.semibold });
export const actionBtn   = style({ width: "28px", height: "28px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "none", borderRadius: vars.radius.sm, backgroundColor: "transparent", color: vars.color.textSecondary, cursor: "pointer", transition: `all ${vars.transition.fast}`, ":hover": { backgroundColor: "#F3F4F6", color: vars.color.textPrimary } });

export const pagination     = style({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${vars.spacing["3"]} ${vars.spacing["4"]}` });
export const pageInfo       = style({ fontSize: vars.fontSize.xs, color: vars.color.textSecondary });
export const pageButtons    = style({ display: "flex", alignItems: "center", gap: vars.spacing["1"] });
export const pageBtn        = style({ minWidth: "32px", height: "32px", padding: `0 ${vars.spacing["2"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.sm, backgroundColor: vars.color.surface, color: vars.color.textSecondary, fontSize: vars.fontSize.xs, cursor: "pointer", transition: `all ${vars.transition.fast}`, ":hover": { borderColor: vars.color.primary, color: vars.color.primary } });
export const pageBtnActive  = style([pageBtn, { backgroundColor: vars.color.primary, borderColor: vars.color.primary, color: "#FFFFFF", fontWeight: vars.fontWeight.semibold, ":hover": { backgroundColor: vars.color.primaryHover, borderColor: vars.color.primaryHover } }]);
export const pageBtnDisabled = style([pageBtn, { opacity: 0.4, cursor: "not-allowed", ":hover": { borderColor: vars.color.border, color: vars.color.textSecondary } }]);

const fadeIn = keyframes({ from: { opacity: 0, transform: "translateY(4px)" }, to: { opacity: 1, transform: "translateY(0)" } });
export const tableAnimate = style({ animation: `${fadeIn} 180ms ease` });
export const stateText    = style({ textAlign: "center", padding: `${vars.spacing["16"]} 0`, color: vars.color.textSecondary, fontSize: vars.fontSize.sm });
