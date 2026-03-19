import { useState } from "react";
import {
  useGetAgentsQuery,
  useGetCallResultsQuery,
  useGetCampaignsQuery,
  useGetConversionByCategoryQuery,
  useGetHeatmapQuery,
  useGetKpiQuery,
  useGetOptimalTimeQuery,
} from "../../shared/api/generated/outbound-report";
import * as layout from "../../shared/ui/pageLayout.css";
import { AdminDatePicker, PERIOD_COLOR } from "../admin-report/AdminDatePicker";
import * as rs from "../admin-report/AdminReportPage.css";
import type { Period } from "../analysis/PeriodSelector";
import { PeriodSelector } from "../analysis/PeriodSelector";
import { OutboundAgentSection } from "./OutboundAgentSection";
import { OutboundCallResultSection } from "./OutboundCallResultSection";
import { OutboundCampaignSection } from "./OutboundCampaignSection";
import { OutboundConversionSection } from "./OutboundConversionSection";
import { OutboundHeatmapSection } from "./OutboundHeatmapSection";
import { OutboundKpiSection } from "./OutboundKpiSection";
import { OutboundOptimalTimeSection } from "./OutboundOptimalTimeSection";
import { OutboundRejectSection } from "./OutboundRejectSection";

function localDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}


export function OutboundPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const [date, setDate]     = useState(() => localDateStr(new Date()));

  const params = { period, date };

  function handlePeriodChange(p: Period) {
    setPeriod(p);
  }

  const { data: kpi,         isPending: kpiPending     } = useGetKpiQuery(params);
  const { data: campaigns,   isPending: campPending     } = useGetCampaignsQuery(params);
  const { data: conversion,  isPending: convPending     } = useGetConversionByCategoryQuery(params);
  const { data: heatmap,     isPending: heatPending     } = useGetHeatmapQuery(params);
  const { data: callResult,  isPending: callPending     } = useGetCallResultsQuery(params);
  const { data: agents,      isPending: agentPending    } = useGetAgentsQuery(params);
  const { data: optimalTime, isPending: optimalPending  } = useGetOptimalTimeQuery(params);

  return (
    <main className={layout.main}>
      <div className={rs.pageWrapper}>
        <div className={rs.header}>
          <h1 className={rs.title}>아웃바운드 분석</h1>
          <p className={rs.subtitle}>기간별 아웃바운드 캠페인 성과 분석 (관리자 전용)</p>
        </div>
        <div className={rs.body}>

          <div style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end", alignItems: "flex-start", gap: "12px" }}>
            <div className={rs.sectionCard} style={{ padding: "8px 12px" }}>
              <PeriodSelector
                period={period}
                date={date}
                onPeriodChange={handlePeriodChange}
                onDateChange={setDate}
                hideDateInput
                activeColor={PERIOD_COLOR[period]}
              />
            </div>
            <div className={rs.sectionCard}>
              <AdminDatePicker period={period} date={date} onDateChange={setDate} />
            </div>
          </div>

          {/* KPI */}
          <OutboundKpiSection data={kpi} isPending={kpiPending} />

          {/* 캠페인 성과 현황 */}
          <OutboundCampaignSection data={campaigns} isPending={campPending} />

          {/* 카테고리별 전환율 + 히트맵 */}
          <div className={rs.twoCol}>
            <OutboundConversionSection data={conversion} isPending={convPending} />
            <OutboundHeatmapSection    data={heatmap}    isPending={heatPending} />
          </div>

          {/* 거절 사유 분석 + 발신 결과 분포 */}
          <div className={rs.twoCol}>
            <OutboundRejectSection     data={callResult} isPending={callPending} />
            <OutboundCallResultSection data={callResult} isPending={callPending} />
          </div>

          {/* 상담사 실적 */}
          <OutboundAgentSection data={agents} isPending={agentPending} />

          {/* 최적 연락 시간 */}
          <OutboundOptimalTimeSection data={optimalTime} isPending={optimalPending} />

        </div>
      </div>
    </main>
  );
}
