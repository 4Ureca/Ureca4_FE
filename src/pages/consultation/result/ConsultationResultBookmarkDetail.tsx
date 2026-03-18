import { useGetConsultationBookmarkDetailQuery } from "../../../shared/api/generated/bookmark";
import * as s from "./ConsultationResultPage.css";

interface Props {
  consultId: number;
  onClose: () => void;
}

export function ConsultationResultBookmarkDetail({ consultId, onClose }: Props) {
  const { data, isPending, isError } = useGetConsultationBookmarkDetailQuery(consultId);
  const detail = data?.data;

  return (
    <div className={s.bookmarkDetailCard}>
      <div className={s.summaryDetailHeader}>
        <div className={s.cardTitleRow}>
          <h2 className={s.cardTitle}>상담 북마크 상세</h2>
          <span className={s.manualPanelCategory}>#{consultId}</span>
        </div>
        <button type="button" className={s.manualPanelCloseBtn} onClick={onClose}>
          닫기
        </button>
      </div>

      <div className={s.bookmarkDetailBody}>
        {isPending && <p className={s.manualPanelState}>불러오는 중...</p>}
        {isError   && <p className={s.manualPanelState}>불러오지 못했습니다.</p>}
        {!isPending && !isError && detail && (
          <>
            {detail.consultationCreatedAt && (
              <div>
                <p className={s.bookmarkDetailLabel}>상담일시</p>
                <p className={s.bookmarkDetailValue}>{detail.consultationCreatedAt.slice(0, 10)}</p>
              </div>
            )}
            {detail.summary && (
              <div>
                <p className={s.bookmarkDetailLabel}>요약</p>
                <p className={s.bookmarkDetailValue}>{detail.summary}</p>
              </div>
            )}
            {detail.result && (
              <div>
                <p className={s.bookmarkDetailLabel}>처리 결과</p>
                <p className={s.bookmarkDetailValue}>{detail.result}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
