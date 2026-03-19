import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
	useGetEmployeesQuery,
	useMutationPatchEmployeeStatusQuery,
} from "../../../shared/api/generated/admin-employee-management";
import {
	getEmployeeDetailKey,
	getEmployeesKey,
} from "../../../shared/api/generated/admin-employee-management/admin-employee-management.keys";
import type {
	EmployeeDetailResponseDto,
	EmployeeDto,
	EmployeeListResponseDto,
} from "../../../shared/api/generated/api.schemas";
import { useGetMyInfoQuery } from "../../../shared/api/generated/auth";
import { Button } from "../../../shared/ui/Button/Button";
import * as layout from "../../../shared/ui/pageLayout.css";
import { AdminSidebar } from "../../../widgets/AdminSidebar/AdminSidebar";
import { EmployeeDetailModal } from "./EmployeeDetailModal";
import { EmployeeFormModal } from "./EmployeeFormModal";
import * as s from "./EmployeePage.css";
import { EmployeeTable } from "./EmployeeTable";

const PAGE_SIZE = 10;
const GROUP_SIZE = 5;

const STATUS_OPTIONS = ["활성화", "비활성화"];

function StatusDropdown({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	const isActive = value !== "전체";

	return (
		<div className={s.dropdownWrapper} ref={ref}>
			<button
				type="button"
				className={`${s.dropdownTrigger}${isActive ? ` ${s.dropdownTriggerActive}` : ""}`}
				onClick={() => setOpen((o) => !o)}
			>
				{value}
				<span className={`${s.dropdownChevron}${open ? ` ${s.dropdownChevronOpen}` : ""}`}>▼</span>
			</button>
			{open && (
				<div className={s.dropdownMenu}>
					{["전체", ...STATUS_OPTIONS].map((opt) => (
						<button
							key={opt}
							type="button"
							className={`${s.dropdownItem}${value === opt ? ` ${s.dropdownItemActive}` : ""}`}
							onClick={() => { onChange(opt); setOpen(false); }}
						>
							{opt}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

export function EmployeePage() {
	const [page, setPage] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [status, setStatus] = useState("전체");
	const [editId, setEditId] = useState<number | null>(null);
	const [showCreate, setShowCreate] = useState(false);

	const queryClient = useQueryClient();
	const statusMutation = useMutationPatchEmployeeStatusQuery();
	const myEmpId = useGetMyInfoQuery().data?.empId;
	const employeeListParams = {
		page: page - 1,
		size: PAGE_SIZE,
		status: status !== "전체" ? status : undefined,
		keyword: keyword || undefined,
	};

	const { data, isPending, isError } = useGetEmployeesQuery(
		employeeListParams,
		{
			query: {
				staleTime: 0,
				refetchOnMount: "always",
				placeholderData: (previousData) => previousData,
			},
		},
	);

	const items = data?.content ?? [];
	const totalElements = data?.totalElements ?? 0;
	const totalPages = Math.max(
		1,
		data?.totalPages ?? (Math.ceil(totalElements / PAGE_SIZE) || 1),
	);
	const currentPage = Math.min(
		data?.page != null ? data.page + 1 : page,
		totalPages,
	);
	const start = totalElements === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
	const end = Math.min(currentPage * PAGE_SIZE, totalElements);
	const currentGroup = Math.ceil(currentPage / GROUP_SIZE);
	const groupStart = (currentGroup - 1) * GROUP_SIZE + 1;
	const groupEnd = Math.min(groupStart + GROUP_SIZE - 1, totalPages);
	const pages = Array.from(
		{ length: groupEnd - groupStart + 1 },
		(_, i) => groupStart + i,
	);
	const isFirstGroup = currentGroup === 1;
	const isLastGroup = groupStart + GROUP_SIZE > totalPages;

	function invalidate() {
		queryClient.invalidateQueries({ queryKey: getEmployeesKey() });
	}

	async function handleToggleStatus(empId: number, isActive: boolean) {
		const listSnapshots = queryClient.getQueriesData<EmployeeListResponseDto>({
			queryKey: getEmployeesKey(),
		});
		const detailKey = getEmployeeDetailKey(empId);
		const detailSnapshot =
			queryClient.getQueryData<EmployeeDetailResponseDto>(detailKey);

		queryClient.setQueriesData<EmployeeListResponseDto>(
			{ queryKey: getEmployeesKey() },
			(current) => {
				if (!current?.content) return current;
				return {
					...current,
					content: current.content.map((item) =>
						item?.empId === empId ? { ...item, isActive } : item,
					),
				};
			},
		);

		queryClient.setQueryData<EmployeeDetailResponseDto>(detailKey, (current) =>
			current ? { ...current, isActive } : current,
		);

		try {
			await statusMutation.mutateAsync({ empId, data: { isActive } });
			invalidate();
		} catch (error) {
			listSnapshots.forEach(([queryKey, queryData]) => {
				queryClient.setQueryData(queryKey, queryData);
			});
			queryClient.setQueryData(detailKey, detailSnapshot);
			throw error;
		}
	}

	return (
		<>
			<AdminSidebar />

			<main className={layout.main}>
				<div className={s.pageHeader}>
					<div className={s.pageHeaderRow}>
						<div>
							<h1 className={s.headerTitle}>직원 계정 관리</h1>
							<p className={s.headerSubtitle}>
								직원 계정을 생성하고 관리합니다.
							</p>
						</div>
					</div>
					</div>
				<div className={s.filterCard}>
					<div className={s.filterRow}>
						<input
							className={s.searchInput}
							placeholder="이름, 로그인 ID 검색"
							value={keyword}
							onChange={(e) => {
								setKeyword(e.target.value);
								setPage(1);
							}}
						/>
						<StatusDropdown
							value={status}
							onChange={(v) => { setStatus(v); setPage(1); }}
						/>
						<Button
							variant="primary"
							type="button"
							onClick={() => setShowCreate(true)}
						>
							직원 추가
						</Button>
					</div>
				</div>

				<div className={s.content}>
					{isPending && <p className={s.stateText}>불러오는 중...</p>}
					{isError && (
						<p className={s.stateText}>데이터를 불러오지 못했습니다.</p>
					)}
					{!isPending && !isError && items.length === 0 && (
						<p className={s.stateText}>등록된 직원이 없습니다.</p>
					)}
					{!isPending && !isError && items.length > 0 && (
						<>
							<div className={s.tableAnimate}>
								<EmployeeTable
									items={items as EmployeeDto[]}
									onRowClick={setEditId}
									onEdit={setEditId}
								/>
							</div>
							<div className={s.tableCard}>
								<div className={s.pagination}>
									<span className={s.pageInfo}>
										{start.toLocaleString()}–{end.toLocaleString()} /{" "}
										{totalElements.toLocaleString()}건
									</span>
									<div className={s.pageButtons}>
										<button
											type="button"
											className={isFirstGroup ? s.pageBtnDisabled : s.pageBtn}
											onClick={() => setPage(1)}
											disabled={isFirstGroup}
										>
											«
										</button>
										<button
											type="button"
											className={isFirstGroup ? s.pageBtnDisabled : s.pageBtn}
											onClick={() => setPage(groupStart - GROUP_SIZE)}
											disabled={isFirstGroup}
										>
											‹
										</button>
										{pages.map((pg) => (
											<button
												key={pg}
												type="button"
												className={
													pg === currentPage ? s.pageBtnActive : s.pageBtn
												}
												onClick={() => setPage(pg)}
											>
												{pg}
											</button>
										))}
										<button
											type="button"
											className={isLastGroup ? s.pageBtnDisabled : s.pageBtn}
											onClick={() => setPage(groupStart + GROUP_SIZE)}
											disabled={isLastGroup}
										>
											›
										</button>
										<button
											type="button"
											className={isLastGroup ? s.pageBtnDisabled : s.pageBtn}
											onClick={() => setPage(totalPages)}
											disabled={isLastGroup}
										>
											»
										</button>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</main>

			{editId != null && (
				<EmployeeDetailModal
					empId={editId}
					myEmpId={myEmpId}
					onClose={() => {
						setEditId(null);
						invalidate();
					}}
					onToggleStatus={handleToggleStatus}
				/>
			)}
			{showCreate && (
				<EmployeeFormModal
					onClose={() => setShowCreate(false)}
					onSuccess={invalidate}
				/>
			)}
		</>
	);
}
