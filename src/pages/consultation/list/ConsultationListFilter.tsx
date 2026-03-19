import { useEffect, useRef, useState } from "react";
import type { GetConsultationListParams } from "../../../shared/api/generated/api.schemas";
import { useGetConsultationListQuery } from "../../../shared/api/generated/consultation-list";
import { useGetCategoriesQuery } from "../../../shared/api/generated/meta-controller";
import * as s from "./ConsultationListPage.css";

// GetConsultationListParams를 그대로 사용 (categoryLarge는 api.schemas.ts에 추가됨)
export type ConsultationListFilterParams = GetConsultationListParams;

const RESULT_STATUS_OPTIONS  = ["처리중", "완료", "미완료", "요청중"];
const SUMMARY_STATUS_OPTIONS = ["요약완료", "요청중", "실패"];
const CHANNEL_OPTIONS        = ["전화", "채팅"];

// 표시할 대분류 7개 (순서 유지)
const LARGE_CATEGORY_ORDER = [
  "부가서비스",
  "해지/재약정",
  "기기변경",
  "기타",
  "요금/납부",
  "아웃바운드",
  "장애/A/S",
];

interface FilterProps {
  params: ConsultationListFilterParams;
  onChange: (updates: Partial<ConsultationListFilterParams>) => void;
}

function DropdownFilter({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isActive = !!value;
  const label = value || placeholder;

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
          <button
            type="button"
            className={`${s.dropdownItem}${!value ? ` ${s.dropdownItemActive}` : ""}`}
            onClick={() => { onChange(undefined); setOpen(false); }}
          >
            전체
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`${s.dropdownItem}${value === opt ? ` ${s.dropdownItemActive}` : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ConsultationListFilter({ params, onChange }: FilterProps) {
  const [inputValue, setInputValue]           = useState(params.keyword ?? "");
  const [debouncedValue, setDebouncedValue]   = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 대분류 목록 fetch
  const { data: categoryData } = useGetCategoriesQuery();
  const largeCategoryOptions = LARGE_CATEGORY_ORDER.filter((name) =>
    (categoryData ?? []).some((c) => c.largeCategory === name),
  );

  // 300ms debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue.trim()), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => { setHighlightedIndex(-1); }, [debouncedValue]);

  useEffect(() => {
    if (!showSuggestions) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSuggestions]);

  // 추천어 fetch
  const { data: suggestData } = useGetConsultationListQuery(
    { keyword: debouncedValue, size: 8, page: 0 },
    { query: { enabled: debouncedValue.length >= 1 } },
  );

  const suggestions = Array.from(
    new Set(
      (suggestData?.data?.content ?? [])
        .map((item) => item.customerName)
        .filter((name): name is string => !!name && name.includes(debouncedValue)),
    ),
  ).slice(0, 6);

  const canShowSuggestions = showSuggestions && suggestions.length > 0 && debouncedValue.length >= 1;

  function submitSearch(value?: string) {
    const v = value ?? inputValue;
    if (value !== undefined) setInputValue(value);
    onChange({ keyword: v.trim() || undefined });
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!canShowSuggestions) {
      if (e.key === "Enter") submitSearch();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          submitSearch(suggestions[highlightedIndex]);
        } else {
          submitSearch();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  return (
    <div className={s.filterBar}>
      {/* 1행: 검색창 */}
      <div className={s.searchGroup}>
        <div ref={wrapperRef} style={{ position: "relative", flex: 1, display: "flex" }}>
          <input
            type="text"
            className={s.searchInput}
            style={{ flex: 1, borderRadius: undefined }}
            placeholder="이름, 전화번호, 키워드 검색..."
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setShowSuggestions(true); }}
            onFocus={() => { if (inputValue.trim()) setShowSuggestions(true); }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />

          {canShowSuggestions && (
            <div className={s.dropdownMenu} style={{ minWidth: "100%", top: "calc(100% + 2px)" }}>
              {suggestions.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  className={`${s.dropdownItem}${i === highlightedIndex ? ` ${s.dropdownItemActive}` : ""}`}
                  onMouseDown={(e) => { e.preventDefault(); submitSearch(name); }}
                >
                  {(() => {
                    const idx = name.indexOf(debouncedValue);
                    if (idx === -1) return name;
                    return (
                      <>
                        {name.slice(0, idx)}
                        <strong style={{ color: "inherit" }}>{name.slice(idx, idx + debouncedValue.length)}</strong>
                        {name.slice(idx + debouncedValue.length)}
                      </>
                    );
                  })()}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" className={s.searchBtn} onClick={() => submitSearch()}>
          검색
        </button>
      </div>

      {/* 2행: 필터 드롭다운 */}
      <div className={s.filterRow}>
        <DropdownFilter
          value={params.categoryLarge ?? ""}
          placeholder="상담 유형"
          options={largeCategoryOptions}
          onChange={(v) => onChange({ categoryLarge: v })}
        />
        <DropdownFilter
          value={params.resultStatus ?? ""}
          placeholder="처리상태"
          options={RESULT_STATUS_OPTIONS}
          onChange={(v) => onChange({ resultStatus: v })}
        />
        <DropdownFilter
          value={params.summaryStatus ?? ""}
          placeholder="요약상태"
          options={SUMMARY_STATUS_OPTIONS}
          onChange={(v) => onChange({ summaryStatus: v })}
        />
        <DropdownFilter
          value={params.channel ?? ""}
          placeholder="채널"
          options={CHANNEL_OPTIONS}
          onChange={(v) => onChange({ channel: v })}
        />
      </div>
    </div>
  );
}
