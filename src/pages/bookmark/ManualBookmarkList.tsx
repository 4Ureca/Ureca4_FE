import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useGetManualBookmarkDetailQuery,
  useGetManualBookmarksQuery,
  useMutationDeleteManualBookmarkQuery,
} from "../../shared/api/generated/bookmark";
import { getManualBookmarksKey } from "../../shared/api/generated/bookmark/bookmark.keys";
import { BookmarkPagination } from "./BookmarkPagination";
import * as s from "./MyBookmarksPage.css";

const PAGE_SIZE = 10;

function formatDate(raw?: string) {
  if (!raw) return "–";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function BookmarkToggle({ manualId, onDelete, isDeleting }: {
  manualId: number; onDelete: (id: number) => void; isDeleting: boolean;
}) {
  return (
    <button type="button" className={s.bookmarkBtn} onClick={() => onDelete(manualId)}
      disabled={isDeleting} title="북마크 해제" style={{ color: "#F59E0B" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

function ManualRow({ manualId, createdAt, onDetail, onDelete, isDeleting }: {
  manualId: number; createdAt?: string;
  onDetail: (id: number) => void; onDelete: (id: number) => void; isDeleting: boolean;
}) {
  const { data } = useGetManualBookmarkDetailQuery(manualId);
  const detail = data?.data;

  return (
    <tr className={s.tr}>
      <td className={s.td} style={{ padding: "0 4px" }}>
        <BookmarkToggle manualId={manualId} onDelete={onDelete} isDeleting={isDeleting} />
      </td>
      <td className={s.td}>#{manualId}</td>
      <td className={s.tdEllipsis}>{detail?.title ?? "–"}</td>
      <td className={s.td}>
        {detail?.category ? <span className={s.badgeVariant.blue}>{detail.category}</span> : "–"}
      </td>
      <td className={s.td}>
        <span className={s.badgeVariant[detail?.isActive ? "green" : "gray"]}>
          {detail?.isActive ? "활성" : detail ? "비활성" : "–"}
        </span>
      </td>
      <td className={s.td}>{formatDate(createdAt)}</td>
      <td className={s.td}>
        <button type="button" className={s.actionBtn} onClick={() => onDetail(manualId)}>상세</button>
      </td>
    </tr>
  );
}

interface Props { onDetail: (manualId: number) => void; }

export function ManualBookmarkList({ onDetail }: Props) {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useGetManualBookmarksQuery();
  const { mutate: del, isPending: isDeleting } = useMutationDeleteManualBookmarkQuery();

  const allItems = data?.data ?? [];
  const total = allItems.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged = allItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (manualId: number) => {
    if (!confirm("북마크를 해제하시겠습니까?")) return;
    del({ manualId }, { onSuccess: () => qc.invalidateQueries({ queryKey: getManualBookmarksKey() }) });
  };

  if (isPending)   return <p className={s.stateText}>불러오는 중...</p>;
  if (isError)     return <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>;
  if (total === 0) return <p className={s.stateText}>북마크한 매뉴얼이 없습니다.</p>;

  return (
    <>
      <div className={`${s.tableWrapper} ${s.tableAnimate}`}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr>
              <th className={s.th} style={{ width: 32 }} />
              <th className={s.th}>매뉴얼 번호</th>
              <th className={s.th}>제목</th>
              <th className={s.th}>카테고리</th>
              <th className={s.th}>상태</th>
              <th className={s.th}>북마크일</th>
              <th className={s.th}>상세</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <ManualRow key={item.bookmarkId} manualId={item.manualId!}
                createdAt={item.createdAt} onDetail={onDetail}
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
