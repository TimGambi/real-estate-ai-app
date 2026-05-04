import { StatusType } from "../types";

interface StatusBadgeProps {
  status: StatusType;
}

const getStatusColor = (status: StatusType) => {
  if (status === "found") return "bg-emerald-50 border-emerald-200";
  if (status === "needs_check") return "bg-amber-50 border-amber-200";
  return "bg-slate-100 border-slate-200";
};

const getStatusLabel = (status: StatusType) => {
  if (status === "found") return "Найдено уверенно";
  if (status === "needs_check") return "Требует проверки";
  return "Не найдено";
};

const getStatusTextColor = (status: StatusType) => {
  if (status === "found") return "text-emerald-700";
  if (status === "needs_check") return "text-amber-700";
  return "text-slate-600";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(status)} border ${
        getStatusColor(status).split(" ")[1]
      }`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

export { getStatusColor };
