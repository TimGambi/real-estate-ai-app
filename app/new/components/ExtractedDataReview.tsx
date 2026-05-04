import { ExtractedData } from "../types";
import { getStatusColor, StatusBadge } from "./StatusBadge";

interface ExtractedDataReviewProps {
  extractedData: ExtractedData;
  onDataChange: (field: keyof ExtractedData, value: string) => void;
  onConfirm: () => void;
}

const fields = [
  { key: "projectName" as const, label: "Название проекта" },
  { key: "developer" as const, label: "Девелопер" },
  { key: "location" as const, label: "Локация" },
  { key: "objectType" as const, label: "Тип объекта" },
  { key: "priceFrom" as const, label: "Цена от, THB" },
  { key: "priceTo" as const, label: "Цена до, THB" },
  { key: "bedrooms" as const, label: "Количество спален" },
  { key: "area" as const, label: "Площадь" },
  { key: "completionDate" as const, label: "Срок сдачи" },
  { key: "ownershipForm" as const, label: "Форма владения" },
  { key: "paymentPlan" as const, label: "План оплаты" },
];

export function ExtractedDataReview({ extractedData, onDataChange, onConfirm }: ExtractedDataReviewProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div><h2 className="text-2xl font-semibold text-slate-900">Проверьте данные объекта</h2><p className="mt-2 text-sm text-slate-600">Проверьте данные перед генерацией. AI может ошибаться в ценах, сроках сдачи, площадях и условиях покупки.</p></div>
      <div className="grid gap-6 md:grid-cols-2">{fields.map(({ key, label }) => <div key={key} className={`rounded-2xl border ${getStatusColor(extractedData[key].status)} p-4 space-y-3`}><div className="flex items-start justify-between gap-2"><label className="text-sm font-medium text-slate-700">{label}</label><StatusBadge status={extractedData[key].status} /></div><input type="text" value={extractedData[key].value} onChange={(e) => onDataChange(key, e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" /></div>)}</div>

      <div className="space-y-4">
        {([
          { key: "infrastructure" as const, label: "Инфраструктура" },
          { key: "nearbyPlaces" as const, label: "Места рядом" },
          { key: "investmentAdvantages" as const, label: "Инвестиционные преимущества" },
          { key: "risks" as const, label: "Риски / что проверить" },
        ]).map(({ key, label }) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <label className="block text-sm font-medium text-slate-700">{label}</label>
            <textarea value={extractedData[key].value} onChange={(e) => onDataChange(key, e.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
            <StatusBadge status={extractedData[key].status} />
          </div>
        ))}
      </div>

      <button type="button" onClick={onConfirm} className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Подтвердить данные и продолжить</button>
    </div>
  );
}
