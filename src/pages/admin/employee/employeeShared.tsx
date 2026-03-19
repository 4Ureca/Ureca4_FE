import * as ms from "../../consultation/list/ConsultationDetailModal.css";

export function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export function EmployeeField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={ms.fieldGroup}>
      <label className={ms.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

export function EmployeeViewField({ label, value, dimmed }: { label: string; value?: string | number | null; dimmed?: boolean }) {
  return (
    <div className={ms.fieldGroup}>
      <label className={ms.fieldLabel}>{label}</label>
      <div className={ms.fieldBox} style={dimmed ? { backgroundColor: "#F9FAFB", color: "#9CA3AF", cursor: "not-allowed" } : undefined}>
        {value ?? "-"}
      </div>
    </div>
  );
}

interface EmployeeStatusSwitchProps {
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  onToggle: () => void;
}

export function EmployeeStatusSwitch({ checked, disabled, loading, onToggle }: EmployeeStatusSwitchProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      className={ms.fieldBox}
      onClick={onToggle}
      disabled={isDisabled}
      aria-pressed={checked}
      aria-label={checked ? "활성화 상태" : "비활성화 상태"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.7 : 1,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            position: "relative",
            width: "44px",
            height: "24px",
            borderRadius: "999px",
            backgroundColor: checked ? "#2563EB" : "#D1D5DB",
            transition: "background-color 160ms ease",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: checked ? "23px" : "3px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
              transition: "left 160ms ease",
            }}
          />
        </span>
        <span style={{ fontWeight: 600, color: checked ? "#059669" : "#DC2626" }}>
          {checked ? "활성화" : "비활성화"}
        </span>
      </span>
      <span style={{ fontSize: "12px", color: "#6B7280" }}>
        {loading ? "변경 중..." : checked ? "활성" : "비활성"}
      </span>
    </button>
  );
}
