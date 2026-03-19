import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useGetConsultationBookmarkDetailQuery,
  useGetConsultationBookmarksQuery,
  useMutationDeleteConsultationBookmarkQuery,
} from "../../shared/api/generated/bookmark";
import { getConsultationBookmarksKey } from "../../shared/api/generated/bookmark/bookmark.keys";
import * as layout from "../../shared/ui/pageLayout.css";
import * as s from "./MyBookmarksPage.css";

function formatDate(raw?: string) {
  if (!raw) return "–";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

/* ─── 상세 패널 ─── */

function DetailPanel({ consultId, onBack }: { consultId: number; onBack: () => void }) {
  const { data, isPending, isError } = useGetConsultationBookmarkDetailQuery(consultId);

  return (
    <>
      <button type="button" className={s.backBtn} onClick={onBack}>← 목록으로</button>

      {isPending && <p className={s.stateText}>불러오는 중...</p>}
      {isError   && <p className={s.stateText}>불러오지 못했습니다.</p>}

      {data?.data && (
        <div className={s.detailPanel}>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>상담번호</span>
            <span className={s.detailValue}>#{data.data.consultId ?? "–"}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>상담일시</span>
            <span className={s.detailValue}>{formatDate(data.data.consultationCreatedAt)}</span>
          </div>
          <div className={s.detailRow}>
            <span className={s.detailLabel}>북마크일시</span>
            <span className={s.detailValue}>{formatDate(data.data.bookmarkedAt)}</span>
          </div>

          {data.data.summary && (
            <div>
              <p className={s.sectionTitle}>요약</p>
              <div className={s.summaryBox}>{data.data.summary}</div>
            </div>
          )}

          {data.data.result && (
            <div>
              <p className={s.sectionTitle}>상담 결과</p>
              <div className={s.resultBox}>{data.data.result}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ─── 목록 ─── */

function BookmarkList({ onDetail }: { onDetail: (consultId: number) => void }) {
  const qc = useQueryClient();
  const { data, isPending, isError } = useGetConsultationBookmarksQuery();
  const { mutate: deleteBookmark, isPending: isDeleting } = useMutationDeleteConsultationBookmarkQuery();

  const items = data?.data ?? [];

  const handleDelete = (consultId: number) => {
    if (!confirm("북마크를 삭제하시겠습니까?")) return;
    deleteBookmark(
      { consultId },
      { onSuccess: () => qc.invalidateQueries({ queryKey: getConsultationBookmarksKey() }) },
    );
  };

  if (isPending)          return <p className={s.stateText}>불러오는 중...</p>;
  if (isError)            return <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>;
  if (items.length === 0) return <p className={s.stateText}>북마크한 상담 요약이 없습니다.</p>;

  return (
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.th}>상담번호</th>
            <th className={s.th}>북마크 등록일</th>
            <th className={s.th}>작업</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.bookmarkId} className={s.tr}>
              <td className={s.td}>#{item.consultId ?? "–"}</td>
              <td className={s.td}>{formatDate(item.createdAt)}</td>
              <td className={s.td}>
                <div className={s.btnGroup}>
                  <button
                    type="button"
                    className={s.actionBtn}
                    onClick={() => item.consultId != null && onDetail(item.consultId)}
                  >
                    상세보기
                  </button>
                  <button
                    type="button"
                    className={s.deleteBtn}
                    onClick={() => item.consultId != null && handleDelete(item.consultId)}
                    disabled={isDeleting}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── 페이지 ─── */

export function MyBookmarksPage() {
  const [detailConsultId, setDetailConsultId] = useState<number | null>(null);

  return (
    <main className={layout.main}>
      <div className={s.pageWrapper}>
        <div className={s.header}>
          <h1 className={s.title}>내 북마크</h1>
          <p className={s.subtitle}>내가 북마크한 상담 요약 목록</p>
        </div>

        <div className={s.content}>
          {detailConsultId != null ? (
            <DetailPanel consultId={detailConsultId} onBack={() => setDetailConsultId(null)} />
          ) : (
            <BookmarkList onDetail={setDetailConsultId} />
          )}
        </div>
      </div>
    </main>
  );
}
