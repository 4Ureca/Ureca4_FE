import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "../../../shared/api/client";
import type { ManualResponse } from "../../../shared/api/generated/api.schemas";
import * as s from "./ConsultationResultPage.css";

interface ManualHistoryResult {
  content: ManualResponse[];
  totalElements: number;
}

function useManualPanelQuery(categoryCode?: string) {
  return useQuery({
    queryKey: ["/manuals/history/panel", categoryCode],
    queryFn: ({ signal }) =>
      apiClient<ManualHistoryResult>({
        url: "/manuals/history",
        method: "GET",
        params: {
          ...(categoryCode ? { categoryCode } : {}),
          status: "활성화",
          size: 10,
          page: 0,
        } as Record<string, string | number>,
        signal,
      }),
  });
}

interface Props {
  categoryCode?: string;
  onClose: () => void;
}

export function ConsultationResultManualPanel({ categoryCode, onClose }: Props) {
  const { data, isPending, isError } = useManualPanelQuery(categoryCode);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const items = data?.content ?? [];

  return (
    <div className={s.manualPanelInner}>
      <div className={s.manualPanelHeader}>
        <div className={s.cardTitleRow}>
          <h2 className={s.cardTitle}>관련 매뉴얼</h2>
          {categoryCode && (
            <span className={s.manualPanelCategory}>{categoryCode}</span>
          )}
        </div>
        <button type="button" className={s.manualPanelCloseBtn} onClick={onClose}>
          닫기
        </button>
      </div>

      <div className={s.manualPanelBody}>
        {isPending && <p className={s.manualPanelState}>불러오는 중...</p>}
        {isError   && <p className={s.manualPanelState}>불러오지 못했습니다.</p>}
        {!isPending && !isError && items.length === 0 && (
          <p className={s.manualPanelState}>관련 매뉴얼이 없습니다.</p>
        )}
        {!isPending && !isError && items.length > 0 && (
          <ul className={s.manualPanelList}>
            {items.map((item) => {
              const id     = item.manualId ?? 0;
              const isOpen = expandedId === id;
              return (
                <li key={id} className={s.manualPanelItem}>
                  <button
                    type="button"
                    className={s.manualPanelItemHeader}
                    onClick={() => setExpandedId(isOpen ? null : id)}
                  >
                    <span className={s.manualPanelItemTitle}>
                      {item.title ?? "(제목 없음)"}
                    </span>
                    <span
                      className={s.manualPanelChevron}
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      ›
                    </span>
                  </button>
                  {isOpen && (
                    <div className={s.manualPanelItemBody}>
                      <p className={s.manualPanelItemContent}>{item.content}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
