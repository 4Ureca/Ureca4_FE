import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { useGetCandidatesQuery, useMutationPatchRejectExcellentCaseQuery } from "../../../shared/api/generated/admin-excellent-case";
import {
  useGetAgentsQuery,
  useGetCategoriesQuery,
} from "../../../shared/api/generated/meta-controller";
import {
  EvaluationListResponseSelectionStatus,
  GetCandidatesDirection,
  GetCandidatesStatus,
  type EvaluationListResponse,
} from "../../../shared/api/generated/api.schemas";
import * as layout from "../../../shared/ui/pageLayout.css";
import { DashboardSidebar } from "../../../widgets/DashboardSidebar/DashboardSidebar";
import { AdminExcellentCaseDetailModal } from "./AdminExcellentCaseDetailModal";
import * as s from "./AdminExcellentCasesPage.css";

type FilterStatus = "ALL" | "PENDING" | "SELECTED" | "REJECTED";

// 선정 모달 열 때 초기 탭을 select 모드로 고정하기 위한 prop
interface DetailModalState {
  consultId: number;
  openSelectMode: boolean;
}

function getScoreBadgeStyle(score?: number): React.CSSProperties {
  if (!score || score < 50)
    return { background: "#F1F5F9", color: "#94A3B8", boxShadow: "none" };
  if (score < 60)
    return { background: "linear-gradient(135deg, #E0F2FE, #BAE6FD)", color: "#0369A1", boxShadow: "none" };
  if (score < 70)
    return { background: "linear-gradient(135deg, #0EA5E9, #0284C7)", color: "#FFFFFF", boxShadow: "0 1px 6px rgba(2,132,199,0.3)" };
  if (score < 80)
    return { background: "linear-gradient(135deg, #06B6D4, #0891B2)", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(8,145,178,0.35)" };
  if (score < 90)
    return { background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#FFFFFF", boxShadow: "0 2px 10px rgba(217,119,6,0.4)" };
  return { background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#FFFFFF", boxShadow: "0 3px 14px rgba(234,88,12,0.55)", fontWeight: 800 };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return iso.slice(0, 10).replace(/-/g, ".");
}

function extractSituationTitle(title?: string): string {
  if (!title) return "제목 없음";
  const match = title.match(/\[상황\]\s*([\s\S]*?)(?:\s*(?:→|->))/);
  if (match) return match[1].trim();
  return title;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "후보군",
  SELECTED: "이달의 사례로 게시중",
  REJECTED: "후보군 제외",
};

const STATUS_BADGE_STYLE: Record<string, React.CSSProperties> = {
  PENDING: { backgroundColor: "#FEF3C7", color: "#92400E" },
  SELECTED: { backgroundColor: "#DCFCE7", color: "#166534" },
  REJECTED: { backgroundColor: "#FEF2F2", color: "#991B1B" },
};

interface RowProps {
  item: EvaluationListResponse;
  onRowClick: () => void;
  onSelectClick: () => void;
  onRejectClick: (e: React.MouseEvent) => void;
  isRejecting: boolean;
}

function CandidateRow({ item, onRowClick, onSelectClick, onRejectClick, isRejecting }: RowProps) {
  const status = item.selectionStatus ?? EvaluationListResponseSelectionStatus.PENDING;

  // 🥊 90점 이상인 경우에만 선정 버튼 노출 (PENDING 또는 REJECTED 상태일 때)
  const canSelect = (status === EvaluationListResponseSelectionStatus.PENDING
    || status === EvaluationListResponseSelectionStatus.REJECTED)
    && (item.score ?? 0) >= 90;
    
  const canReject = status === EvaluationListResponseSelectionStatus.PENDING
    || status === EvaluationListResponseSelectionStatus.SELECTED;

  return (
    <tr onClick={onRowClick} className={s.tr}>
      <td className={s.td}>
        <span className={s.categoryPill}>{item.categoryName ?? "기타"}</span>
      </td>
      <td className={s.td}>
        <div className={s.titleCell}>
          <div className={s.titleText}>
            {extractSituationTitle(item.title)}
          </div>
        </div>
      </td>
      <td className={s.td}>
        <span style={{ fontSize: "13px", color: "#374151" }}>{item.counselorName ?? "-"}</span>
      </td>
      <td className={s.tdCenter}>
        <div
          className={s.scoreBadge}
          style={{ ...getScoreBadgeStyle(item.score), margin: "0 auto" }}
        >
          {item.score ?? "-"}
        </div>
      </td>
      <td className={s.td}>
        <span style={{
          display: "inline-flex",
          padding: "3px 8px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 600,
          ...STATUS_BADGE_STYLE[status],
        }}>
          {STATUS_LABEL[status]}
        </span>
      </td>
      <td className={s.td}>
        <span className={s.dateText}>{formatDate(item.createdAt)}</span>
      </td>
      <td className={s.tdCenter} onClick={(e) => e.stopPropagation()}>
        <div className={s.actionCell}>
          {canSelect && (
            <button
              type="button"
              className={s.btnSelect}
              onClick={(e) => { e.stopPropagation(); onSelectClick(); }}
            >
              선정
            </button>
          )}
          {canReject && (
            <button
              type="button"
              className={s.btnReject}
              disabled={isRejecting}
              onClick={onRejectClick}
            >
              {isRejecting ? "처리중" : "제외"}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function getCurrentISOWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
  return { year: d.getFullYear(), week };
}

export function AdminExcellentCasesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState<typeof GetCandidatesDirection[keyof typeof GetCandidatesDirection]>(GetCandidatesDirection.desc);
  const [modalState, setModalState] = useState<DetailModalState | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [yearWeek, setYearWeek] = useState(getCurrentISOWeek);

  // 🥊 [수정 포인트] 필터 변경 시 동작 정의
  useEffect(() => {
    setPage(1);
    // 후보군 제외 탭을 클릭했을 때만 기본을 '점수순(score)' & '내림차순(desc)'으로 설정
    if (activeFilter === "REJECTED") {
      setSortBy("score");
      setDirection(GetCandidatesDirection.desc);
    } else {
      // 다른 탭으로 돌아올 때는 최신순으로 복구 (원치 않으시면 이 else문은 지우셔도 됩니다)
      setSortBy("");
      setDirection(GetCandidatesDirection.desc);
    }
  }, [activeFilter]);

  // 페이지 외의 정렬 값이 바뀌었을 때 페이지만 초기화
  useEffect(() => { setPage(1); }, [sortBy, direction, yearWeek]);

  const queryClient = useQueryClient();

  const statusParam = activeFilter === "ALL" ? GetCandidatesStatus.ALL :
    activeFilter === "PENDING" ? GetCandidatesStatus.PENDING :
    activeFilter === "SELECTED" ? GetCandidatesStatus.SELECTED :
    GetCandidatesStatus.REJECTED;

  function navigateWeek(delta: number) {
    setYearWeek(prev => {
      const d = new Date(prev.year, 0, 1 + (prev.week - 1) * 7);
      d.setDate(d.getDate() + delta * 7);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const yearStart = new Date(d.getFullYear(), 0, 1);
      const w = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
      return { year: d.getFullYear(), week: w };
    });
  }

  const hasClientFilter = !!(keyword.trim() || categoryFilter || agentFilter);
  const PAGE_SIZE = 20;

  // ─── API 호출 ───
  const { data, isPending, isError } = useGetCandidatesQuery({
    status: statusParam,
    sortBy: sortBy || undefined,
    direction,
    size: hasClientFilter ? 9999 : PAGE_SIZE,
    page: hasClientFilter ? 0 : page - 1,
    year: yearWeek.year,
    week: yearWeek.week,
  });

  const { data: countAll } = useGetCandidatesQuery({ status: GetCandidatesStatus.ALL, size: 1, page: 0, year: yearWeek.year, week: yearWeek.week });
  const { data: countPending } = useGetCandidatesQuery({ status: GetCandidatesStatus.PENDING, size: 1, page: 0, year: yearWeek.year, week: yearWeek.week });
  const { data: countSelected } = useGetCandidatesQuery({ status: GetCandidatesStatus.SELECTED, size: 1, page: 0, year: yearWeek.year, week: yearWeek.week });
  const { data: countRejected } = useGetCandidatesQuery({ status: GetCandidatesStatus.REJECTED, size: 1, page: 0, year: yearWeek.year, week: yearWeek.week });
  
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: agentData } = useGetAgentsQuery();

  const forceGlobalApiRefetch = async (message: string) => {
    await queryClient.resetQueries({ queryKey: ["admin-excellent-case"] });
    await queryClient.resetQueries({ queryKey: ["/admin/excellent-cases/candidates"] });
    await queryClient.refetchQueries({ type: "active" });
    alert(message);
    setRejectingId(null);
  };

  const rejectMutation = useMutationPatchRejectExcellentCaseQuery({
    mutation: {
      onSuccess: () => forceGlobalApiRefetch("후보군에서 제외되었습니다."),
      onError: (error: any) => {
        if (error.response?.status === 200 || error.name === 'SyntaxError') {
          forceGlobalApiRefetch("후보군에서 제외되었습니다.");
        } else {
          alert("제외 처리 중 오류가 발생했습니다.");
          setRejectingId(null);
        }
      },
    },
  });

  const allItems = data?.content ?? [];
  const uniqueSmallCategories = Array.from(new Map((categoryData ?? []).filter(c => c.smallCategory).map(c => [c.smallCategory, c])).values());
  const agents = agentData ?? [];

  const filteredItems = allItems
    .filter(i => categoryFilter ? i.categoryName === categoryFilter : true)
    .filter(i => agentFilter ? i.counselorName === agentFilter : true)
    .filter(i => {
      if (!keyword.trim()) return true;
      const kw = keyword.trim().toLowerCase();
      return (i.title?.toLowerCase().includes(kw) ?? false) || (i.counselorName?.toLowerCase().includes(kw) ?? false);
    });

  const totalPages = hasClientFilter ? Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE)) : (data?.totalPages ?? 1);
  const pagedItems = hasClientFilter ? filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : filteredItems;

  const STAT_BOXES: { key: FilterStatus; label: string; count: number; countColor: string; boxClass: string; }[] = [
    { key: "ALL", label: "전체 사례", count: countAll?.totalElements ?? 0, countColor: "#0F172A", boxClass: s.statBoxAll },
    { key: "PENDING", label: "AI선정 후보군", count: countPending?.totalElements ?? 0, countColor: "#D97706", boxClass: s.statBoxPending },
    { key: "SELECTED", label: "이달의 사례로 게시중", count: countSelected?.totalElements ?? 0, countColor: "#059669", boxClass: s.statBoxSelected },
    { key: "REJECTED", label: "후보군 제외", count: countRejected?.totalElements ?? 0, countColor: "#DC2626", boxClass: s.statBoxRejected },
  ];

  function handleReject(e: React.MouseEvent, consultId: number) {
    e.stopPropagation();
    if (window.confirm("선택한 사례를 정말 후보군에서 제외하시겠습니까?")) {
      setRejectingId(consultId);
      rejectMutation.mutate({ consultId });
    }
  }

  return (
    <>
      <DashboardSidebar isAdmin />

      <main className={layout.main}>
        <div className={s.pageWrapper}>
        <div className={s.pageHeader}>
          <div className={s.headerTop}>
            <div>
              <div className={s.headerBadge}>⭐ ADMIN · EXCELLENT CASES</div>
              <h1 className={s.headerTitle}>우수 상담사례 후보군 관리</h1>
              <p className={s.headerSubtitle}>AI가 선별한 후보 사례를 검토하고 최종 선정 또는 제외하세요</p>
            </div>
            <div className={s.weekNav}>
              <button type="button" className={s.weekNavBtn} onClick={() => navigateWeek(-1)}>‹</button>
              <span className={s.weekLabel}>{yearWeek.year}년 {yearWeek.week}주차</span>
              <button type="button" className={s.weekNavBtn} onClick={() => navigateWeek(1)}>›</button>
            </div>
          </div>
        </div>

        <div className={s.content}>
          <div className={s.statBoxGrid}>
            {STAT_BOXES.map(({ key, label, count, countColor, boxClass }) => (
              <button
                key={key}
                type="button"
                className={boxClass}
                data-active={String(activeFilter === key)}
                onClick={() => setActiveFilter(key)}
              >
                <div className={s.statBoxCount} style={{ color: countColor }}>
                  {isPending ? "-" : count}
                </div>
                <div className={s.statBoxLabel}>{label}</div>
              </button>
            ))}
          </div>

          <div className={s.toolbar}>
            <div className={s.toolbarLeft}>
              <div className={s.searchWrap}>
                <svg className={s.searchIcon} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className={s.searchInput}
                  placeholder="제목 검색..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <Select
                options={uniqueSmallCategories.map((c) => ({ value: c.smallCategory ?? "", label: c.smallCategory ?? "" }))}
                value={categoryFilter ? { value: categoryFilter, label: categoryFilter } : null}
                onChange={(opt) => { setCategoryFilter(opt?.value ?? ""); setPage(1); }}
                isClearable
                placeholder="카테고리 검색..."
                noOptionsMessage={() => "검색 결과 없음"}
                styles={{
                  container: (base) => ({ ...base, minWidth: 180 }),
                  control: (base, state) => ({
                    ...base,
                    minHeight: 36,
                    height: 36,
                    borderColor: state.isFocused ? "#E1006A" : "#D1D5DB",
                    borderRadius: "8px",
                    boxShadow: "none",
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                    cursor: "text",
                    ":hover": { borderColor: state.isFocused ? "#E1006A" : "#D1D5DB" },
                  }),
                  valueContainer: (base) => ({ ...base, padding: "0 8px" }),
                  input: (base) => ({ ...base, margin: 0, padding: 0, color: "#111827" }),
                  placeholder: (base) => ({ ...base, color: "#6B7280", fontSize: "14px" }),
                  singleValue: (base) => ({ ...base, color: "#374151", fontSize: "14px" }),
                  menu: (base) => ({ ...base, borderRadius: "8px", border: "1px solid #D1D5DB", boxShadow: "0 4px 6px rgba(0,0,0,0.07)", zIndex: 50 }),
                  option: (base, state) => ({ 
                    ...base, fontSize: "14px", cursor: "pointer",
                    backgroundColor: state.isSelected ? "#E1006A" : state.isFocused ? "#F9FAFB" : "#FFFFFF",
                    color: state.isSelected ? "#FFFFFF" : "#111827"
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  dropdownIndicator: (base) => ({ ...base, padding: "0 6px", color: "#6B7280" }),
                  clearIndicator: (base) => ({ ...base, padding: "0 4px", color: "#6B7280" }),
                }}
              />

              <Select
                options={agents.map((a) => ({ value: a.name ?? "", label: a.name ?? "" }))}
                value={agentFilter ? { value: agentFilter, label: agentFilter } : null}
                onChange={(opt) => { setAgentFilter(opt?.value ?? ""); setPage(1); }}
                isClearable
                placeholder="상담사 검색..."
                noOptionsMessage={() => "검색 결과 없음"}
                styles={{
                  container: (base) => ({ ...base, minWidth: 180 }),
                  control: (base, state) => ({
                    ...base,
                    minHeight: 36,
                    height: 36,
                    borderColor: state.isFocused ? "#E1006A" : "#D1D5DB",
                    borderRadius: "8px",
                    boxShadow: "none",
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                    cursor: "text",
                    ":hover": { borderColor: state.isFocused ? "#E1006A" : "#D1D5DB" },
                  }),
                  valueContainer: (base) => ({ ...base, padding: "0 8px" }),
                  input: (base) => ({ ...base, margin: 0, padding: 0, color: "#111827" }),
                  placeholder: (base) => ({ ...base, color: "#6B7280", fontSize: "14px" }),
                  singleValue: (base) => ({ ...base, color: "#374151", fontSize: "14px" }),
                  menu: (base) => ({ ...base, borderRadius: "8px", border: "1px solid #D1D5DB", boxShadow: "0 4px 6px rgba(0,0,0,0.07)", zIndex: 50 }),
                  option: (base, state) => ({ 
                    ...base, fontSize: "14px", cursor: "pointer",
                    backgroundColor: state.isSelected ? "#E1006A" : state.isFocused ? "#F9FAFB" : "#FFFFFF",
                    color: state.isSelected ? "#FFFFFF" : "#111827"
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  dropdownIndicator: (base) => ({ ...base, padding: "0 6px", color: "#6B7280" }),
                  clearIndicator: (base) => ({ ...base, padding: "0 4px", color: "#6B7280" }),
                }}
              />
            </div>

            <div className={s.toolbarRight}>
              <select className={s.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">최신순</option>
                <option value="score">점수순</option>
              </select>
              <select
                className={s.filterSelect}
                value={direction}
                onChange={(e) => setDirection(e.target.value as any)}
              >
                <option value={GetCandidatesDirection.desc}>내림차순</option>
                <option value={GetCandidatesDirection.asc}>오름차순</option>
              </select>
            </div>
          </div>

          {/* ─── Table ─── */}
          {isPending && <p className={s.stateText}>불러오는 중...</p>}
          {isError && <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>}

          {!isPending && !isError && (
            <div className={s.tableWrap}>
              <div className={s.tableScroll}>
                <table className={s.table}>
                  <thead className={s.thead}>
                    <tr>
                      <th className={s.th}>카테고리</th>
                      <th className={s.th}>제목</th>
                      <th className={s.th}>상담사</th>
                      <th className={s.thCenter}>AI 점수</th>
                      <th className={s.th}>상태</th>
                      <th className={s.th}>등록일</th>
                      <th className={s.thCenter}>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.length === 0 ? (
                      <tr><td className={s.td} colSpan={7} style={{ textAlign: "center", padding: "48px 0", color: "#94A3B8" }}>해당 조건의 후보 사례가 없습니다.</td></tr>
                    ) : (
                      pagedItems.map((item: EvaluationListResponse) => (
                        <CandidateRow
                          key={item.consultId}
                          item={item}
                          onRowClick={() => item.consultId != null && setModalState({ consultId: item.consultId, openSelectMode: false })}
                          onSelectClick={() => item.consultId != null && setModalState({ consultId: item.consultId, openSelectMode: true })}
                          onRejectClick={(e) => item.consultId != null && handleReject(e, item.consultId)}
                          isRejecting={rejectingId === item.consultId}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className={s.tableFooter}>
                <span className={s.tableFooterText}>전체 {hasClientFilter ? filteredItems.length : (data?.totalElements ?? 0)}건</span>
                {totalPages > 1 && (
                  <div className={s.pagination}>
                    <button type="button" className={s.pageBtn} disabled={page === 1} onClick={() => setPage(1)}>«</button>
                    <button type="button" className={s.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(i => Math.abs(i - page) <= 2)
                      .map(i => (
                        <button key={i} type="button" className={i === page ? s.pageBtnActive : s.pageBtn} onClick={() => setPage(i)}>{i}</button>
                      ))}
                    <button type="button" className={s.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                    <button type="button" className={s.pageBtn} disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </main>

      {modalState != null && (
        <AdminExcellentCaseDetailModal
          consultId={modalState.consultId}
          initialSelectMode={modalState.openSelectMode}
          onClose={() => setModalState(null)}
        />
      )}
    </>
  );
}