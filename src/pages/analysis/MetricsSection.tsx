import type { AgentMetricsResponse } from "../../shared/api/generated/api.schemas";
import * as s from "./AnalysisPage.css";
import { StatCard } from "./StatCard";

interface Props {
  metrics: AgentMetricsResponse | undefined;
  isPending: boolean;
}

export function MetricsSection({ metrics, isPending }: Props) {
  if (isPending) return <p className={s.stateText}>불러오는 중...</p>;
  if (!metrics) return <p className={s.stateText}>데이터가 없습니다.</p>;

  return (
    <div>
      <div className={s.statGrid}>
        <StatCard
          label="상담 건수"
          value={metrics.myConsultCount ?? "-"}
          unit="건"
          teamValue={metrics.teamAvgConsultCount != null ? `${metrics.teamAvgConsultCount}건` : undefined}
        />
        <StatCard
          label="품질 점수"
          value={metrics.myQualityScore?.toFixed(1) ?? "-"}
          teamValue={metrics.teamAvgQualityScore?.toFixed(1)}
        />
        <StatCard
          label="평균 상담 시간"
          value={metrics.myAvgDuration ?? "-"}
          unit="분"
          teamValue={metrics.teamAvgDuration != null ? `${metrics.teamAvgDuration}분` : undefined}
        />
      </div>
      {metrics.iamMatchRate != null && (
        <div className={s.durationRow}>
          <span className={s.durationLabel}>IAM 일치율</span>
          <span className={s.durationValue} style={{ marginLeft: "8px" }}>{(metrics.iamMatchRate * 100).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
