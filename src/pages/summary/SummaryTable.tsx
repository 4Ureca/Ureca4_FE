import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { ConsultationSummaryDto } from "../../shared/api/generated/api.schemas";
import {
  useGetConsultationBookmarksQuery,
  useMutationDeleteConsultationBookmarkQuery,
  useMutationPostConsultationBookmarkQuery,
} from "../../shared/api/generated/bookmark";
import { getConsultationBookmarksKey } from "../../shared/api/generated/bookmark/bookmark.keys";
import { getRole } from "../../shared/api/roleStore";
import * as s from "./SummaryPage.css";

const CHANNEL_LABEL: Record<string, string> = {
  CALL:     "CALL",
  CHATTING: "CHATTING",
};

const CHANNEL_BADGE: Record<string, keyof typeof s.badgeVariant> = {
  CALL:     "blue",
  CHATTING: "purple",
};

function formatDate(raw?: string) {
  if (!raw) return "–";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}시 ${String(d.getMinutes()).padStart(2, "0")}분`;
}

interface BookmarkCellProps {
  consultId: number;
  bookmarkedIds: Set<number>;
}

function BookmarkCell({ consultId, bookmarkedIds }: BookmarkCellProps) {
  const qc = useQueryClient();
  const { mutate: addBookmark,    isPending: isAdding   } = useMutationPostConsultationBookmarkQuery();
  const { mutate: removeBookmark, isPending: isRemoving } = useMutationDeleteConsultationBookmarkQuery();
  const [optimistic, setOptimistic] = useState<boolean | null>(null);

  const isBookmarked = optimistic !== null ? optimistic : bookmarkedIds.has(consultId);
  const isPending = isAdding || isRemoving;

  const handleToggle = () => {
    const next = !isBookmarked;
    setOptimistic(next);
    const onSuccess = () => {
      qc.invalidateQueries({ queryKey: getConsultationBookmarksKey() });
      setOptimistic(null);
    };
    const onError = () => setOptimistic(null);
    if (next) {
      addBookmark({ consultId }, { onSuccess, onError });
    } else {
      removeBookmark({ consultId }, { onSuccess, onError });
    }
  };

  return (
    <button
      type="button"
      className={s.bookmarkBtn}
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      title={isBookmarked ? "북마크 해제" : "북마크 추가"}
      style={isBookmarked ? { color: "#F59E0B" } : undefined}
    >
      <svg
        width="15" height="15" viewBox="0 0 24 24"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

interface Props {
  items: ConsultationSummaryDto[];
  onDetail: (consultId: number) => void;
}

export function SummaryTable({ items, onDetail }: Props) {
  const isCounselor = getRole() === "상담사";
  const { data: bookmarksData } = useGetConsultationBookmarksQuery({
    query: { enabled: isCounselor },
  });

  const bookmarkedIds = new Set(
    (bookmarksData?.data ?? []).map((b) => b.consultId).filter((id): id is number => id != null),
  );

  if (items.length === 0) {
    return (
      <div className={s.tableWrapper}>
        <p className={s.stateText}>요약 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            {isCounselor && <th className={s.th} style={{ width: 32 }} />}
            <th className={s.th}>상담번호</th>
            <th className={s.th}>고객명</th>
            <th className={s.th}>채널</th>
            <th className={s.th}>카테고리</th>
            <th className={s.th}>요약 미리보기</th>
            <th className={s.th}>상담사</th>
            <th className={s.th}>상담일시</th>
            <th className={s.th}>상세</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.consultId} className={s.tr}>
              {isCounselor && item.consultId != null && (
                <td className={s.td} style={{ padding: "0 4px" }}>
                  <BookmarkCell consultId={item.consultId} bookmarkedIds={bookmarkedIds} />
                </td>
              )}
              <td className={s.td}>#{item.consultId ?? "–"}</td>
              <td className={s.td}>{item.customerName ?? "–"}</td>
              <td className={s.td}>
                {item.channel
                  ? <span className={s.badgeVariant[CHANNEL_BADGE[item.channel] ?? "gray"]}>{CHANNEL_LABEL[item.channel] ?? item.channel}</span>
                  : "–"}
              </td>
              <td className={s.td}>
                {[item.categoryLarge, item.categoryMedium].filter(Boolean).join(" / ") || "–"}
              </td>
              <td className={s.tdEllipsis}>{item.summaryContent ?? "–"}</td>
              <td className={s.td}>{item.agentName ?? "–"}</td>
              <td className={s.td}>{formatDate(item.consultedAt)}</td>
              <td className={s.td}>
                <button
                  type="button"
                  className={s.actionBtnDetail}
                  onClick={() => item.consultId != null && onDetail(item.consultId)}
                >
                  상세
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
