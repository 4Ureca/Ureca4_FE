import { useCallback, useState } from "react";
import { useGetConsultationListQuery } from "../../../shared/api/generated/consultation-list";
import * as layout from "../../../shared/ui/pageLayout.css";
import { ConsultationDetailModal } from "./ConsultationDetailModal";
import { ConsultationListFilter, type ConsultationListFilterParams } from "./ConsultationListFilter";
import * as s from "./ConsultationListPage.css";
import { ConsultationListPagination } from "./ConsultationListPagination";
import { ConsultationListTable } from "./ConsultationListTable";

const PAGE_SIZE = 20;
const CLOSE_DELAY = 180;

export function ConsultationListPage() {
  const [params, setParams] = useState<ConsultationListFilterParams>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isClosing, setIsClosing]   = useState(false);

  const { data, isPending, isError } = useGetConsultationListQuery(params);
  const listData      = data?.data;
  const items         = listData?.content ?? [];
  const totalElements = listData?.totalElements ?? 0;
  const totalPages    = listData?.totalPages ?? 1;
  const currentPage   = (listData?.page ?? 0) + 1;

  const isFiltered = !!(
    params.keyword ||
    params.categoryLarge ||
    params.resultStatus ||
    params.summaryStatus ||
    params.channel
  );
  const subtitleText = isPending
    ? "불러오는 중..."
    : isFiltered
      ? `검색된 ${totalElements.toLocaleString()}건의 상담 내역`
      : `전체 ${totalElements.toLocaleString()}건의 상담 내역`;

  function handleFilterChange(updates: Partial<ConsultationListFilterParams>) {
    setParams((prev) => ({ ...prev, ...updates, page: undefined }));
  }

  function handlePageChange(page: number) {
    setParams((prev) => ({ ...prev, page: page - 1 }));
  }

  const handleOpenDetail = useCallback((consultId: number) => {
    setIsClosing(false);
    setSelectedId(consultId);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedId(null);
      setIsClosing(false);
    }, CLOSE_DELAY);
  }, []);

  return (
    <>
      <main className={layout.main}>
        <div className={s.pageWrapper}>
          <div className={s.header}>
            <h1 className={s.title}>상담내역</h1>
            <p className={s.subtitle}>{subtitleText}</p>
          </div>

          <div className={s.content}>
            <ConsultationListFilter params={params} onChange={handleFilterChange} />

            {isPending && <p className={s.stateText}>불러오는 중...</p>}
            {isError   && <p className={s.stateText}>데이터를 불러오지 못했습니다.</p>}

            {!isPending && !isError && (
              <>
                <div className={s.tableAnimate} key={currentPage}>
                  <ConsultationListTable items={items} onDetail={handleOpenDetail} />
                </div>
                <ConsultationListPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  pageSize={PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </main>

      {selectedId != null && (
        <ConsultationDetailModal
          consultId={selectedId}
          onClose={handleCloseDetail}
          isClosing={isClosing}
        />
      )}
    </>
  );
}
