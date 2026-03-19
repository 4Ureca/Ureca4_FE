import { useEffect, useState } from "react";
import {
	useGetEmployeeDetailQuery,
	useMutationPutEmployeeQuery,
} from "../../../shared/api/generated/admin-employee-management";
import { BaseModal } from "../../../shared/ui/BaseModal/BaseModal";
import { Button } from "../../../shared/ui/Button/Button";
import * as ms from "../../consultation/list/ConsultationDetailModal.css";
import { EMPLOYEE_DEPARTMENTS, EMPLOYEE_JOB_ROLES } from "./employeeConstants";
import {
	EmployeeField,
	EmployeeStatusSwitch,
	EmployeeViewField,
	formatDate,
} from "./employeeShared";

interface Props {
	empId: number;
	myEmpId?: number;
	onClose: () => void;
	onToggleStatus: (empId: number, isActive: boolean) => Promise<void>;
}

export function EmployeeDetailModal({
	empId,
	myEmpId,
	onClose,
	onToggleStatus,
}: Props) {
	const [isClosing, setIsClosing] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birth, setBirth] = useState("");
	const [gender, setGender] = useState("M");
	const [deptId, setDeptId] = useState("");
	const [jobRoleId, setJobRoleId] = useState("");
	const [joinedAt, setJoinedAt] = useState("");
	const [isActiveEdit, setIsActiveEdit] = useState(true);
	const [initialized, setInitialized] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [statusErrorMsg, setStatusErrorMsg] = useState("");
	const [isStatusUpdating, setIsStatusUpdating] = useState(false);

	const {
		data: emp,
		isPending,
		isError,
	} = useGetEmployeeDetailQuery(empId, { query: { staleTime: 0 } });
	const putMutation = useMutationPutEmployeeQuery();
	const isSaving = putMutation.isPending;

	useEffect(() => {
		if (emp && !initialized) {
			setName(emp.name ?? "");
			setEmail(emp.email ?? "");
			setPhone(emp.phone ?? "");
			setBirth(emp.birth ?? "");
			setGender(emp.gender ?? "M");
			setIsActiveEdit(emp.isActive ?? true);
			setDeptId(String(emp.deptId ?? ""));
			setJobRoleId(String(emp.jobRoleId ?? ""));
			setJoinedAt(emp.joinedAt?.slice(0, 10) ?? "");
			setInitialized(true);
		}
	}, [emp, initialized]);

	function handleClose() {
		setIsClosing(true);
		setTimeout(onClose, 180);
	}

	function handleSave() {
		setErrorMsg("");
		putMutation.mutate(
			{
				id: empId,
				data: {
					name,
					email,
					phone,
					birth,
					gender,
					dept_id: deptId ? Number(deptId) : undefined,
					job_role_id: jobRoleId ? Number(jobRoleId) : undefined,
					joined_at: joinedAt || undefined,
				},
			},
			{
				onSuccess: () => {
					setIsEditing(false);
					setInitialized(false);
				},
				onError: () => setErrorMsg("저장에 실패했습니다. 다시 시도해주세요."),
			},
		);
	}

	async function handleStatusToggle() {
		if (isStatusUpdating || isOwnAccount) return;

		const nextIsActive = !isActiveEdit;
		setStatusErrorMsg("");
		setIsActiveEdit(nextIsActive);
		setIsStatusUpdating(true);

		try {
			await onToggleStatus(empId, nextIsActive);
		} catch {
			setIsActiveEdit(!nextIsActive);
			setStatusErrorMsg("상태 변경에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsStatusUpdating(false);
		}
	}

	const isOwnAccount = empId === myEmpId;

	const footer = (
		<div
			style={{
				display: "flex",
				gap: "8px",
				width: "100%",
				justifyContent: "flex-end",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", gap: "8px" }}>
				{isEditing ? (
					<>
						<Button
							variant="secondary"
							type="button"
							onClick={() => {
								setIsEditing(false);
								setInitialized(false);
								setErrorMsg("");
								setStatusErrorMsg("");
							}}
							disabled={isSaving}
						>
							취소
						</Button>
						<Button
							variant="primary"
							type="button"
							onClick={handleSave}
							disabled={isSaving || !initialized || isStatusUpdating}
						>
							저장
						</Button>
					</>
				) : (
					<Button
						variant="secondary"
						type="button"
						onClick={() => {
							setIsActiveEdit(emp?.isActive ?? false);
							setStatusErrorMsg("");
							setIsEditing(true);
						}}
						disabled={!initialized}
					>
						수정
					</Button>
				)}
			</div>
		</div>
	);

	return (
		<BaseModal
			title="직원 상세"
			onClose={handleClose}
			isClosing={isClosing}
			size="lg"
			footer={footer}
		>
			{isPending && <p className={ms.stateText}>불러오는 중...</p>}
			{isError && <p className={ms.stateText}>정보를 불러오지 못했습니다.</p>}
			{emp && (
				<div className={ms.fieldStack}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "16px",
						}}
					>
						{isEditing ? (
							<>
								<EmployeeField label="이름">
									<input
										className={ms.fieldBox}
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</EmployeeField>
								<EmployeeViewField
									label="로그인 ID"
									value={emp.loginId}
									dimmed
								/>
								<EmployeeField label="이메일">
									<input
										className={ms.fieldBox}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</EmployeeField>
								<EmployeeField label="연락처">
									<input
										className={ms.fieldBox}
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										placeholder="010-0000-0000"
									/>
								</EmployeeField>
								<EmployeeField label="부서">
									<select
										className={ms.fieldBox}
										value={deptId}
										onChange={(e) => setDeptId(e.target.value)}
									>
										<option value="">부서를 선택하세요</option>
										{EMPLOYEE_DEPARTMENTS.map((department) => (
											<option key={department.deptId} value={department.deptId}>
												{department.deptName}
											</option>
										))}
									</select>
								</EmployeeField>
								<EmployeeField label="직책">
									<select
										className={ms.fieldBox}
										value={jobRoleId}
										onChange={(e) => setJobRoleId(e.target.value)}
									>
										<option value="">직책을 선택하세요</option>
										{EMPLOYEE_JOB_ROLES.map((jobRole) => (
											<option key={jobRole.jobRoleId} value={jobRole.jobRoleId}>
												{jobRole.roleName}
											</option>
										))}
									</select>
								</EmployeeField>
								<EmployeeField label="성별">
									<select
										className={ms.fieldBox}
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="M">남성</option>
										<option value="F">여성</option>
									</select>
								</EmployeeField>
								<EmployeeField label="생년월일">
									<input
										type="date"
										className={ms.fieldBox}
										value={birth}
										onChange={(e) => setBirth(e.target.value)}
									/>
								</EmployeeField>
								<EmployeeField label="입사일">
									<input
										type="date"
										className={ms.fieldBox}
										value={joinedAt}
										onChange={(e) => setJoinedAt(e.target.value)}
									/>
								</EmployeeField>
								<EmployeeViewField
									label="등록일"
									value={formatDate(emp.createdAt)}
									dimmed
								/>
								<EmployeeField label="계정 활성화 여부">
									<EmployeeStatusSwitch
										checked={isActiveEdit}
										onToggle={handleStatusToggle}
										disabled={isOwnAccount}
										loading={isStatusUpdating}
									/>
								</EmployeeField>
							</>
						) : (
							<>
								<EmployeeViewField label="이름" value={emp.name} />
								<EmployeeViewField label="로그인 ID" value={emp.loginId} />
								<EmployeeViewField label="이메일" value={emp.email} />
								<EmployeeViewField label="연락처" value={emp.phone} />
								<EmployeeViewField label="부서" value={emp.deptName} />
								<EmployeeViewField label="직책" value={emp.roleName} />
								<EmployeeViewField
									label="성별"
									value={
										emp.gender === "M"
											? "남성"
											: emp.gender === "F"
												? "여성"
												: emp.gender
									}
								/>
								<EmployeeViewField label="생년월일" value={emp.birth} />
								<EmployeeViewField
									label="입사일"
									value={formatDate(emp.joinedAt)}
								/>
								<EmployeeViewField
									label="등록일"
									value={formatDate(emp.createdAt)}
								/>
								<EmployeeViewField
									label="계정 상태"
									value={isActiveEdit ? "활성" : "비활성"}
								/>
							</>
						)}
					</div>
					{isOwnAccount && isEditing && (
						<p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
							본인 계정의 활성화 상태는 변경할 수 없습니다.
						</p>
					)}
					{statusErrorMsg && (
						<p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>
							{statusErrorMsg}
						</p>
					)}
					{errorMsg && (
						<p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>
							{errorMsg}
						</p>
					)}
				</div>
			)}
		</BaseModal>
	);
}
