import { useState } from "react";
import { useGetManualBookmarkDetailQuery } from "../../shared/api/generated/bookmark";
import { BaseModal } from "../../shared/ui/BaseModal/BaseModal";
import * as ms from "../manual/ManualPage.css";
import * as s from "./MyBookmarksPage.css";

const CLOSE_DELAY = 180;

interface Props {
  manualId: number;
  onClose: () => void;
}

export function ManualBookmarkDetailModal({ manualId, onClose }: Props) {
  const [isClosing, setIsClosing] = useState(false);
  const { data, isPending, isError } = useGetManualBookmarkDetailQuery(manualId);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, CLOSE_DELAY);
  };

  const detail = data?.data;

  return (
    <BaseModal title={detail?.title ?? "매뉴얼 상세"} subTitle={`#${manualId}`}
      onClose={handleClose} isClosing={isClosing} size="lg">

      {isPending && <p className={s.stateText}>불러오는 중...</p>}
      {isError && <p className={s.stateText}>불러오지 못했습니다.</p>}

      {detail && (
        <div className={ms.modalDetailWrap}>
          <div className={ms.modalInfoGrid}>
            <div className={ms.modalInfoItem}>
              <span className={ms.modalInfoLabel}>카테고리</span>
              <span className={ms.modalInfoValue}>
                {detail.category
                  ? <span className={ms.categoryPill}>{detail.category}</span>
                  : "–"}
              </span>
            </div>
            <div className={ms.modalInfoItem}>
              <span className={ms.modalInfoLabel}>상태</span>
              <span className={ms.modalInfoValue}>
                <span className={detail.isActive ? ms.activeBadge : ms.inactiveBadge}>
                  {detail.isActive ? "활성" : "비활성"}
                </span>
              </span>
            </div>
            <div className={ms.modalInfoItem}>
              <span className={ms.modalInfoLabel}>대상고객</span>
              <span className={ms.modalInfoValue}>{detail.targetCustomerType ?? "–"}</span>
            </div>
            <div className={ms.modalInfoItem}>
              <span className={ms.modalInfoLabel}>북마크일</span>
              <span className={ms.modalInfoValue}>{detail.bookmarkedAt?.slice(0, 10) ?? "–"}</span>
            </div>
          </div>

          <div className={ms.modalSection}>
            <h3 className={ms.modalSectionTitle}>내용</h3>
            <div className={ms.modalContentBox}>{detail.content ?? "내용이 없습니다."}</div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
