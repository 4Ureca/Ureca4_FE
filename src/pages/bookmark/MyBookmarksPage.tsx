import { useState } from "react";
import { useGetConsultationBookmarksQuery, useGetManualBookmarksQuery } from "../../shared/api/generated/bookmark";
import { getRole } from "../../shared/api/roleStore";
import * as layout from "../../shared/ui/pageLayout.css";
import { ConsultationDetailModal } from "../consultation/list/ConsultationDetailModal";
import { SummaryDetailModal } from "../summary/SummaryDetailModal";
import { DashboardSidebar } from "../../widgets/DashboardSidebar/DashboardSidebar";
import { ConsultBookmarkList } from "./ConsultBookmarkList";
import { ManualBookmarkDetailModal } from "./ManualBookmarkDetailModal";
import { ManualBookmarkList } from "./ManualBookmarkList";
import * as s from "./MyBookmarksPage.css";

type Tab = "consult" | "manual";
const CLOSE_DELAY = 180;

export function MyBookmarksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("consult");
  const [summaryId, setSummaryId] = useState<number | null>(null);
  const [isClosingSummary, setIsClosingSummary] = useState(false);
  const [consultDetailId, setConsultDetailId] = useState<number | null>(null);
  const [isClosingConsult, setIsClosingConsult] = useState(false);
  const [detailManualId, setDetailManualId] = useState<number | null>(null);

  const { data: consultData } = useGetConsultationBookmarksQuery();
  const { data: manualData } = useGetManualBookmarksQuery();

  const consultCount = consultData?.data?.length ?? 0;
  const manualCount = manualData?.data?.length ?? 0;

  const handleCloseSummary = () => {
    setIsClosingSummary(true);
    setTimeout(() => { setSummaryId(null); setIsClosingSummary(false); }, CLOSE_DELAY);
  };

  const handleViewConsult = (id: number) => {
    handleCloseSummary();
    setTimeout(() => setConsultDetailId(id), CLOSE_DELAY + 50);
  };

  const handleCloseConsult = () => {
    setIsClosingConsult(true);
    setTimeout(() => { setConsultDetailId(null); setIsClosingConsult(false); }, CLOSE_DELAY);
  };

  return (
    <>
      <DashboardSidebar isAdmin={getRole() === "관리자"} />
      <main className={layout.main}>
        <div className={s.pageWrapper}>
          <div className={s.header}>
            <div className={s.headerLeft}>
              <h1 className={s.title}>내 북마크</h1>
              <p className={s.subtitle}>내가 저장한 상담 요약과 매뉴얼 북마크</p>
            </div>
          </div>

          <div className={s.tabBar}>
            <button type="button" className={s.tab[activeTab === "consult" ? "active" : "inactive"]}
              onClick={() => setActiveTab("consult")}>
              상담 요약 ({consultCount})
            </button>
            <button type="button" className={s.tab[activeTab === "manual" ? "active" : "inactive"]}
              onClick={() => setActiveTab("manual")}>
              매뉴얼 ({manualCount})
            </button>
          </div>

          <div className={s.content}>
            {activeTab === "consult"
              ? <ConsultBookmarkList onDetail={setSummaryId} />
              : <ManualBookmarkList onDetail={setDetailManualId} />}
          </div>
        </div>
      </main>

      {summaryId != null && (
        <SummaryDetailModal consultId={summaryId}
          onClose={handleCloseSummary} isClosing={isClosingSummary}
          onViewConsult={handleViewConsult} />
      )}
      {consultDetailId != null && (
        <ConsultationDetailModal consultId={consultDetailId}
          onClose={handleCloseConsult} isClosing={isClosingConsult} />
      )}
      {detailManualId != null && (
        <ManualBookmarkDetailModal manualId={detailManualId}
          onClose={() => setDetailManualId(null)} />
      )}
    </>
  );
}
