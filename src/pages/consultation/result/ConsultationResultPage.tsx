import { useState } from "react";
import { useGetRandomConsultDataQuery } from "../../../shared/api/generated/demo";
import * as layout from "../../../shared/ui/pageLayout.css";
import { ConsultationResultBookmarkDetail } from "./ConsultationResultBookmarkDetail";
import { ConsultationResultSummaryDetail } from "./ConsultationResultSummaryDetail";

import { ConsultationResultChatModal } from "./ConsultationResultChatModal";
import { ConsultationResultConsultCard } from "./ConsultationResultConsultCard";
import { ConsultationResultCustomerCard } from "./ConsultationResultCustomerCard";
import { ConsultationResultIAMCard } from "./ConsultationResultIAMCard";
import { ConsultationResultManualPanel } from "./ConsultationResultManualPanel";
import * as s from "./ConsultationResultPage.css";
import { ConsultationResultProgressPanel } from "./ConsultationResultProgressPanel";

export function ConsultationResultPage() {
  const { data, isPending, isError, refetch } = useGetRandomConsultDataQuery();
  const demo = data?.data;

  const [iamIssue,   setIamIssue]   = useState("");
  const [iamAction,  setIamAction]  = useState("");
  const [iamMemo,    setIamMemo]    = useState("");
  const [chatOpen,            setChatOpen]            = useState(false);
  const [showManual,          setShowManual]          = useState(false);
  const [showBookmarks,       setShowBookmarks]       = useState(false);
  const [selectedBookmarkId,  setSelectedBookmarkId]  = useState<number | null>(null);
  const [selectedSummaryId,   setSelectedSummaryId]   = useState<number | null>(null);
  const [isLeftClosing,       setIsLeftClosing]       = useState(false);

  function closeLeftPanel(afterClose: () => void) {
    setIsLeftClosing(true);
    setTimeout(() => { afterClose(); setIsLeftClosing(false); }, 280);
  }

  function hasOtherLeftCards(exclude: "manual" | "bookmark" | "summary") {
    return (
      (exclude !== "manual"   && showManual) ||
      (exclude !== "bookmark" && selectedBookmarkId !== null) ||
      (exclude !== "summary"  && selectedSummaryId  !== null)
    );
  }

  function closeManualPanel() {
    if (!hasOtherLeftCards("manual")) {
      closeLeftPanel(() => setShowManual(false));
    } else {
      setShowManual(false);
    }
  }

  function closeBookmarkDetail() {
    if (!hasOtherLeftCards("bookmark")) {
      closeLeftPanel(() => setSelectedBookmarkId(null));
    } else {
      setSelectedBookmarkId(null);
    }
  }

  function closeSummaryDetail() {
    if (!hasOtherLeftCards("summary")) {
      closeLeftPanel(() => setSelectedSummaryId(null));
    } else {
      setSelectedSummaryId(null);
    }
  }

  function handleIamChange(field: "iamIssue" | "iamAction" | "iamMemo", value: string) {
    if (field === "iamIssue")  setIamIssue(value);
    if (field === "iamAction") setIamAction(value);
    if (field === "iamMemo")   setIamMemo(value);
  }

  function handleRefetch() {
    setIamIssue("");
    setIamAction("");
    setIamMemo("");
    refetch();
  }

  const isExpanded = showManual || selectedBookmarkId !== null || selectedSummaryId !== null || isLeftClosing;
  const contentGroupClass = isLeftClosing ? s.contentGroupClosing
    : isExpanded ? s.contentGroupExpanded
    : s.contentGroup;

  return (
    <>
      <main className={layout.main}>
        <div className={s.pageWrapper}>
          <div className={s.header}>
            <div className={s.headerRow}>
              <h1 className={s.title}>결과서 작성</h1>
              <button type="button" className={s.refreshBtn} onClick={handleRefetch} disabled={isPending}>
                ↻ 다른 결과서 불러오기
              </button>
            </div>
          </div>

          <div className={isExpanded ? s.bodyExpanded : s.body}>

            {/* 왼쪽 카드 영역 — 매뉴얼 or 북마크 상세 */}
            {isExpanded && (
              <div className={isLeftClosing ? s.manualCardContainerClosing : s.manualCardContainer}>
                {showManual && (
                  <ConsultationResultManualPanel
                    categoryCode={demo?.categoryCode}
                    onClose={closeManualPanel}
                  />
                )}
                {selectedBookmarkId !== null && (
                  <ConsultationResultBookmarkDetail
                    consultId={selectedBookmarkId}
                    onClose={closeBookmarkDetail}
                  />
                )}
                {selectedSummaryId !== null && (
                  <ConsultationResultSummaryDetail
                    consultId={selectedSummaryId}
                    onClose={closeSummaryDetail}
                  />
                )}
              </div>
            )}

            {/* 기존 카드들 + 진행 현황 — 함께 슬라이드 */}
            <div className={contentGroupClass}>
              <div className={s.contentArea}>
                {isPending && <p className={s.stateText}>불러오는 중...</p>}
                {isError   && <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>}

                {!isPending && !isError && demo && (
                  <>
                    <ConsultationResultCustomerCard demo={demo} />
                    <ConsultationResultConsultCard  demo={demo} />
                    <ConsultationResultIAMCard
                      key={demo.customerId}
                      demo={demo}
                      iamIssue={iamIssue}
                      iamAction={iamAction}
                      iamMemo={iamMemo}
                      onChange={handleIamChange}
                      onSubmitSuccess={handleRefetch}
                    />
                  </>
                )}
              </div>

              <ConsultationResultProgressPanel
                hasData={!!demo}
                iamIssue={iamIssue}
                iamAction={iamAction}
                iamMemo={iamMemo}
                onChatOpen={() => setChatOpen(true)}
                categoryCode={demo?.categoryCode}
                showManual={showManual}
                onManualOpen={() => setShowManual(true)}
                showBookmarks={showBookmarks}
                onBookmarkOpen={() => setShowBookmarks(true)}
                onBookmarkClose={() => setShowBookmarks(false)}
                onSelectBookmark={setSelectedBookmarkId}
                onSelectSummary={setSelectedSummaryId}
              />
            </div>
          </div>
        </div>
      </main>

      {chatOpen && (
        <ConsultationResultChatModal
          rawTextJson={demo?.rawTextJson}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  );
}
