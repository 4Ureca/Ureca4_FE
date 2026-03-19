import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useGetConsultationBookmarksQuery,
  useMutationDeleteConsultationBookmarkQuery,
} from "../../shared/api/generated/bookmark";
import { getConsultationBookmarksKey } from "../../shared/api/generated/bookmark/bookmark.keys";
import { useGetConsultationDetailQuery } from "../../shared/api/generated/consultation-detail";
import { BookmarkPagination } from "./BookmarkPagination";
import * as s from "./MyBookmarksPage.css";

const PAGE_SIZE = 10;

const CHANNEL_LABEL: Record<string, string> = { 전화: "CALL", 채팅: "CHATTING", CALL: "CALL", CHATTING: "CHATTING" };
const CHANNEL_BADGE: Record<string, keyof typeof s.badgeVariant> = { CALL: "blue", CHATTING: "green", 전화: "blue", 채팅: "green" };

function formatDate(raw?: string) {
  if (!raw) return "–";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function BookmarkToggle({ consultId, onDelete, isDeleting }: {
  consultId: number; onDelete: (id: number) => void; isDeleting: boolean;
}) {
  return (
    <button type="button" className={s.bookmarkBtn} onClick={() => onDelete(consultId)}
      disabled={isDeleting} title="북마크 해제" style={{ color: "#F59E0B" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

function ConsultRow({ consultId, bookmarkDate, onDetail, onDelete, isDeleting }: {
  consultId: number; bookmarkDate?: string;
  onDetail: (id: number) => void; onDelete: (id: number) => void; isDeleting: boolean;
}) {
  const { data } = useGetConsultationDetailQuery({ consultId });
  const basic = data?.data?.basicInfo;
  const ai = data?.data?.aiAnalysis;

  return (
    <tr className={s.tr}>
      <td className={s.td} style={{ padding: "0 4px" }}>
        <BookmarkToggle consultId={consultId} onDelete={onDelete} isDeleting={isDeleting} />
      </td>
      <td className={s.td}>#{consultId}</td>
      <td className={s.td}>
        {basic?.channel
          ? <span className={s.badgeVariant[CHANNEL_BADGE[basic.channel] ?? "gray"]}>{CHANNEL_LABEL[basic.channel] ?? basic.channel}</span>
          : "–"}
      </td>
      <td className={s.td}>{basic?.consultationType ?? "–"}</td>
      <td className={s.tdEllipsis}>{ai?.rawSummary ?? "–"}</td>
      <td className={s.td}>{basic?.counselorName ?? "–"}</td>
      <td className={s.td}>{formatDate(basic?.consultedAt)}</td>
      <td className={s.td}>{formatDate(bookmarkDate)}</td>
      <td className={s.td}>
        <button type="button" className={s.actionBtn} onClick={() => onDetail(consultId)}>상세</button>
      </td>
    </tr>
  );
}

interface Props { onDetail: (consultId: number) => void; }

export function ConsultBookmarkList({ onDetail }: Props) {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useGetConsultationBookmarksQuery();
  const { mutate: del, isPending: isDeleting } = useMutationDeleteConsultationBookmarkQuery();

  const allItems = data?.data ?? [];
  const total = allItems.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged = allItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (consultId: number) => {
    if (!confirm("북마크를 해제하시겠습니까?")) return;
    del({ consultId }, { onSuccess: () => qc.invalidateQueries({ queryKey: getConsultationBookmarksKey() }) });
  };

  if (isPending)   return <p className={s.stateText}>불러오는 중...</p>;
  if (isError)     return <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>;
  if (total === 0) return <p className={s.stateText}>북마크한 상담 요약이 없습니다.</p>;

  return (
    <>
      <div className={`${s.tableWrapper} ${s.tableAnimate}`}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr>
              <th className={s.th} style={{ width: 32 }} />
              <th className={s.th}>상담번호</th>
              <th className={s.th}>채널</th>
              <th className={s.th}>상담유형</th>
              <th className={s.th}>요약 미리보기</th>
              <th className={s.th}>상담사</th>
              <th className={s.th}>상담일시</th>
              <th className={s.th}>북마크일</th>
              <th className={s.th}>상세</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <ConsultRow key={item.bookmarkId} consultId={item.consultId!}
                bookmarkDate={item.createdAt} onDetail={onDetail}
                onDelete={handleDelete} isDeleting={isDeleting} />
            ))}
          </tbody>
        </table>
      </div>
      <BookmarkPagination currentPage={page} totalPages={totalPages}
        totalElements={total} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </>
  );
}
