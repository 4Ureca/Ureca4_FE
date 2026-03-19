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
import type { Period } from "../analysis/PeriodSelector";
import { PeriodSelector } from "../analysis/PeriodSelector";
import * as rs from "../admin-report/AdminReportPage.css";
import { OutboundAgentSection } from "./OutboundAgentSection";
import { OutboundCallResultSection } from "./OutboundCallResultSection";
import { OutboundRejectSection } from "./OutboundRejectSection";
import { OutboundCampaignSection } from "./OutboundCampaignSection";
import { OutboundConversionSection } from "./OutboundConversionSection";
import { OutboundHeatmapSection } from "./OutboundHeatmapSection";
import { OutboundKpiSection } from "./OutboundKpiSection";
import { OutboundOptimalTimeSection } from "./OutboundOptimalTimeSection";

function localDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toApiDate(period: Period, raw: string): string {
  if (period === "weekly") {
    // "2026-W12" → 해당 주 월요일 yyyy-MM-dd
    const match = raw.match(/^(\d{4})-W(\d{2})$/);
    if (match) {
      const d = new Date(Number(match[1]), 0, 1 + (Number(match[2]) - 1) * 7);
      d.setDate(d.getDate() - (d.getDay() || 7) + 1);
      return localDateStr(d);
    }
  }
  if (period === "monthly") {
    return raw.length === 7 ? `${raw}-01` : raw;
  }
  return raw;
}

function toInputValue(period: Period, apiDate: string): string {
  if (period === "weekly") {
    const d = new Date(apiDate);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const y = d.getFullYear();
    const yearStart = new Date(y, 0, 1);
    const w = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    return `${y}-W${String(w).padStart(2, "0")}`;
  }
  if (period === "monthly") return apiDate.slice(0, 7);
  return apiDate;
}

export function OutboundPage() {
  const [period, setPeriod] = useState<Period>("daily");
  const [date, setDate]     = useState(() => localDateStr(new Date()));

  const params = { period, date };

  function handlePeriodChange(p: Period) {
    setPeriod(p);
    setDate(toApiDate(p, toInputValue(p, date)));
  }

  function handleDateChange(raw: string) {
    setDate(toApiDate(period, raw));
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 className={rs.title}>아웃바운드 분석</h1>
              <p className={rs.subtitle}>기간별 아웃바운드 캠페인 성과 분석 (관리자 전용)</p>
            </div>
            <PeriodSelector period={period} date={toInputValue(period, date)} onPeriodChange={handlePeriodChange} onDateChange={handleDateChange} />
          </div>
        </div>
        <div className={rs.body}>

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
