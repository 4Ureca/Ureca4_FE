import { useState } from "react";
import {
  useGetCategories1Query,
  useGetDailyQualityQuery,
  useGetMetricsQuery,
  useGetMonthlyQualityQuery,
  useGetSatisfactionQuery,
  useGetWeeklyQualityQuery,
} from "../../shared/api/generated/agent-report";
import * as layout from "../../shared/ui/pageLayout.css";
import { AdminDatePicker, PERIOD_COLOR } from "../admin-report/AdminDatePicker";
import * as s from "./AnalysisPage.css";
import { CategorySection } from "./CategorySection";
import { MetricsSection } from "./MetricsSection";
import type { Period } from "./PeriodSelector";
import { PeriodSelector } from "./PeriodSelector";
import { QualitySection } from "./QualitySection";
import { SatisfactionSection } from "./SatisfactionSection";

const DEFAULT_DATE = "2026-01-02";

export function AnalysisPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const [date, setDate] = useState<string>(DEFAULT_DATE);

  const params = { date };

  const { data: metrics, isPending: metricsPending } = useGetMetricsQuery(period, params);
  const { data: satisfaction, isPending: satPending } = useGetSatisfactionQuery(period, params);
  const { data: categories, isPending: catPending } = useGetCategories1Query(period, params);

  const { data: rawDailyQuality, isPending: dailyQualityPending } = useGetDailyQualityQuery(params);
  const { data: rawWeeklyQuality, isPending: weeklyQualityPending } = useGetWeeklyQualityQuery(params);
  const { data: rawMonthlyQuality, isPending: monthlyQualityPending } = useGetMonthlyQualityQuery(params);

  const qualityDataMap = { daily: rawDailyQuality, weekly: rawWeeklyQuality, monthly: rawMonthlyQuality };
  const qualityPendingMap = { daily: dailyQualityPending, weekly: weeklyQualityPending, monthly: monthlyQualityPending };
  const rawQuality = qualityDataMap[period];
  const quality = Array.isArray(rawQuality) ? rawQuality[0] : rawQuality;
  const qualityPending = qualityPendingMap[period];

  return (
    <main className={layout.main}>
      <div className={s.pageWrapper}>
        <div className={s.header}>
          <h1 className={s.title}>상담분석</h1>
          <p className={s.subtitle}>기간별 상담 성과 및 품질 분석</p>
        </div>

        <div className={s.body}>
          <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", width: "fit-content" }}>
            <div className={s.sectionCard} style={{ marginBottom: "12px", padding: "8px 12px" }}>
              <PeriodSelector
                period={period}
                date={date}
                onPeriodChange={setPeriod}
                onDateChange={setDate}
                hideDateInput
                activeColor={PERIOD_COLOR[period]}
              />
            </div>
            <div className={s.sectionCard}>
              <AdminDatePicker period={period} date={date} onDateChange={setDate} />
            </div>
          </div>

          <div className={s.twoCol}>
            <div className={s.sectionCard}>
              <p className={s.sectionTitle}>성과 지표</p>
              <MetricsSection metrics={metrics} isPending={metricsPending} />
            </div>
            <div className={s.sectionCard}>
              <p className={s.sectionTitle}>고객 만족도</p>
              <SatisfactionSection satisfaction={satisfaction} isPending={satPending} />
            </div>
          </div>

          <div className={s.twoCol}>
            <div className={s.sectionCard} style={{ alignSelf: "flex-start" }}>
              <p className={s.sectionTitle}>응대 품질 분석</p>
              <QualitySection quality={quality} isPending={qualityPending} />
            </div>
            <div className={s.sectionCard}>
              <p className={s.sectionTitle}>카테고리 순위</p>
              <CategorySection categories={categories ?? []} isPending={catPending} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
