import { style } from "@vanilla-extract/css";
import { vars } from "../../shared/design";

/* ─── 카드 컨테이너 ─── */

export const filterCard = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
  padding: vars.spacing["4"],
  backgroundColor: vars.color.surface,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  margin: `${vars.spacing["4"]} auto 0`,
  flexShrink: 0,
  width: "50%",
  minWidth: "480px",
});

/* ─── 행 레이아웃 ─── */

export const filterRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["3"],
  flexWrap: "wrap",
});

/* ─── 검색창 (상담내역과 동일) ─── */

export const searchGroup = style({
  display: "flex",
  flex: 1,
  minWidth: "240px",
});

export const searchInput = style({
  flex: 1,
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRight: "none",
  borderRadius: `${vars.radius.md} 0 0 ${vars.radius.md}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: "#F9FAFB",
  outline: "none",
  ":focus": { borderColor: vars.color.borderFocus, backgroundColor: vars.color.surface },
  "::placeholder": { color: vars.color.textDisabled },
});

export const searchBtn = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: `0 ${vars.radius.md} ${vars.radius.md} 0`,
  backgroundColor: vars.color.primary,
  color: "#FFFFFF",
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "all 150ms ease",
  ":hover": { opacity: 0.9 },
});

/* ─── 날짜 범위 ─── */

export const dateRangeGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["1"],
  flexShrink: 0,
});

export const dateLabel = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
  whiteSpace: "nowrap",
  flexShrink: 0,
});

export const dateInput = style({
  padding: `${vars.spacing["2"]} ${vars.spacing["2"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.xs,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  outline: "none",
  cursor: "pointer",
  ":focus": { borderColor: vars.color.borderFocus },
});

export const dateSep = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.textSecondary,
});

/* ─── 드롭다운 (상담내역과 동일) ─── */

export const dropdownWrapper = style({
  position: "relative",
  display: "inline-block",
  flexShrink: 0,
});

export const dropdownTrigger = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing["2"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  transition: "border-color 150ms ease, background-color 150ms ease",
  selectors: { "&:hover": { borderColor: vars.color.textSecondary } },
});

export const dropdownTriggerActive = style({
  borderColor: vars.color.primary,
  color: vars.color.primary,
  backgroundColor: "#EFF6FF",
  selectors: { "&:hover": { borderColor: vars.color.primary } },
});

export const dropdownChevron = style({
  fontSize: "9px",
  color: "inherit",
  transition: "transform 150ms ease",
});

export const dropdownChevronOpen = style({ transform: "rotate(180deg)" });

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
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["2"],
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
  selectors: { "&:hover": { backgroundColor: "#F3F4F6" } },
});

export const dropdownItemActive = style({
  color: vars.color.primary,
  fontWeight: vars.fontWeight.medium,
  backgroundColor: "#EFF6FF",
  selectors: { "&:hover": { backgroundColor: "#DBEAFE" } },
});

export const checkboxIcon = style({
  width: "14px",
  height: "14px",
  border: `1.5px solid ${vars.color.border}`,
  borderRadius: "3px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
});

export const checkboxIconChecked = style({
  width: "14px",
  height: "14px",
  borderRadius: "3px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  backgroundColor: vars.color.primary,
  border: `1.5px solid ${vars.color.primary}`,
  color: "#FFFFFF",
});

/* ─── 아코디언 토글 버튼 ─── */

export const accordionToggle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing["1"],
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px dashed ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  backgroundColor: "#F9FAFB",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  transition: "all 150ms ease",
  marginLeft: "auto",
  selectors: {
    "&:hover": { borderColor: vars.color.primary, color: vars.color.primary, backgroundColor: "#EFF6FF" },
  },
});

export const accordionToggleActive = style({
  borderColor: vars.color.primary,
  borderStyle: "solid",
  color: vars.color.primary,
  backgroundColor: "#EFF6FF",
  selectors: { "&:hover": { borderColor: vars.color.primary, backgroundColor: "#DBEAFE" } },
});

/* ─── 아코디언 섹션 ─── */

export const accordionSection = style({
  borderTop: `1px solid #F3F4F6`,
  paddingTop: vars.spacing["3"],
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing["3"],
});

export const accordionSectionLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: vars.spacing["1"],
});

/* ─── 인풋 (아코디언 내 텍스트 필드) ─── */

export const textInput = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.textPrimary,
  backgroundColor: vars.color.surface,
  outline: "none",
  fontFamily: "inherit",
  ":focus": { borderColor: vars.color.borderFocus },
  "::placeholder": { color: vars.color.textDisabled },
});

/* ─── 하단 푸터 ─── */

export const filterFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid #F3F4F6`,
  paddingTop: vars.spacing["3"],
});

export const footerRight = style({ display: "flex", alignItems: "center", gap: vars.spacing["2"] });

const btnBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  cursor: "pointer",
  transition: "all 150ms ease",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
});

export const btnReset = style([btnBase, {
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.textSecondary,
  selectors: { "&:hover": { backgroundColor: "#F9FAFB" } },
}]);

export const btnSave = style([btnBase, {
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.textPrimary,
  selectors: { "&:hover": { backgroundColor: "#F9FAFB" } },
}]);

export const btnSearch = style([btnBase, {
  border: `1px solid ${vars.color.primary}`,
  backgroundColor: vars.color.primary,
  color: "#FFFFFF",
  selectors: { "&:hover": { opacity: 0.9 } },
}]);

/* ─── 조건 저장 모달 내부 ─── */

export const saveModalNameLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  marginBottom: vars.spacing["2"],
});

export const saveModalNameInput = style([textInput, {
  width: "100%",
  boxSizing: "border-box",
  fontSize: vars.fontSize.sm,
}]);

export const saveModalSectionTitle = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textSecondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: `${vars.spacing["5"]} 0 ${vars.spacing["3"]}`,
});

export const saveModalTagGrid = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing["2"],
});

export const saveModalTag = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: `4px 10px`,
  backgroundColor: "#F0F9FF",
  border: `1px solid #BAE6FD`,
  borderRadius: vars.radius.full,
  fontSize: vars.fontSize.xs,
});

export const saveModalTagLabel = style({
  color: "#0369A1",
  fontWeight: vars.fontWeight.semibold,
});

export const saveModalTagValue = style({
  color: "#0C4A6E",
});

export const saveModalEmpty = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textDisabled,
  padding: `${vars.spacing["4"]} 0`,
  textAlign: "center",
});

export const saveModalFooterRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.spacing["2"],
  width: "100%",
});

/* ─── 숫자 범위 ─── */

export const numberRangeGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing["1"],
});

export const numberInput = style([textInput, { width: "72px", fontSize: vars.fontSize.xs }]);
