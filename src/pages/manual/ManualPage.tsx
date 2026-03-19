import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../shared/api/client";
import type { ManualResponse } from "../../shared/api/generated/api.schemas";
import {
  useGetManualBookmarksQuery,
  useMutationPostManualBookmarkQuery,
  useMutationDeleteManualBookmarkQuery,
} from "../../shared/api/generated/bookmark";
import { getManualBookmarksKey } from "../../shared/api/generated/bookmark/bookmark.keys";
import { useGetCategoriesQuery } from "../../shared/api/generated/meta-controller";
import * as layout from "../../shared/ui/pageLayout.css";
import { ManualDetailModal } from "./ManualDetailModal";
import * as s from "./ManualPage.css";

interface ManualPageResponse {
  content: ManualResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

function useManualHistoryQuery(params: { categoryCode?: string; page: number; size: number }) {
  return useQuery({
    queryKey: ["/manuals/history", params],
    queryFn: ({ signal }) =>
      apiClient<ManualPageResponse>({
        url: "/manuals/history",
        method: "GET",
        params: Object.fromEntries(
          Object.entries({ ...params, categoryCode: params.categoryCode || undefined })
            .filter(([, v]) => v !== undefined),
        ) as Record<string, string | number | boolean>,
        signal,
      }),
  });
}

/* ─── CategoryAutocomplete ─── */
interface CategoryOption {
  code: string;
  label: string;
}

function CategoryAutocomplete({
  options,
  value,
  onChange,
}: {
  options: CategoryOption[];
  value: string;       // currently selected code
  onChange: (code: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen]             = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // inputValue를 표시 레이블과 동기화
  const selectedLabel = options.find((o) => o.code === value)?.label ?? "";
  useEffect(() => {
    setInputValue(selectedLabel);
  }, [selectedLabel]);

  const filtered = inputValue
    ? options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase()))
    : options;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setOpen(true);
    setHighlighted(-1);
    // 직접 입력 중이면 선택값 해제
    if (value) onChange("");
  }

  function handleSelect(opt: CategoryOption) {
    onChange(opt.code);
    setInputValue(opt.label);
    setOpen(false);
    setHighlighted(-1);
  }

  function handleClear() {
    onChange("");
    setInputValue("");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlighted >= 0 && filtered[highlighted]) handleSelect(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // 외부 클릭 시 닫기
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        // 선택 없이 닫으면 입력값 원래대로 복구
        setInputValue(selectedLabel);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [selectedLabel]);

  return (
    <div ref={wrapRef} className={s.autocompleteWrap}>
      <div className={s.autocompleteInputWrap}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="카테고리 검색..."
          className={s.autocompleteInput}
          autoComplete="off"
        />
        {(inputValue || value) && (
          <button type="button" className={s.autocompleteClear} onClick={handleClear} tabIndex={-1}>
            ×
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul className={s.autocompleteDropdown}>
          {filtered.map((opt, idx) => (
            <li
              key={opt.code}
              className={idx === highlighted ? s.autocompleteItemHighlighted : s.autocompleteItem}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {open && filtered.length === 0 && inputValue && (
        <ul className={s.autocompleteDropdown}>
          <li className={s.autocompleteEmpty}>일치하는 카테고리가 없습니다</li>
        </ul>
      )}
    </div>
  );
}

/* ─── BookmarkToggle ─── */

function BookmarkToggle({ manualId, bookmarkedIds }: { manualId: number; bookmarkedIds: Set<number> }) {
  const qc = useQueryClient();
  const { mutate: add, isPending: isAdding } = useMutationPostManualBookmarkQuery();
  const { mutate: remove, isPending: isRemoving } = useMutationDeleteManualBookmarkQuery();
  const [optimistic, setOptimistic] = useState<boolean | null>(null);

  const isBookmarked = optimistic !== null ? optimistic : bookmarkedIds.has(manualId);
  const isPending2 = isAdding || isRemoving;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isBookmarked;
    setOptimistic(next);
    const onSuccess = () => { qc.invalidateQueries({ queryKey: getManualBookmarksKey() }); setOptimistic(null); };
    const onError = () => setOptimistic(null);
    if (next) add({ manualId }, { onSuccess, onError });
    else remove({ manualId }, { onSuccess, onError });
  };

  return (
    <button type="button" className={s.bookmarkBtn} onClick={handleToggle}
      disabled={isPending2} title={isBookmarked ? "북마크 해제" : "북마크 추가"}
      style={isBookmarked ? { color: "#F59E0B" } : undefined}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

/* ─── ManualPage ─── */
const PAGE_SIZE = 20;

export function ManualPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage]                         = useState(0);
  const [selectedManual, setSelectedManual]     = useState<ManualResponse | null>(null);

  const { data: bookmarksData } = useGetManualBookmarksQuery();
  const bookmarkedIds = new Set(
    (bookmarksData?.data ?? []).map((b) => b.manualId).filter((id): id is number => id != null),
  );

  const { data, isPending, isError } = useManualHistoryQuery({
    categoryCode: selectedCategory || undefined,
    page,
    size: PAGE_SIZE,
  });

  const { data: rawCategories = [] } = useGetCategoriesQuery();
  const categoryOptions: CategoryOption[] = rawCategories
    .filter((c) => c.categoryCode)
    .map((c) => ({
      code:  c.categoryCode!,
      label: c.smallCategory ?? c.mediumCategory ?? c.largeCategory ?? c.categoryCode!,
    }));

  const items         = data?.content ?? [];
  const totalPages    = data?.totalPages ?? 1;
  const totalElements = data?.totalElements ?? 0;

  function handleCategoryChange(code: string) {
    setSelectedCategory(code);
    setPage(0);
    setSelectedManual(null);
  }

  return (
    <>
    <main className={layout.main}>
      <div className={s.pageWrapper}>
        <div className={s.pageHeader}>
          <div className={s.headerBadge}>📖 MANUAL</div>
          <h1 className={s.headerTitle}>매뉴얼</h1>
          <p className={s.headerSubtitle}>상담 업무에 참고할 매뉴얼을 확인하세요</p>
        </div>

        <div className={s.content}>
          {/* ─── 필터 ─── */}
          <div className={s.filterBar}>
            <div className={s.filterGroup}>
              <label className={s.filterLabel}>카테고리</label>
              <CategoryAutocomplete
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
            </div>
            <span className={s.totalCount}>총 {totalElements.toLocaleString()}건</span>
          </div>

          {/* ─── 목록 ─── */}
          {isPending && <p className={s.stateText}>불러오는 중...</p>}
          {isError   && <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>}
          {!isPending && !isError && items.length === 0 && (
            <p className={s.stateText}>등록된 매뉴얼이 없습니다.</p>
          )}
          {!isPending && !isError && items.length > 0 && (
            <div className={s.list}>
              {items.map((item) => {
                const id     = item.manualId ?? 0;
                return (
                  <div key={id} className={s.card}>
                    <button
                      type="button"
                      className={s.cardHeader}
                      onClick={() => setSelectedManual(item)}
                    >
                      <BookmarkToggle manualId={id} bookmarkedIds={bookmarkedIds} />
                      <div className={s.cardHeaderLeft}>
                        {item.categoryName && (
                          <span className={s.categoryPill}>{item.categoryName}</span>
                        )}
                        <span className={s.cardTitle}>{item.title ?? "(제목 없음)"}</span>
                      </div>
                      <div className={s.cardHeaderRight}>
                        {item.updatedAt && (
                          <span className={s.dateText}>{item.updatedAt.slice(0, 10)}</span>
                        )}
                        <span className={s.chevron}>›</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── 페이지네이션 ─── */}
          {!isPending && !isError && totalPages > 1 && (
            <div className={s.pagination}>
              <button type="button" className={s.pageBtn} disabled={page === 0}
                onClick={() => { setPage(0); setSelectedManual(null); }}>«</button>
              <button type="button" className={s.pageBtn} disabled={page === 0}
                onClick={() => { setPage(p => p - 1); setSelectedManual(null); }}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
                <button key={p} type="button"
                  className={p === page ? s.pageBtnActive : s.pageBtn}
                  onClick={() => { setPage(p); setSelectedManual(null); }}>
                  {p + 1}
                </button>
              ))}
              <button type="button" className={s.pageBtn} disabled={page === totalPages - 1}
                onClick={() => { setPage(p => p + 1); setSelectedManual(null); }}>›</button>
              <button type="button" className={s.pageBtn} disabled={page === totalPages - 1}
                onClick={() => { setPage(totalPages - 1); setSelectedManual(null); }}>»</button>
            </div>
          )}
        </div>
      </div>
    </main>

    {selectedManual != null && (
      <ManualDetailModal manual={selectedManual} onClose={() => setSelectedManual(null)} />
    )}
    </>
  );
}
