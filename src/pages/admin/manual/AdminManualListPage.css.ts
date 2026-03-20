import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../../shared/design";

export const pageWrapper = style({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	minHeight: 0,
	overflow: "auto",
});

export const pageHeader = style({
	padding: `${vars.spacing["8"]} ${vars.spacing["8"]} 0`,
	flexShrink: 0,
});

export const headerRow = style({
	display: "flex",
	alignItems: "flex-start",
	justifyContent: "space-between",
	gap: vars.spacing["4"],
	"@media": {
		"screen and (max-width: 768px)": {
			flexDirection: "column",
			alignItems: "stretch",
		},
	},
});

export const headerTitle = style({
	fontSize: vars.fontSize["2xl"],
	fontWeight: vars.fontWeight.bold,
	color: vars.color.textPrimary,
	letterSpacing: "-0.4px",
	margin: 0,
});

export const headerSubtitle = style({
	fontSize: vars.fontSize.xs,
	color: vars.color.textSecondary,
	marginTop: "5px",
	marginBottom: 0,
});

export const content = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: vars.spacing["4"],
	padding: vars.spacing["6"],
	paddingLeft: vars.spacing["8"],
	paddingRight: vars.spacing["8"],
	paddingBottom: vars.spacing["8"],
});

export const searchCard = style({
	display: "flex",
	flexDirection: "column",
	alignSelf: "flex-start",
	width: "fit-content",
	gap: vars.spacing["1"],
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.lg,
	padding: vars.spacing["2"],
});

export const searchGrid = style({
	display: "grid",
	gridTemplateColumns: "240px 150px 300px",
	gap: vars.spacing["3"],
	alignItems: "end",
	"@media": {
		"screen and (max-width: 800px)": {
			gridTemplateColumns: "1fr",
		},
	},
});

export const searchField = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["2"],
	minWidth: 0,
});

export const searchLabel = style({
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.textPrimary,
});

const inputBase = style({
	width: "100%",
	padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.md,
	fontSize: vars.fontSize.sm,
	color: vars.color.textPrimary,
	backgroundColor: vars.color.surface,
	outline: "none",
	transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
	":focus": {
		borderColor: vars.color.primary,
		boxShadow: `0 0 0 3px rgba(29, 78, 216, 0.12)`,
	},
	"::placeholder": {
		color: vars.color.textSecondary,
	},
});

export const searchInput = style([inputBase]);
export const searchSelect = style([inputBase, { cursor: "pointer" }]);

export const dropdownWrapper = style({ position: "relative", display: "inline-block", width: "100%" });
export const dropdownTrigger = style({ display: "inline-flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: vars.spacing["1"], padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: vars.color.surface, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: `border-color 150ms ease, background-color 150ms ease`, selectors: { "&:hover": { borderColor: vars.color.textSecondary } } });
export const dropdownTriggerActive = style({ borderColor: vars.color.primary, color: vars.color.primary, backgroundColor: "#EFF6FF", selectors: { "&:hover": { borderColor: vars.color.primary } } });
export const dropdownChevron = style({ fontSize: "9px", color: "inherit", transition: `transform 150ms ease` });
export const dropdownChevronOpen = style({ transform: "rotate(180deg)" });
export const dropdownMenu = style({ position: "absolute", top: "calc(100% + 4px)", left: 0, minWidth: "100%", backgroundColor: vars.color.surface, border: `1px solid ${vars.color.border}`, borderRadius: vars.radius.md, boxShadow: vars.shadow.md, zIndex: 50, overflow: "hidden", padding: `${vars.spacing["1"]} 0` });
export const dropdownItem = style({ display: "block", width: "100%", padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`, fontSize: vars.fontSize.sm, color: vars.color.textPrimary, backgroundColor: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", whiteSpace: "nowrap", selectors: { "&:hover": { backgroundColor: "#F3F4F6" } } });
export const dropdownItemActive = style({ color: vars.color.primary, fontWeight: vars.fontWeight.medium, backgroundColor: "#EFF6FF", selectors: { "&:hover": { backgroundColor: "#DBEAFE" } } });

export const searchButtonWrap = style({
	display: "flex",
	alignItems: "flex-end",
	gap: vars.spacing["2"],
	"@media": {
		"screen and (max-width: 800px)": {
			justifyContent: "stretch",
		},
	},
});

export const searchActionButton = style({
	height: "42px",
	whiteSpace: "nowrap",
});

export const searchMetaRow = style({
	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
	gap: vars.spacing["2"],
});

export const totalCountRow = style({
	fontSize: vars.fontSize.xs,
	color: vars.color.textSecondary,
	paddingLeft: vars.spacing["1"],
});

export const searchMetaButtons = style({
	display: "flex",
	gap: vars.spacing["2"],
});

globalStyle(`${searchMetaButtons} button`, {
	height: "32px",
	padding: `0 ${vars.spacing["3"]}`,
	fontSize: vars.fontSize.sm,
});

export const totalCount = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSecondary,
});

export const stateText = style({
	textAlign: "center",
	padding: `${vars.spacing["16"]} 0`,
	color: vars.color.textSecondary,
	fontSize: vars.fontSize.sm,
});

export const tableWrap = style({
	width: "100%",
	backgroundColor: vars.color.surface,
	borderRadius: vars.radius.lg,
	border: `1px solid ${vars.color.border}`,
	overflow: "hidden",
});

export const tableScroll = style({ overflowX: "auto" });
export const table = style({
	width: "100%",
	borderCollapse: "collapse",
	minWidth: "1020px",
});
export const thead = style({ backgroundColor: "#F8FAFC" });

export const th = style({
	padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
	textAlign: "left",
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.textSecondary,
	borderBottom: `1px solid ${vars.color.border}`,
	whiteSpace: "nowrap",
});

export const thCenter = style([th, { textAlign: "center" }]);
export const tr = style({
	transition: `background-color ${vars.transition.fast}`,
});

export const td = style({
	padding: `${vars.spacing["4"]} ${vars.spacing["4"]}`,
	fontSize: vars.fontSize.sm,
	color: vars.color.textPrimary,
	verticalAlign: "middle",
	borderBottom: `1px solid #F1F5F9`,
	selectors: {
		"tbody tr:last-child &": { borderBottom: "none" },
		"tbody tr:hover &": { backgroundColor: "#F8FAFC" },
	},
});

export const tdCenter = style([td, { textAlign: "center" }]);

export const categoryPill = style({
	display: "inline-flex",
	alignItems: "center",
	padding: `2px ${vars.spacing["2"]}`,
	borderRadius: vars.radius.full,
	fontSize: "11px",
	fontWeight: vars.fontWeight.semibold,
	backgroundColor: "#EFF6FF",
	color: "#1E40AF",
	whiteSpace: "nowrap",
});

export const titleCell = style({
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.textPrimary,
	maxWidth: "220px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const contentPreview = style({
	maxWidth: "280px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	color: vars.color.textSecondary,
});

const switchBase = style({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "70px",
	height: "34px",
	padding: "0 10px",
	borderRadius: vars.radius.full,
	border: "none",
	fontSize: "11px",
	fontWeight: vars.fontWeight.bold,
	cursor: "pointer",
	transition: `all ${vars.transition.fast}`,
	selectors: {
		"&:disabled": { cursor: "not-allowed", opacity: 0.6 },
	},
});

export const switchButtonOn = style([
	switchBase,
	{
		backgroundColor: "#DBEAFE",
		color: "#1D4ED8",
		":hover": { backgroundColor: "#BFDBFE" },
	},
]);

export const switchButtonOff = style([
	switchBase,
	{
		backgroundColor: "#E5E7EB",
		color: "#6B7280",
	},
]);

export const switchThumb = style({
	position: "absolute",
	top: "3px",
	left: "3px",
	width: "28px",
	height: "28px",
	borderRadius: "50%",
	backgroundColor: "#FFFFFF",
	boxShadow: vars.shadow.sm,
	transition: `left ${vars.transition.fast}`,
	selectors: {
		[`${switchButtonOn} &`]: { left: "39px" },
		[`${switchButtonOff} &`]: { left: "3px" },
	},
});

export const switchLabel = style({ position: "relative", zIndex: 1 });

export const statusBadgeActive = style({
	display: "inline-flex",
	alignItems: "center",
	padding: `2px ${vars.spacing["2"]}`,
	borderRadius: vars.radius.full,
	fontSize: "11px",
	fontWeight: vars.fontWeight.semibold,
	backgroundColor: "#DCFCE7",
	color: "#166534",
});

export const statusBadgeInactive = style({
	display: "inline-flex",
	alignItems: "center",
	padding: `2px ${vars.spacing["2"]}`,
	borderRadius: vars.radius.full,
	fontSize: "11px",
	fontWeight: vars.fontWeight.semibold,
	backgroundColor: "#F1F5F9",
	color: "#64748B",
});

export const detailButton = style({
	padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.md,
	backgroundColor: vars.color.surface,
	color: vars.color.textPrimary,
	fontSize: vars.fontSize.xs,
	fontWeight: vars.fontWeight.medium,
	cursor: "pointer",
	transition: `all ${vars.transition.fast}`,
	":hover": {
		borderColor: vars.color.primary,
		color: vars.color.primary,
	},
});

export const paginationCard = style({
	width: "100%",
	backgroundColor: vars.color.surface,
	borderRadius: vars.radius.lg,
	border: `1px solid ${vars.color.border}`,
	padding: `${vars.spacing["3"]} ${vars.spacing["5"]}`,
});

export const pagination = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: vars.spacing["3"],
	flexWrap: "wrap",
});

export const pageInfo = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textSecondary,
});
export const pageButtons = style({
	display: "flex",
	alignItems: "center",
	gap: vars.spacing["2"],
	flexWrap: "wrap",
});

const pageButtonBase = style({
	minWidth: "36px",
	height: "36px",
	padding: `0 ${vars.spacing["3"]}`,
	borderRadius: vars.radius.md,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surface,
	color: vars.color.textPrimary,
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.medium,
	cursor: "pointer",
	transition: `all ${vars.transition.fast}`,
	":hover": { borderColor: vars.color.primary, color: vars.color.primary },
});

export const pageBtn = style([pageButtonBase]);
export const pageBtnActive = style([
	pageButtonBase,
	{
		borderColor: vars.color.primary,
		backgroundColor: vars.color.primary,
		color: "#FFFFFF",
		":hover": { color: "#FFFFFF" },
	},
]);
export const pageBtnDisabled = style([
	pageButtonBase,
	{
		opacity: 0.45,
		cursor: "not-allowed",
		":hover": { borderColor: vars.color.border, color: vars.color.textPrimary },
	},
]);

export const categorySelectWrap = style({ position: "relative" });
export const categorySelectInputWrap = style({ position: "relative" });
export const categorySelectInput = style([
	inputBase,
	{ paddingRight: vars.spacing["10"] },
]);
export const categorySelectClear = style({
	position: "absolute",
	top: "50%",
	right: vars.spacing["3"],
	transform: "translateY(-50%)",
	border: "none",
	background: "transparent",
	color: vars.color.textSecondary,
	fontSize: "18px",
	cursor: "pointer",
	lineHeight: 1,
});

export const categorySelectDropdown = style({
	position: "absolute",
	top: "calc(100% + 6px)",
	left: 0,
	right: 0,
	maxHeight: "260px",
	overflowY: "auto",
	margin: 0,
	padding: vars.spacing["2"],
	listStyle: "none",
	backgroundColor: vars.color.surface,
	border: `1px solid ${vars.color.border}`,
	borderRadius: vars.radius.md,
	boxShadow: vars.shadow.md,
	zIndex: 30,
});

export const categorySelectItem = style({
	padding: `${vars.spacing["2"]} ${vars.spacing["3"]}`,
	borderRadius: vars.radius.sm,
	fontSize: vars.fontSize.sm,
	color: vars.color.textPrimary,
	cursor: "pointer",
});

export const categorySelectItemHighlighted = style([
	categorySelectItem,
	{ backgroundColor: "#EFF6FF", color: vars.color.primary },
]);
export const categorySelectEmpty = style({
	padding: `${vars.spacing["3"]} ${vars.spacing["3"]}`,
	fontSize: vars.fontSize.sm,
	color: vars.color.textSecondary,
});

export const modalForm = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["5"],
});
export const modalSection = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["3"],
});
export const modalSectionTitle = style({
	margin: 0,
	fontSize: vars.fontSize.base,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.textPrimary,
});
export const detailGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: vars.spacing["3"],
	"@media": { "screen and (max-width: 640px)": { gridTemplateColumns: "1fr" } },
});
export const detailItem = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["1"],
	padding: vars.spacing["3"],
	borderRadius: vars.radius.md,
	backgroundColor: "#F8FAFC",
	border: `1px solid ${vars.color.border}`,
});
export const detailLabel = style({
	fontSize: vars.fontSize.xs,
	color: vars.color.textSecondary,
});
export const detailValue = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textPrimary,
});
export const modalSwitchRow = style({
	display: "flex",
	alignItems: "center",
	gap: vars.spacing["3"],
	flexWrap: "wrap",
});

export const modalSwitchMeta = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["1"],
	fontSize: vars.fontSize.xs,
	color: vars.color.textSecondary,
});

export const modalFieldGrid = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["4"],
});
export const fieldBlock = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["2"],
});
export const fieldLabel = style({
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.textPrimary,
});
export const textInput = style([inputBase]);
export const textarea = style([
	{
		width: "100%",
		minHeight: "220px",
		padding: `${vars.spacing["3"]} ${vars.spacing["4"]}`,
		border: `1px solid ${vars.color.border}`,
		borderRadius: vars.radius.md,
		fontSize: vars.fontSize.sm,
		color: vars.color.textPrimary,
		backgroundColor: vars.color.surface,
		resize: "vertical",
		fontFamily: "inherit",
		lineHeight: vars.lineHeight.normal,
		outline: "none",
		transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
		":focus": {
			borderColor: vars.color.primary,
			boxShadow: `0 0 0 3px rgba(29, 78, 216, 0.12)`,
		},
	},
]);
export const previewCard = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["3"],
	padding: vars.spacing["4"],
	borderRadius: vars.radius.lg,
	border: `1px solid ${vars.color.border}`,
	backgroundColor: vars.color.surface,
});
export const previewTitle = style({
	fontSize: vars.fontSize.lg,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.textPrimary,
});
export const previewMeta = style({
	display: "flex",
	flexWrap: "wrap",
	gap: vars.spacing["2"],
	fontSize: vars.fontSize.xs,
	color: vars.color.textSecondary,
});
export const previewContent = style({
	fontSize: vars.fontSize.sm,
	color: vars.color.textPrimary,
	lineHeight: vars.lineHeight.relaxed,
});

globalStyle(`${previewContent} p`, { margin: `0 0 ${vars.spacing["3"]} 0` });
globalStyle(`${previewContent} ul`, {
	paddingLeft: vars.spacing["5"],
	margin: `0 0 ${vars.spacing["3"]} 0`,
});
globalStyle(`${previewContent} ol`, {
	paddingLeft: vars.spacing["5"],
	margin: `0 0 ${vars.spacing["3"]} 0`,
});
globalStyle(`${previewContent} > *:last-child`, { marginBottom: 0 });

export const modalFooterActions = style({
	display: "flex",
	justifyContent: "flex-end",
	gap: vars.spacing["2"],
	width: "100%",
});
