import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetDetailQuery,
  useMutationPatchRejectExcellentCaseQuery,
  useMutationPostSelectExcellentCaseQuery,
} from "../../../shared/api/generated/admin-excellent-case";
import { getDetailKey } from "../../../shared/api/generated/admin-excellent-case/admin-excellent-case.keys";
import { EvaluationDetailResponseSelectionStatus } from "../../../shared/api/generated/api.schemas";
import { BaseModal } from "../../../shared/ui/BaseModal/BaseModal";
import * as ms from "../../consultation/list/ConsultationDetailModal.css";
import { ConsultationDetailRawChat } from "../../consultation/list/ConsultationDetailRawChat";

interface Props {
  consultId: number;
  onClose: () => void;
  /** 테이블의 '선정' 버튼 클릭 시 바로 선정 입력 모드로 열기 */
  initialSelectMode?: boolean;
}

type Tab = "summary" | "chat";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "검토 대기",
  SELECTED: "선정됨",
  REJECTED: "후보 제외",
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  PENDING: { backgroundColor: "#FEF3C7", color: "#92400E" },
  SELECTED: { backgroundColor: "#DCFCE7", color: "#166534" },
  REJECTED: { backgroundColor: "#FEF2F2", color: "#991B1B" },
};

export function AdminExcellentCaseDetailModal({ consultId, onClose, initialSelectMode = false }: Props) {
  const [tab, setTab] = useState<Tab>("summary");
  const [isSelectMode, setIsSelectMode] = useState(initialSelectMode);
  const [adminReason, setAdminReason] = useState("");

  const queryClient = useQueryClient();
  const { data: detail, isPending, isError } = useGetDetailQuery(consultId);

  // 🥊 [핵심] 모든 캐시를 완전히 날리고 API를 서버에서 새로 불러오게 강제하는 함수
  const forceGlobalRefresh = async (message: string) => {
    // 1. 후보군 관리 도메인과 관련된 모든 캐시(리스트, 4개 카운트)를 완전히 초기화
    await queryClient.resetQueries({ queryKey: ["admin-excellent-case"] });
    await queryClient.resetQueries({ queryKey: ["/admin/excellent-cases/candidates"] });
    
    // 2. 현재 열려있는 상세 팝업의 데이터도 즉시 갱신
    await queryClient.invalidateQueries({ queryKey: getDetailKey(consultId) });
    
    // 3. 화면에 보이는 모든 쿼리 즉시 다시 찌르기 (상단 숫자 동기화용)
    await queryClient.refetchQueries({ type: "active" });

    alert(message);
    setIsSelectMode(false);
    onClose();
  };

  const selectMutation = useMutationPostSelectExcellentCaseQuery({
    mutation: {
      onSuccess: () => forceGlobalRefresh("성공적으로 선정되었습니다."),
      onError: (error: any) => {
        // 서버 200 OK인데 빈 응답값 때문에 발생하는 SyntaxError 대응
        if (error.response?.status === 200 || error.name === 'SyntaxError') {
          forceGlobalRefresh("성공적으로 선정되었습니다.");
        } else {
          alert("선정 처리 중 오류가 발생했습니다.");
        }
      },
    },
  });

  const rejectMutation = useMutationPatchRejectExcellentCaseQuery({
    mutation: {
      onSuccess: () => forceGlobalRefresh("후보군에서 제외되었습니다."),
      onError: (error: any) => {
        if (error.response?.status === 200 || error.name === 'SyntaxError') {
          forceGlobalRefresh("후보군에서 제외되었습니다.");
        } else {
          alert("후보 제외 처리 중 오류가 발생했습니다.");
        }
      },
    },
  });

  const status = detail?.selectionStatus ?? "PENDING";

  // 🥊 [수정 포인트] (대기 or 제외 상태) 이면서 (점수가 90점 이상)인 경우에만 선정 버튼 노출
  const canSelect = (status === EvaluationDetailResponseSelectionStatus.PENDING 
    || status === EvaluationDetailResponseSelectionStatus.REJECTED)
    && (detail?.score ?? 0) >= 90;

  const canReject = status === EvaluationDetailResponseSelectionStatus.PENDING
    || status === EvaluationDetailResponseSelectionStatus.SELECTED;

  const tabBar = (
    <div className={ms.tabBar}>
      {([
        { key: "summary" as Tab, label: "요약 / 평가" },
        { key: "chat" as Tab, label: "원문 대화" },
      ]).map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={tab === key ? ms.tabActive : ms.tab}
          onClick={() => setTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const btnBase: React.CSSProperties = {
    padding: "8px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
  };

  const footer = (
    <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
      <button type="button" className={ms.closeFooterBtn} onClick={onClose}>닫기</button>

      {!isPending && !isError && detail && (
        <div style={{ display: "flex", gap: "8px" }}>
          {isSelectMode ? (
            <>
              <button
                type="button"
                className={ms.closeFooterBtn}
                onClick={() => { setIsSelectMode(false); setAdminReason(""); }}
              >
                취소
              </button>
              <button
                type="button"
                disabled={selectMutation.isPending}
                onClick={() =>
                  selectMutation.mutate({
                    consultId,
                    data: { adminReason: adminReason.trim() || undefined },
                  })
                }
                style={{ ...btnBase, backgroundColor: "#1D4ED8", color: "#FFFFFF" }}
              >
                {selectMutation.isPending ? "처리 중..." : "선정 확인"}
              </button>
            </>
          ) : (
            <>
              {canReject && (
                <button
                  type="button"
                  disabled={rejectMutation.isPending}
                  onClick={() => {
                    if (window.confirm("이 후보를 정말 제외하시겠습니까?")) {
                      rejectMutation.mutate({ consultId });
                    }
                  }}
                  style={{ ...btnBase, backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
                >
                  {rejectMutation.isPending ? "처리 중..." : "후보 제외"}
                </button>
              )}
              {canSelect && (
                <button
                  type="button"
                  onClick={() => setIsSelectMode(true)}
                  style={{ ...btnBase, backgroundColor: "#1D4ED8", color: "#FFFFFF" }}
                >
                  선정하기
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <BaseModal
      title="우수 사례 후보 상세"
      onClose={onClose}
      subTitle={detail?.categoryName}
      tabBar={tabBar}
      size="lg"
      footer={footer}
    >
      {isPending && <p className={ms.stateText}>불러오는 중...</p>}
      {isError && <p className={ms.stateText}>데이터를 불러오지 못했습니다.</p>}

      {!isPending && !isError && detail && (
        <>
          {tab === "summary" && (
            <div className={ms.fieldStack}>
              <div className={ms.fieldGroup}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    backgroundColor: "#FEF3C7",
                    color: "#92400E",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}>
                    AI 점수 {detail.score ?? "-"}점
                  </div>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    backgroundColor: "#EFF6FF",
                    color: "#1E40AF",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}>
                    {detail.counselorName}
                  </div>
                  <div style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 600,
                    ...STATUS_STYLE[status],
                  }}>
                    {STATUS_LABEL[status]}
                  </div>
                </div>
              </div>

              {detail.summary && (
                <div className={ms.fieldGroup}>
                  <p className={ms.fieldLabelAi}>AI 상담 요약</p>
                  <div className={ms.fieldBoxAi}>{detail.summary}</div>
                </div>
              )}

              {detail.evaluationReason && (
                <div className={ms.fieldGroup}>
                  <p className={ms.fieldLabel}>AI 우수 선정 사유</p>
                  <div className={ms.fieldBoxMultiline}>{detail.evaluationReason}</div>
                </div>
              )}

              {isSelectMode && (
                <div className={ms.fieldGroup}>
                  <p className={ms.fieldLabel}>관리자 선정 사유 (선택)</p>
                  <textarea
                    autoFocus
                    value={adminReason}
                    onChange={(e) => setAdminReason(e.target.value)}
                    placeholder="선정 사유를 입력하세요. (우수 사례 게시판에 표시됩니다)"
                    rows={3}
                    style={{
                      width: "100%",
                      border: "1px solid #D1D5DB",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      fontSize: "14px",
                      resize: "vertical",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {tab === "chat" && (
            <ConsultationDetailRawChat rawTextJson={detail.rawTextJson} />
          )}
        </>
      )}
    </BaseModal>
  );
}