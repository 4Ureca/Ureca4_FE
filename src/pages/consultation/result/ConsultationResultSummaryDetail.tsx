import { useGetSummaryDetailQuery } from "../../../shared/api/generated/summary-controller";
import * as s from "./ConsultationResultPage.css";

interface Props {
  consultId: number;
  onClose: () => void;
}

export function ConsultationResultSummaryDetail({ consultId, onClose }: Props) {
  const { data, isPending, isError } = useGetSummaryDetailQuery(consultId);

  return (
    <div className={s.summaryDetailCard}>
      <div className={s.summaryDetailHeader}>
        <div className={s.cardTitleRow}>
          <h2 className={s.cardTitle}>상담 요약 상세</h2>
          <span className={s.manualPanelCategory}>#{consultId}</span>
        </div>
        <button type="button" className={s.manualPanelCloseBtn} onClick={onClose}>
          닫기
        </button>
      </div>

      <div className={s.bookmarkDetailBody}>
        {isPending && <p className={s.manualPanelState}>불러오는 중...</p>}
        {isError   && <p className={s.manualPanelState}>불러오지 못했습니다.</p>}
        {!isPending && !isError && data && (
          <>
            {data.consultedAt && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>상담일시</p>
                <p className={s.bookmarkDetailValue}>{data.consultedAt.slice(0, 10)}</p>
              </div>
            )}
            {data.customer?.name && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>고객명</p>
                <p className={s.bookmarkDetailValue}>{data.customer.name}</p>
              </div>
            )}
            {data.channel && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>채널</p>
                <p className={s.bookmarkDetailValue}>{data.channel}</p>
              </div>
            )}
            {data.category?.small && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>카테고리</p>
                <p className={s.bookmarkDetailValue}>{data.category.small}</p>
              </div>
            )}
            {data.summary?.content && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>요약</p>
                <p className={s.bookmarkDetailValue}>{data.summary.content}</p>
              </div>
            )}
            {data.iam?.issue && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>이슈</p>
                <p className={s.bookmarkDetailValue}>{data.iam.issue}</p>
              </div>
            )}
            {data.iam?.action && (
              <div className={s.bookmarkDetailFieldCard}>
                <p className={s.bookmarkDetailLabel}>처리 내용</p>
                <p className={s.bookmarkDetailValue}>{data.iam.action}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
