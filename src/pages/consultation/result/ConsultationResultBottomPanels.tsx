import { useEffect, useMemo, useState } from "react";
import type { ListParams } from "../../../shared/api/generated/api.schemas";
import { useGetConsultationBookmarksQuery } from "../../../shared/api/generated/bookmark";
import { useGetFilterGroupDetailQuery, useGetMyFilterGroupsQuery } from "../../../shared/api/generated/search-filter";
import { useGetSummaryListQuery } from "../../../shared/api/generated/summary-controller";
import * as s from "./ConsultationResultPage.css";

interface Props {
  onSelectBookmark: (consultId: number) => void;
  onSelectSummary: (consultId: number) => void;
  className?: string;
}

/* ─── 저장된 검색조건 ─── */

interface SavedFiltersPanelProps {
  activeFilterId: number | null;
  onFilterSelect: (id: number, name: string) => void;
}

function SavedFiltersPanel({ activeFilterId, onFilterSelect }: SavedFiltersPanelProps) {
  const { data, isPending, isError } = useGetMyFilterGroupsQuery();
  const groups = data ? Object.values(data).flat() : [];

  return (
    <div className={s.bookmarkPanel}>
      <div className={s.bookmarkPanelHeader}>
        <p className={s.bookmarkPanelTitle}>저장된 검색조건</p>
        <span className={s.bookmarkPanelItemMeta}>{groups.length}개</span>
      </div>
      <div className={s.bookmarkPanelBody}>
        {isPending && <p className={s.bookmarkPanelEmpty}>불러오는 중...</p>}
        {isError   && <p className={s.bookmarkPanelEmpty}>불러오지 못했습니다.</p>}
        {!isPending && !isError && groups.length === 0 && (
          <p className={s.bookmarkPanelEmpty}>저장된 검색조건이 없습니다.</p>
        )}
        {groups.map((g) => (
          <button
            key={g.filterGroupId}
            type="button"
            className={s.bookmarkPanelItem}
            onClick={() => g.filterGroupId !== undefined && onFilterSelect(g.filterGroupId, g.groupName ?? "")}
            style={activeFilterId === g.filterGroupId ? { borderColor: "var(--color-primary, #6366f1)", backgroundColor: "#F5F3FF" } : undefined}
          >
            <span className={s.bookmarkPanelItemText}>{g.groupName ?? "이름 없음"}</span>
            <span className={s.bookmarkPanelItemMeta}>{g.filterCount ?? 0}개 조건</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 내 상담 북마크 ─── */

function MyBookmarksPanel({ onSelectBookmark }: { onSelectBookmark: (consultId: number) => void }) {
  const { data, isPending, isError } = useGetConsultationBookmarksQuery();
  const bookmarks = data?.data ?? [];

  return (
    <div className={s.bookmarkPanel}>
      <div className={s.bookmarkPanelHeader}>
        <p className={s.bookmarkPanelTitle}>내 상담 북마크</p>
        <span className={s.bookmarkPanelItemMeta}>{bookmarks.length}개</span>
      </div>
      <div className={s.bookmarkPanelBody}>
        {isPending && <p className={s.bookmarkPanelEmpty}>불러오는 중...</p>}
        {isError   && <p className={s.bookmarkPanelEmpty}>불러오지 못했습니다.</p>}
        {!isPending && !isError && bookmarks.length === 0 && (
          <p className={s.bookmarkPanelEmpty}>북마크된 상담이 없습니다.</p>
        )}
        {bookmarks.map((b) => (
          <button
            key={b.bookmarkId}
            type="button"
            className={s.bookmarkPanelItem}
            onClick={() => b.consultId !== undefined && onSelectBookmark(b.consultId)}
          >
            <span className={s.bookmarkPanelItemText}>상담 #{b.consultId}</span>
            <span className={s.bookmarkPanelItemMeta}>
              {b.createdAt ? b.createdAt.slice(0, 10) : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 상담 요약 검색 ─── */

interface ConsultSearchPanelProps {
  filterParams: ListParams;
  filterName: string;
  onSelectSummary: (consultId: number) => void;
}

function ConsultSearchPanel({ filterParams, filterName, onSelectSummary }: ConsultSearchPanelProps) {
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");

  useEffect(() => {
    if (Object.keys(filterParams).length === 0) {
      setKeyword("");
      setSubmittedKeyword("");
    }
  }, [filterParams]);

  const params: ListParams = { ...filterParams, ...(submittedKeyword ? { keyword: submittedKeyword } : {}), size: 20, page: 0 };
  const { data, isPending, isError } = useGetSummaryListQuery(params);
  const items = data?.content ?? [];

  function handleSearch() {
    setSubmittedKeyword(keyword.trim());
  }

  return (
    <div className={s.bookmarkPanelLarge}>
      <div className={s.bookmarkPanelHeader}>
        <p className={s.bookmarkPanelTitle}>상담 요약 검색</p>
      </div>
      <div className={s.searchRow}>
        <input
          className={s.searchInput}
          placeholder={filterName ? `${filterName} 조건 적용됨` : "고객 이름 입력..."}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button type="button" className={s.searchSubmitBtn} onClick={handleSearch}>
          검색
        </button>
      </div>
      <div className={s.bookmarkPanelBody}>
        {isPending && <p className={s.bookmarkPanelEmpty}>불러오는 중...</p>}
        {isError   && <p className={s.bookmarkPanelEmpty}>불러오지 못했습니다.</p>}
        {!isPending && !isError && items.length === 0 && (
          <p className={s.bookmarkPanelEmpty}>결과가 없습니다.</p>
        )}
        {items.map((item) => (
          <button
            key={item.consultId}
            type="button"
            className={s.bookmarkPanelItem}
            onClick={() => item.consultId !== undefined && onSelectSummary(item.consultId)}
          >
            <span className={s.bookmarkPanelItemText}>#{item.consultId}</span>
            <span className={s.bookmarkPanelItemMeta}>{item.customerName ?? ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 통합 컨테이너 ─── */

export function ConsultationResultBottomPanels({ onSelectBookmark, onSelectSummary, className }: Props) {
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const [filterName, setFilterName]         = useState("");

  const { data: filterDetail } = useGetFilterGroupDetailQuery(activeFilterId ?? 0, {
    query: { enabled: !!activeFilterId },
  });

  const filterParams = useMemo<ListParams>(() => {
    if (!filterDetail?.filters?.length) return {};
    return filterDetail.filters.reduce<Record<string, unknown>>((acc, f) => {
      if (f.filterKey && f.filterValue !== undefined) {
        acc[f.filterKey] = f.filterValue;
      }
      return acc;
    }, {}) as ListParams;
  }, [filterDetail]);

  function handleFilterSelect(id: number, name: string) {
    if (activeFilterId === id) {
      setActiveFilterId(null);
      setFilterName("");
    } else {
      setActiveFilterId(id);
      setFilterName(name);
    }
  }

  return (
    <div className={className ?? s.bookmarkPanelsRow}>
      <ConsultSearchPanel
        filterParams={filterParams}
        filterName={filterName}
        onSelectSummary={onSelectSummary}
      />
      <SavedFiltersPanel
        activeFilterId={activeFilterId}
        onFilterSelect={handleFilterSelect}
      />
      <MyBookmarksPanel onSelectBookmark={onSelectBookmark} />
    </div>
  );
}
