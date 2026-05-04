import { CompositionItems } from "../types";

interface SalesKitOptionsProps {
  composition: CompositionItems;
  onCompositionChange: (item: keyof CompositionItems) => void;
  onGenerate: () => void;
}

export function SalesKitOptions({ composition, onCompositionChange, onGenerate }: SalesKitOptionsProps) {
  const options = [
    { key: "pdf" as const, title: "PDF-презентация на 6 слайдов", description: "Готовая презентация с описанием объекта, фотографиями и инвестиционными данными" },
    { key: "telegram" as const, title: "Telegram-пост", description: "Привлекающий внимание пост для продвижения объекта в Telegram-каналах" },
    { key: "roi" as const, title: "ROI-блок", description: "Таблица потенциальной доходности инвестиций (требует проверки)" },
    { key: "faq" as const, title: "FAQ на 7 вопросов", description: "Ответы на частые вопросы о проекте, условиях покупки и инвестициях" },
    { key: "followup" as const, title: "3 follow-up сообщения", description: "Шаблоны для email или мессенджеров для поддержания интереса клиента" },
  ];

  return <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200"><div><h2 className="text-2xl font-semibold text-slate-900">Настройте состав Sales Kit</h2><p className="mt-2 text-sm text-slate-600">Выберите, какие материалы вы хотите получить. Все компоненты включены по умолчанию.</p></div>
  <div className="space-y-4">{options.map((option) => <label key={option.key} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300"><input type="checkbox" checked={composition[option.key]} onChange={() => onCompositionChange(option.key)} className="mt-1 h-5 w-5 text-slate-900 accent-slate-900" /><div className="flex-1"><p className="font-medium text-slate-900">{option.title}</p><p className="mt-1 text-sm text-slate-600">{option.description}</p></div></label>)}</div>
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm font-medium text-slate-900">Итоговый комплект:</p><ul className="mt-3 space-y-2 text-sm text-slate-700">{composition.pdf && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>PDF-презентация</li>}{composition.telegram && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>Telegram-пост</li>}{composition.roi && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>ROI-блок</li>}{composition.faq && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>FAQ</li>}{composition.followup && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>3 follow-up сообщения</li>}</ul></div>
  <div className="rounded-2xl border border-slate-200 bg-yellow-50 px-4 py-3"><p className="text-xs text-slate-600"><span className="font-semibold text-slate-900">Дисклеймер:</span> Цены, наличие, условия покупки и прогнозная доходность требуют проверки. ROI не является финансовой рекомендацией или гарантией доходности.</p></div>
  <button type="button" onClick={onGenerate} className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Сгенерировать Sales Kit</button></div>;
}
