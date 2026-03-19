import type { NoticeSummary } from "../../../shared/api/generated/api.schemas";
import * as s from "./NoticePage.css";

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
  DRAFT:     { label: "초안", bg: "#F3F4F6", color: "#374151" },
  SCHEDULED: { label: "예약", bg: "#EFF6FF", color: "#1E40AF" },
  ACTIVE:    { label: "활성", bg: "#ECFDF5", color: "#065F46" },
  ARCHIVED:  { label: "보관", bg: "#FEF3C7", color: "#92400E" },
  DELETED:   { label: "삭제", bg: "#FEE2E2", color: "#991B1B" },
};

const TYPE_MAP: Record<string, { label: string; bg: string; color: string }> = {
  GENERAL: { label: "일반",   bg: "#F3F4F6", color: "#374151" },
  URGENT:  { label: "긴급",   bg: "#FEE2E2", color: "#991B1B" },
  SYSTEM:  { label: "시스템", bg: "#EFF6FF", color: "#1E40AF" },
  POLICY:  { label: "정책",   bg: "#F5F3FF", color: "#5B21B6" },
  EVENT:   { label: "이벤트", bg: "#ECFDF5", color: "#065F46" },
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

interface Props {
  items: NoticeSummary[];
  onRowClick: (noticeId: number) => void;
  isAdmin?: boolean;
  myName?: string;
  onEdit?: (noticeId: number) => void;
  onDelete?: (noticeId: number) => void;
}

export function NoticeTable({ items, onRowClick, isAdmin, myName, onEdit, onDelete }: Props) {
  return (
    <div className={s.tableCard}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.th} style={{ width: "60px" }}>번호</th>
            <th className={s.th}>제목</th>
            <th className={s.th} style={{ width: "80px" }}>유형</th>
            <th className={s.th} style={{ width: "80px" }}>상태</th>
            <th className={s.th} style={{ width: "100px" }}>작성자</th>
            <th className={s.th} style={{ width: "70px" }}>조회수</th>
            <th className={s.th} style={{ width: "110px" }}>작성일</th>
            {isAdmin && myName && <th className={s.th} style={{ width: "80px", textAlign: "center" }}>관리</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const typeStyle   = TYPE_MAP[item.noticeType ?? ""]   ?? TYPE_MAP.GENERAL;
            const statusStyle = STATUS_MAP[item.status ?? ""] ?? STATUS_MAP.DRAFT;
            return (
              <tr
                key={item.noticeId}
                className={s.tr}
                onClick={() => item.noticeId != null && onRowClick(item.noticeId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && item.noticeId != null && onRowClick(item.noticeId)}
              >
                <td className={s.tdSecondary}>{item.noticeId}</td>
                <td className={s.td}>
                  <div className={s.titleCell}>
                    {item.isPinned && <span className={s.pinIcon}>📌</span>}
                    <span className={s.titleText}>{item.title ?? "-"}</span>
                    {item.isNew && <span className={s.newBadge}>NEW</span>}
                  </div>
                </td>
                <td className={s.td}>
                  <span className={s.typeBadge} style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}>
                    {typeStyle.label}
                  </span>
                </td>
                <td className={s.td}>
                  <span className={s.typeBadge} style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                    {statusStyle.label}
                  </span>
                </td>
                <td className={s.tdSecondary}>{item.authorName ?? "-"}</td>
                <td className={s.tdSecondary}>{(item.viewCount ?? 0).toLocaleString()}</td>
                <td className={s.tdDate}>{formatDate(item.createdAt)}</td>
                {isAdmin && myName && (
                  <td className={s.td} style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                    {item.authorName === myName && (
                      <div style={{ display: "inline-flex", gap: "2px" }}>
                        <button type="button" className={s.actionBtn}
                          onClick={() => item.noticeId != null && onEdit?.(item.noticeId)}>
                          <EditIcon />
                        </button>
                        <button type="button" className={s.actionBtnDanger}
                          onClick={() => item.noticeId != null && onDelete?.(item.noticeId)}>
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
