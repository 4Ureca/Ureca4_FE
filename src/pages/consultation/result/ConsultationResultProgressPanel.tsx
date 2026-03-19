import { useState } from "react";
import { ConsultationResultBottomPanels } from "./ConsultationResultBottomPanels";
import * as s from "./ConsultationResultPage.css";

interface Props {
  hasData: boolean;
  iamIssue: string;
  iamAction: string;
  iamMemo: string;
  onChatOpen: () => void;
  categoryCode?: string;
  showManual: boolean;
  onManualOpen: () => void;
  showBookmarks: boolean;
  onBookmarkOpen: () => void;
  onBookmarkClose: () => void;
  onSelectBookmark: (consultId: number) => void;
  onSelectSummary: (consultId: number) => void;
}

interface SubItem {
  label: string;
  checked: boolean;
}

interface Section {
  id: string;
  label: string;
  items: SubItem[];
}

export function ConsultationResultProgressPanel({ hasData, iamIssue, iamAction, iamMemo, onChatOpen, showManual, onManualOpen, showBookmarks, onBookmarkOpen, onBookmarkClose, onSelectBookmark, onSelectSummary }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({
    customer: false,
    consult:  false,
    iam:      false,
  });

  const sections: Section[] = [
    {
      id: "customer",
      label: "고객 기본 정보",
      items: [
        { label: "고객명",   checked: hasData },
        { label: "연락처",   checked: hasData },
        { label: "이메일",   checked: hasData },
        { label: "가입 상품", checked: hasData },
      ],
    },
    {
      id: "consult",
      label: "상담 기본 정보",
      items: [
        { label: "상담 채널", checked: hasData },
        { label: "카테고리",  checked: hasData },
        { label: "상담 시간", checked: hasData },
      ],
    },
    {
      id: "iam",
      label: "IAM 입력",
      items: [
        { label: "이슈 요약", checked: !!iamIssue.trim() },
        { label: "처리 내용", checked: !!iamAction.trim() },
        { label: "처리 메모", checked: !!iamMemo.trim() },
      ],
    },
  ];

  const doneSections = sections.filter((sec) => sec.items.every((i) => i.checked)).length;

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className={s.progressPanelWrapper}>
      <div className={s.progressPanel}>
          <p className={s.progressTitle}>작성 진행 현황</p>
          <p className={s.progressCount}>{doneSections} / {sections.length} 완료</p>

          <div className={s.progressBar}>
            <div
              className={s.progressFill}
              style={{ width: `${(doneSections / sections.length) * 100}%` }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {sections.map((section) => {
              const sectionDone = section.items.every((i) => i.checked);
              const isOpen = open[section.id];

              return (
                <div key={section.id} className={s.sectionItem}>
                  <button
                    type="button"
                    className={s.sectionHeader}
                    onClick={() => toggle(section.id)}
                  >
                    <span className={s.sectionChevron}>{isOpen ? "▼" : "▶"}</span>
                    <span className={sectionDone ? s.sectionLabelDone : s.sectionLabel}>
                      {section.label}
                    </span>
                    <span className={sectionDone ? s.checkDone : s.checkEmpty}>
                      {sectionDone ? "✓" : ""}
                    </span>
                  </button>

                  {isOpen && (
                    <ul className={s.subList}>
                      {section.items.map((item) => (
                        <li key={item.label} className={s.subItem}>
                          <span className={item.checked ? s.checkDone : s.checkEmpty}>
                            {item.checked ? "✓" : ""}
                          </span>
                          <span className={item.checked ? s.progressLabelDone : s.progressLabel}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <button type="button" className={s.chatBtn} onClick={onChatOpen}>
            💬 원문 대화 보기
          </button>
        </div>

        <button
          type="button"
          className={showManual ? s.manualBtnHiding : `${s.manualBtn} ${s.manualBtnShowing}`}
          onClick={onManualOpen}
          disabled={showManual}
        >
          관련 매뉴얼 보기
        </button>
        <button
          type="button"
          className={showBookmarks ? s.manualBtnHiding : `${s.summaryFetchBtn} ${s.manualBtnShowing}`}
          onClick={onBookmarkOpen}
          disabled={showBookmarks}
        >
          상담 요약 북마크
        </button>

      {showBookmarks && (
        <>
          <button type="button" className={s.manualPanelCloseBtn} onClick={onBookmarkClose}>
            닫기
          </button>
          <ConsultationResultBottomPanels
            className={s.bookmarkPanelsRowInline}
            onSelectBookmark={onSelectBookmark}
            onSelectSummary={onSelectSummary}
          />
        </>
      )}
    </div>
  );
}
