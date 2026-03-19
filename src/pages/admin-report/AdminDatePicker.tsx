import { useEffect, useRef, useState } from "react";
import type { Period } from "../analysis/PeriodSelector";

interface Props {
  period: Period;
  date: string; // YYYY-MM-DD
  onDateChange: (d: string) => void;
}

export const PERIOD_COLOR: Record<Period, string> = {
  daily: "#E1006A",
  weekly: "#3B82F6",
  monthly: "#10B981",
};

const PERIOD_LIGHT: Record<Period, string> = {
  daily: "#FFF0F6",
  weekly: "#EFF6FF",
  monthly: "#ECFDF5",
};

const PERIOD_LABEL: Record<Period, string> = {
  daily: "일간",
  weekly: "주간",
  monthly: "월간",
};

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function toDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function formatDisplay(date: string, period: Period): string {
  const d = toDate(date);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const dd = d.getDate();
  const day = WEEKDAYS[d.getDay()];
  if (period === "daily") return `${y}년 ${m}월 ${dd}일 (${day})`;
  if (period === "weekly") return `${y}년 ${m}월 ${dd}일 포함 주`;
  return `${y}년 ${m}월`;
}

export function AdminDatePicker({ period, date, onDateChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = toDate(date);
  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  // 달력을 닫을 때마다 선택된 날짜의 월로 뷰 리셋
  useEffect(() => {
    if (isOpen) return;
    const d = toDate(date);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [isOpen, date]);


  const color = PERIOD_COLOR[period];
  const light = PERIOD_LIGHT[period];

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const lastOfMonth = new Date(viewYear, viewMonth + 1, 0);

  const startCell = new Date(firstOfMonth);
  startCell.setDate(startCell.getDate() - startCell.getDay());

  const cells: Date[] = [];
  const cur = new Date(startCell);
  const neededRows = Math.ceil((firstOfMonth.getDay() + lastOfMonth.getDate()) / 7);
  while (cells.length < neededRows * 7) {
    cells.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const selectedStr = toStr(selected);

  function isInSelectedMonth(d: Date) {
    return d.getFullYear() === selected.getFullYear() && d.getMonth() === selected.getMonth();
  }

  const prevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const nextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const navBtnStyle: React.CSSProperties = {
    width: "28px", height: "28px", border: "none", background: "transparent",
    cursor: "pointer", fontSize: "18px", color: "#6B7280",
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "6px", lineHeight: 1, padding: 0,
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* 트리거: 선택된 날짜 표시 */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: 0, textAlign: "left",
        }}
      >
        <span style={{
          fontSize: "11px", fontWeight: 700, color, backgroundColor: light,
          borderRadius: "999px", padding: "2px 10px", flexShrink: 0,
        }}>
          {PERIOD_LABEL[period]}
        </span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A2E" }}>
          {formatDisplay(date, period)}
        </span>
        <span style={{
          marginLeft: "auto", fontSize: "12px", color: "#9CA3AF",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          display: "inline-block",
        }}>
          ▼
        </span>
      </button>

      {/* 아코디언 달력 */}
      {isOpen && (
        <div style={{
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid #F3F4F6",
        }}>
          {/* 월 네비게이션 */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "12px",
          }}>
            <button type="button" onClick={prevMonth} style={navBtnStyle}>‹</button>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A2E" }}>
              {viewYear}년 {viewMonth + 1}월
            </span>
            <button type="button" onClick={nextMonth} style={navBtnStyle}>›</button>
          </div>

          {/* 요일 헤더 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px" }}>
            {DAY_LABELS.map((label, i) => (
              <div key={label} style={{
                textAlign: "center", fontSize: "11px", fontWeight: 600, padding: "2px 0",
                color: i === 0 ? "#EF4444" : i === 6 ? color : "#6B7280",
              }}>
                {label}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          {weeks.map((week) => {
            const weekKey = toStr(week[0]);
            const isSelectedWeek = period === "weekly" && week.some((d) => toStr(d) === selectedStr);
            return (
              <div key={weekKey} style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
                backgroundColor: isSelectedWeek ? light : "transparent",
                borderRadius: isSelectedWeek ? "999px" : "0",
                marginBottom: "2px",
              }}>
                {week.map((cellDate, di) => {
                  const cellStr = toStr(cellDate);
                  const isSelected = cellStr === selectedStr;
                  const isViewMonth = cellDate.getMonth() === viewMonth;
                  const isMonthHl = period === "monthly" && isInSelectedMonth(cellDate);

                  let cellBg = "transparent";
                  let cellBr = "0";
                  if (isMonthHl) {
                    cellBg = light;
                    const prevHl = di > 0 && isInSelectedMonth(week[di - 1]);
                    const nextHl = di < 6 && isInSelectedMonth(week[di + 1]);
                    if (!prevHl && !nextHl) cellBr = "999px";
                    else if (!prevHl) cellBr = "999px 0 0 999px";
                    else if (!nextHl) cellBr = "0 999px 999px 0";
                  }

                  return (
                    <button
                      key={cellStr}
                      type="button"
                      onClick={() => {
                        onDateChange(cellStr);
                      }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "1px 0", backgroundColor: cellBg, borderRadius: cellBr,
                        cursor: "pointer", border: "none",
                      }}
                    >
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "30px", height: "30px", borderRadius: "50%",
                        fontSize: "13px", fontWeight: isSelected ? 700 : 400,
                        backgroundColor: isSelected ? color : "transparent",
                        color: isSelected ? "#fff" : !isViewMonth ? "#D1D5DB" : di === 0 ? "#EF4444" : "#1A1A2E",
                        transition: "background-color 0.15s",
                      }}>
                        {cellDate.getDate()}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
