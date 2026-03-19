export function formatConsultationNumber(
	consultId?: number,
	createdAt?: string,
	consultationNumber?: string,
) {
	if (consultationNumber) {
		return consultationNumber.startsWith("#")
			? consultationNumber
			: `#${consultationNumber}`;
	}

	if (consultId == null) return "–";

	const date = createdAt ? new Date(createdAt) : null;
	const year =
		date && !Number.isNaN(date.getTime()) ? String(date.getFullYear()) : "0000";

	return `#CS-${year}-${String(consultId).padStart(6, "0")}`;
}
