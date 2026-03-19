import { useState } from "react";
import type { ManualResponse } from "../../shared/api/generated/api.schemas";
import { BaseModal } from "../../shared/ui/BaseModal/BaseModal";
import * as s from "./ManualPage.css";

const CLOSE_DELAY = 180;

function formatDate(raw?: string) {
  if (!raw) return "–";
  return raw.slice(0, 10);
}

interface Props {
  manual: ManualResponse;
  onClose: () => void;
}

export function ManualDetailModal({ manual, onClose }: Props) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, CLOSE_DELAY);
  };

  return (
    <BaseModal title={manual.title ?? "매뉴얼 상세"} subTitle={`#${manual.manualId ?? ""}`}
      onClose={handleClose} isClosing={isClosing} size="lg">
      <div className={s.modalDetailWrap}>
        <div className={s.modalInfoGrid}>
          <div className={s.modalInfoItem}>
            <span className={s.modalInfoLabel}>카테고리</span>
            <span className={s.modalInfoValue}>
              {manual.categoryName
                ? <span className={s.categoryPill}>{manual.categoryName}</span>
                : "–"}
            </span>
          </div>
          <div className={s.modalInfoItem}>
            <span className={s.modalInfoLabel}>상태</span>
            <span className={s.modalInfoValue}>
              <span className={manual.isActive ? s.activeBadge : s.inactiveBadge}>
                {manual.isActive ? "활성" : "비활성"}
              </span>
            </span>
          </div>
          <div className={s.modalInfoItem}>
            <span className={s.modalInfoLabel}>작성자</span>
            <span className={s.modalInfoValue}>{manual.empName ?? "–"}</span>
          </div>
          <div className={s.modalInfoItem}>
            <span className={s.modalInfoLabel}>최종 수정일</span>
            <span className={s.modalInfoValue}>{formatDate(manual.updatedAt)}</span>
          </div>
        </div>

        <div className={s.modalSection}>
          <h3 className={s.modalSectionTitle}>내용</h3>
          <div className={s.modalContentBox}>{manual.content ?? "내용이 없습니다."}</div>
        </div>
      </div>
    </BaseModal>
  );
}
