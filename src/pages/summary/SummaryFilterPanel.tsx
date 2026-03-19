import { useEffect, useRef, useState } from "react";
import Select, { type SingleValue, type MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import type { ListParams } from "../../shared/api/generated/api.schemas";
import { useMutationPostFilterGroupQuery } from "../../shared/api/generated/search-filter";
import { GRADE_MAP, RISK_TYPE_MAP, RISK_LEVEL_MAP } from "../../shared/config/meta";
import { BaseModal } from "../../shared/ui/BaseModal/BaseModal";
import { FilterIcon } from "../../shared/ui/icons";
import { EMPTY_DRAFT, buildParams, buildFilterItems } from "./filterDraft";
import type { FilterDraft } from "./filterDraft";
import type { CategoryOption } from "./categoryOptions";
import { useCategoryOptions } from "./hooks/useCategoryOptions";
import { loadAgentOptions } from "./hooks/useAgentSearch";
import { loadProductOptions } from "./hooks/useProductSearch";
import {
  useComplaintCategories,
  useDefenseCategories,
  useOutboundCategories,
} from "./hooks/useAnalysisCodes";
import * as s from "./SummaryFilterPanel.css";

type SelectOption = { value: string; label: string };

// ─── AsyncSelect debounce wrapper ─────────────────────────────────────────────

function withDebounce(fn: (input: string) => Promise<SelectOption[]>, ms = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (input: string) =>
    new Promise<SelectOption[]>((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(input).then(resolve), ms);
    });
}

const loadAgentDebounced   = withDebounce(loadAgentOptions);
const loadProductDebounced = withDebounce(loadProductOptions);

// ─── React-select 공통 스타일 (기존 디자인 통일) ─────────────────────────────

const rsBase = {
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    minHeight: "34px",
    fontSize: "13px",
    borderColor: state.isFocused ? "#2563EB" : "#E5E7EB",
    boxShadow: "none",
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    cursor: "pointer",
    "&:hover": { borderColor: "#9CA3AF" },
  }),
  valueContainer: (base: object) => ({ ...base, padding: "0 10px" }),
  input: (base: object) => ({ ...base, margin: 0, padding: 0, fontSize: "13px" }),
  placeholder: (base: object) => ({ ...base, color: "#9CA3AF", fontSize: "13px" }),
  singleValue: (base: object) => ({ ...base, fontSize: "13px", color: "#111827" }),
  multiValue: (base: object) => ({ ...base, backgroundColor: "#EFF6FF", borderRadius: "4px" }),
  multiValueLabel: (base: object) => ({ ...base, fontSize: "12px", color: "#1D4ED8" }),
  multiValueRemove: (base: object) => ({
    ...base,
    color: "#1D4ED8",
    ":hover": { backgroundColor: "#DBEAFE", color: "#1E40AF" },
  }),
  option: (base: object, state: { isSelected: boolean; isFocused: boolean }) => ({
    ...base,
    fontSize: "13px",
    backgroundColor: state.isSelected ? "#EFF6FF" : state.isFocused ? "#F3F4F6" : "transparent",
    color: state.isSelected ? "#2563EB" : "#111827",
    cursor: "pointer",
    padding: "8px 12px",
    whiteSpace: "nowrap" as const,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base: object) => ({ ...base, padding: "0 6px", color: "#9CA3AF" }),
  clearIndicator: (base: object) => ({
    ...base,
    padding: "0 4px",
    color: "#9CA3AF",
    ":hover": { color: "#6B7280" },
  }),
  loadingMessage: (base: object) => ({ ...base, fontSize: "13px" }),
  noOptionsMessage: (base: object) => ({ ...base, fontSize: "13px" }),
};

const menuBase = (base: object, minWidth: string) => ({
  ...base,
  minWidth,
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  border: "1px solid #E5E7EB",
  zIndex: 100,
});

// 상담사 검색 — flex:1, 최소 200px
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rsStyles: any = {
  ...rsBase,
  container: (base: object) => ({ ...base, flex: 1, minWidth: "200px" }),
  menu: (base: object) => menuBase(base, "200px"),
};

// 카테고리 검색 — 고정 너비 (라벨이 "대분류 > 중분류 > 소분류" 형태)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rsCategoryStyles: any = {
  ...rsBase,
  container: (base: object) => ({ ...base, flex: 1, minWidth: "280px", maxWidth: "400px" }),
  menu: (base: object) => menuBase(base, "440px"),
};

// 상품 검색 — 행 전체 너비 (isMulti라 선택 태그가 쌓임)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rsProductStyles: any = {
  ...rsBase,
  container: (base: object) => ({ ...base, width: "100%", minWidth: "300px" }),
  menu: (base: object) => menuBase(base, "300px"),
};

// ─── 기존 커스텀 드롭다운 (단일) ──────────────────────────────────────────────

function DropdownFilter({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const isActive = !!value;

  return (
    <div className={s.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={`${s.dropdownTrigger}${isActive ? ` ${s.dropdownTriggerActive}` : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {selected?.label ?? placeholder}
        <span className={`${s.dropdownChevron}${open ? ` ${s.dropdownChevronOpen}` : ""}`}>▼</span>
      </button>
      {open && (
        <div className={s.dropdownMenu}>
          <button
            type="button"
            className={`${s.dropdownItem}${!value ? ` ${s.dropdownItemActive}` : ""}`}
            onClick={() => { onChange(""); setOpen(false); }}
          >
            전체
          </button>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className={`${s.dropdownItem}${value === o.value ? ` ${s.dropdownItemActive}` : ""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 기존 커스텀 드롭다운 (멀티) ──────────────────────────────────────────────

function MultiDropdown({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: SelectOption[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  const isActive = value.length > 0;
  const label = isActive ? `${placeholder} (${value.length})` : placeholder;

  return (
    <div className={s.dropdownWrapper} ref={ref}>
      <button
        type="button"
        className={`${s.dropdownTrigger}${isActive ? ` ${s.dropdownTriggerActive}` : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <span className={`${s.dropdownChevron}${open ? ` ${s.dropdownChevronOpen}` : ""}`}>▼</span>
      </button>
      {open && (
        <div className={s.dropdownMenu}>
          {options.map((o) => {
            const checked = value.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                className={`${s.dropdownItem}${checked ? ` ${s.dropdownItemActive}` : ""}`}
                onClick={() => toggle(o.value)}
              >
                <span className={checked ? s.checkboxIconChecked : s.checkboxIcon}>
                  {checked ? "✓" : ""}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── 옵션 상수 ────────────────────────────────────────────────────────────────

const CHANNEL_OPTS: SelectOption[]        = [{ value: "CALL", label: "전화" }, { value: "CHATTING", label: "채팅" }];
const GENDER_OPTS: SelectOption[]         = [{ value: "M", label: "남" },       { value: "F", label: "여" }];
const OUTBOUND_RESULT_OPTS: SelectOption[]= [{ value: "CONVERTED", label: "성공" }, { value: "REJECTED", label: "거절" }];
const INTENT_OPTS: SelectOption[]         = [{ value: "true", label: "있음" },  { value: "false", label: "없음" }];
const DEF_ATTEMPTED_OPTS: SelectOption[]  = [{ value: "true", label: "시도" },  { value: "false", label: "미시도" }];
const DEF_SUCCESS_OPTS: SelectOption[]    = [{ value: "true", label: "성공" },  { value: "false", label: "실패" }];
const GRADE_OPTS: SelectOption[]          = Object.entries(GRADE_MAP).map(([v, l]) => ({ value: v, label: l }));
const RISK_TYPE_OPTS: SelectOption[]      = Object.entries(RISK_TYPE_MAP).map(([v, l]) => ({ value: v, label: l }));
const RISK_LEVEL_OPTS: SelectOption[]     = Object.entries(RISK_LEVEL_MAP).map(([v, l]) => ({ value: v, label: l }));

// ─── 저장 모달 필터 요약 ──────────────────────────────────────────────────────

function getFilterSummary(d: FilterDraft): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  if (d.keyword)              items.push({ label: "키워드",    value: d.keyword });
  if (d.fromDate || d.toDate) items.push({ label: "상담 기간",  value: `${d.fromDate || "시작일"} ~ ${d.toDate || "종료일"}` });
  if (d.channel)              items.push({ label: "채널",      value: d.channel === "CALL" ? "전화" : "채팅" });
  if (d.agentName)            items.push({ label: "상담사",    value: d.agentName });
  if (d.category)             items.push({ label: "카테고리",  value: d.category.label });
  if (d.riskType.length)      items.push({ label: "리스크 유형", value: d.riskType.map((v) => RISK_TYPE_MAP[v] ?? v).join(", ") });
  if (d.riskLevel.length)     items.push({ label: "리스크 수준", value: d.riskLevel.map((v) => RISK_LEVEL_MAP[v] ?? v).join(", ") });
  if (d.customerName)         items.push({ label: "고객명",    value: d.customerName });
  if (d.customerPhone)        items.push({ label: "연락처",    value: d.customerPhone });
  if (d.grade)                items.push({ label: "고객 등급",  value: GRADE_MAP[d.grade] ?? d.grade });
  if (d.gender)               items.push({ label: "성별",      value: d.gender === "M" ? "남" : "여" });
  if (d.intent)               items.push({ label: "해지 의사",  value: d.intent === "true" ? "있음" : "없음" });
  if (d.productCode.length)   items.push({ label: "상품 코드",  value: d.productCode.join(", ") });
  if (d.minDuration)          items.push({ label: "최소 시간",  value: `${d.minDuration}초` });
  if (d.maxDuration)          items.push({ label: "최대 시간",  value: `${d.maxDuration}초` });
  return items;
}

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

interface Props {
  onSearch: (params: Omit<ListParams, "page" | "size">) => void;
  forceDraft?: FilterDraft | null;
}

export function SummaryFilterPanel({ onSearch, forceDraft }: Props) {
  const [draft, setDraft]                     = useState<FilterDraft>(EMPTY_DRAFT);
  const [expanded, setExpanded]               = useState(false);
  const [agentSelected, setAgentSelected]     = useState<SelectOption | null>(null);
  const [productSelected, setProductSelected] = useState<SelectOption[]>([]);
  const [showSave, setShowSave]               = useState(false);
  const [isSaveClosing, setIsSaveClosing]     = useState(false);
  const [saveName, setSaveName]               = useState("");
  const [result, setResult]                   = useState<"success" | "error" | null>(null);
  const [isResultClosing, setIsResultClosing] = useState(false);

  const { data: categoryOptions = [], isLoading: catLoading } = useCategoryOptions();
  const { data: complaintOpts = []  } = useComplaintCategories();
  const { data: defenseOpts   = []  } = useDefenseCategories();
  const { data: outboundOpts  = []  } = useOutboundCategories();

  const { mutate: saveFilter, isPending: isSaving } = useMutationPostFilterGroupQuery();

  // 저장된 조건 불러오기
  useEffect(() => {
    if (!forceDraft) return;
    setDraft(forceDraft);
    setAgentSelected(null); // 저장 필터에는 agentId 없음 → agentName으로 검색
    setProductSelected(forceDraft.productCode.map((c) => ({ value: c, label: c })));
    onSearch(buildParams(forceDraft));
  }, [forceDraft, onSearch]);

  const set = <K extends keyof FilterDraft>(k: K, v: FilterDraft[K]) =>
    setDraft((prev) => ({ ...prev, [k]: v }));

  const handleAgentChange = (opt: SingleValue<SelectOption>) => {
    setAgentSelected(opt ?? null);
    setDraft((prev) => ({
      ...prev,
      agentId:   opt?.value ?? "",
      agentName: opt?.label ?? "",
    }));
  };

  const handleProductChange = (opts: MultiValue<SelectOption>) => {
    const arr = [...opts];
    setProductSelected(arr);
    set("productCode", arr.map((o) => o.value));
  };

  const handleSearch = () => onSearch(buildParams(draft));
  const handleReset  = () => {
    setDraft(EMPTY_DRAFT);
    setAgentSelected(null);
    setProductSelected([]);
    onSearch({});
  };

  const handleCloseSave   = () => {
    setIsSaveClosing(true);
    setTimeout(() => { setShowSave(false); setIsSaveClosing(false); }, 180);
  };
  const handleCloseResult = () => {
    setIsResultClosing(true);
    setTimeout(() => { setResult(null); setIsResultClosing(false); }, 180);
  };
  const handleSaveConfirm = () => {
    const items = buildFilterItems(draft);
    if (!saveName.trim() || items.length === 0) return;
    saveFilter(
      { data: { groupName: saveName.trim(), filters: items } },
      {
        onSuccess: () => { handleCloseSave(); setTimeout(() => setResult("success"), 200); },
        onError:   () => { handleCloseSave(); setTimeout(() => setResult("error"),   200); },
      },
    );
  };

  const filterSummary = getFilterSummary(draft);
  const filterItems   = buildFilterItems(draft);

  return (
    <>
      <div className={s.filterCard}>

        {/* ── Row 1: 기본 검색 (상시 노출) ── */}
        <div className={s.filterRow}>
          <div className={s.searchGroup}>
            <input
              type="text"
              className={s.searchInput}
              placeholder="키워드 검색 (상담 내용, 고객명, 상담사명)"
              value={draft.keyword}
              onChange={(e) => set("keyword", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button type="button" className={s.searchBtn} onClick={handleSearch}>검색</button>
          </div>

          <button
            type="button"
            className={`${s.accordionToggle}${expanded ? ` ${s.accordionToggleActive}` : ""}`}
            onClick={() => setExpanded((v) => !v)}
          >
            <FilterIcon size={13} />
            상세 검색
            <span className={`${s.dropdownChevron}${expanded ? ` ${s.dropdownChevronOpen}` : ""}`}>▼</span>
          </button>
        </div>

        {/* ── 아코디언: 상세 조건 + 푸터 ── */}
        {expanded && (
          <>
          <div className={s.accordionSection}>

            {/* 상담 정보 */}
            <p className={s.accordionSectionLabel}>상담 정보</p>
            <div className={s.filterRow}>
              <AsyncSelect<SelectOption>
                styles={rsStyles}
                placeholder="상담사 검색"
                loadOptions={loadAgentDebounced}
                value={agentSelected}
                onChange={handleAgentChange}
                isClearable
                noOptionsMessage={({ inputValue }) =>
                  inputValue ? "검색 결과 없음" : "이름을 입력하세요"
                }
                loadingMessage={() => "검색 중..."}
              />
              <Select<CategoryOption>
                styles={rsCategoryStyles}
                placeholder="카테고리 검색"
                options={categoryOptions}
                isLoading={catLoading}
                value={draft.category}
                onChange={(opt) => set("category", opt ?? null)}
                isClearable
                filterOption={(option, input) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                noOptionsMessage={() => "검색 결과 없음"}
              />
            </div>
            <div className={s.filterRow}>
              <DropdownFilter
                placeholder="채널"
                options={CHANNEL_OPTS}
                value={draft.channel}
                onChange={(v) => set("channel", v)}
              />
              <MultiDropdown
                placeholder="리스크 유형"
                options={RISK_TYPE_OPTS}
                value={draft.riskType}
                onChange={(v) => set("riskType", v)}
              />
              <MultiDropdown
                placeholder="리스크 수준"
                options={RISK_LEVEL_OPTS}
                value={draft.riskLevel}
                onChange={(v) => set("riskLevel", v)}
              />
            </div>
            <div className={s.filterRow}>
              <div className={s.dateRangeGroup}>
                <span className={s.dateLabel}>상담 기간</span>
                <input type="date" className={s.dateInput} value={draft.fromDate} onChange={(e) => set("fromDate", e.target.value)} />
                <span className={s.dateSep}>~</span>
                <input type="date" className={s.dateInput} value={draft.toDate}   onChange={(e) => set("toDate",   e.target.value)} />
              </div>
              <div className={s.numberRangeGroup}>
                <span className={s.dateLabel}>상담 시간(초)</span>
                <input
                  type="number"
                  className={s.numberInput}
                  placeholder="최소"
                  min={0}
                  value={draft.minDuration}
                  onChange={(e) => set("minDuration", e.target.value)}
                />
                <span className={s.dateSep}>~</span>
                <input
                  type="number"
                  className={s.numberInput}
                  placeholder="최대"
                  min={0}
                  value={draft.maxDuration}
                  onChange={(e) => set("maxDuration", e.target.value)}
                />
              </div>
            </div>

            {/* 고객 정보 */}
            <p className={s.accordionSectionLabel}>고객 정보</p>
            <div className={s.filterRow}>
              <input className={s.textInput} placeholder="고객명"      value={draft.customerName}  onChange={(e) => set("customerName",  e.target.value)} />
              <input className={s.textInput} placeholder="고객 연락처" value={draft.customerPhone} onChange={(e) => set("customerPhone", e.target.value)} />
              <input className={s.textInput} placeholder="고객 ID"     value={draft.customerId}    onChange={(e) => set("customerId",    e.target.value)} />
              <DropdownFilter placeholder="고객 등급" options={GRADE_OPTS}  value={draft.grade}  onChange={(v) => set("grade",  v)} />
              <DropdownFilter placeholder="성별"      options={GENDER_OPTS} value={draft.gender} onChange={(v) => set("gender", v)} />
            </div>

            {/* 해지/방어 */}
            <p className={s.accordionSectionLabel}>해지/방어</p>
            <div className={s.filterRow}>
              <DropdownFilter placeholder="해지 의사"    options={INTENT_OPTS}        value={draft.intent}           onChange={(v) => set("intent",           v as FilterDraft["intent"])} />
              <DropdownFilter placeholder="방어 시도"    options={DEF_ATTEMPTED_OPTS}  value={draft.defenseAttempted} onChange={(v) => set("defenseAttempted", v as FilterDraft["defenseAttempted"])} />
              <DropdownFilter placeholder="방어 성공"    options={DEF_SUCCESS_OPTS}    value={draft.defenseSuccess}   onChange={(v) => set("defenseSuccess",   v as FilterDraft["defenseSuccess"])} />
              <DropdownFilter placeholder="불만 유형"    options={complaintOpts}       value={draft.complaintCategory} onChange={(v) => set("complaintCategory", v)} />
              <DropdownFilter placeholder="방어 전략"    options={defenseOpts}         value={draft.defenseCategory}   onChange={(v) => set("defenseCategory",   v)} />
            </div>

            {/* 아웃바운드 */}
            <p className={s.accordionSectionLabel}>아웃바운드</p>
            <div className={s.filterRow}>
              <DropdownFilter placeholder="거절 사유"       options={outboundOpts}        value={draft.outboundCategory} onChange={(v) => set("outboundCategory", v)} />
              <DropdownFilter placeholder="아웃바운드 결과" options={OUTBOUND_RESULT_OPTS} value={draft.outboundResult}   onChange={(v) => set("outboundResult",   v)} />
            </div>

            {/* 상품 */}
            <p className={s.accordionSectionLabel}>상품</p>
            <div className={s.filterRow}>
              <AsyncSelect<SelectOption, true>
                styles={rsProductStyles}
                placeholder="상품 코드/명 검색 (복수 선택 가능)"
                loadOptions={loadProductDebounced}
                value={productSelected}
                onChange={handleProductChange}
                isMulti
                isClearable
                noOptionsMessage={({ inputValue }) =>
                  inputValue ? "검색 결과 없음" : "코드 또는 상품명을 입력하세요"
                }
                loadingMessage={() => "검색 중..."}
              />
            </div>

          </div>

          {/* ── 푸터 ── */}
          <div className={s.filterFooter}>
            <button type="button" className={s.btnReset} onClick={handleReset}>↺ 초기화</button>
            <div className={s.footerRight}>
              <button type="button" className={s.btnSave} onClick={() => { setSaveName(""); setShowSave(true); }}>☆ 조건 저장</button>
              <button type="button" className={s.btnSearch} onClick={handleSearch}>⌕ 조건 검색</button>
            </div>
          </div>
          </>
        )}
      </div>


      {/* ── 저장 결과 모달 ── */}
      {result != null && (
        <BaseModal
          title={result === "success" ? "저장 완료" : "저장 실패"}
          onClose={handleCloseResult}
          isClosing={isResultClosing}
          footer={
            <div className={s.saveModalFooterRow}>
              <button type="button" className={s.btnSearch} onClick={handleCloseResult}>확인</button>
            </div>
          }
        >
          <p style={{ textAlign: "center", padding: "16px 0", fontSize: "14px", color: result === "success" ? "#059669" : "#DC2626" }}>
            {result === "success" ? "검색 조건이 성공적으로 저장됐습니다." : "저장에 실패했습니다. 다시 시도해 주세요."}
          </p>
        </BaseModal>
      )}

      {/* ── 조건 저장 모달 ── */}
      {showSave && (
        <BaseModal
          title="검색 조건 저장"
          subTitle="현재 선택된 조건을 저장합니다"
          onClose={handleCloseSave}
          isClosing={isSaveClosing}
          footer={
            <div className={s.saveModalFooterRow}>
              <button type="button" className={s.btnReset} onClick={handleCloseSave}>취소</button>
              <button
                type="button"
                className={s.btnSearch}
                onClick={handleSaveConfirm}
                disabled={isSaving || !saveName.trim() || filterItems.length === 0}
              >
                {isSaving ? "저장 중..." : "저장"}
              </button>
            </div>
          }
        >
          <p className={s.saveModalNameLabel}>저장 이름</p>
          <input
            className={s.saveModalNameInput}
            placeholder="예: 해지 위험 고객 VIP 필터"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveConfirm()}
          />
          <p className={s.saveModalSectionTitle}>선택된 필터 조건</p>
          {filterSummary.length === 0 ? (
            <p className={s.saveModalEmpty}>선택된 조건이 없습니다. 조건을 먼저 설정해 주세요.</p>
          ) : (
            <div className={s.saveModalTagGrid}>
              {filterSummary.map((item) => (
                <span key={item.label} className={s.saveModalTag}>
                  <span className={s.saveModalTagLabel}>{item.label}</span>
                  <span className={s.saveModalTagValue}>{item.value}</span>
                </span>
              ))}
            </div>
          )}
        </BaseModal>
      )}
    </>
  );
}
