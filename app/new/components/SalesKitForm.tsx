import { ChangeEvent, FormEvent } from "react";

interface SalesKitFormProps {
  fileName: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function SalesKitForm({ fileName, onSubmit, onFileChange }: SalesKitFormProps) {
  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Название объекта</span>
          <input type="text" name="title" placeholder='Например, ЖК "Парус"' className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Ссылка на объект</span>
          <input type="url" name="url" placeholder="https://example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Описание объекта или исходные материалы</span>
        <textarea name="description" rows={8} placeholder="Добавьте ключевые факты, преимущества, локацию, планировки, материалы маркетинга и другие важные данные..." className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
      </label>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Загрузка PDF-файла</span>
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-slate-700">
            <input type="file" accept="application/pdf" onChange={onFileChange} className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:transition file:hover:bg-slate-700" />
            {fileName ? <p className="mt-3 text-sm text-slate-600">Выбран файл: {fileName}</p> : <p className="mt-3 text-sm text-slate-500">PDF пока не загружается, это заглушка.</p>}
          </div>
        </label>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">Целевая аудитория</p>
            <div className="space-y-3">
              {[{ value: "investor", label: "Инвестор" }, { value: "homebuyer", label: "Покупатель для жизни" }, { value: "premium", label: "Премиальный клиент" }].map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                  <input type="radio" name="audience" value={option.value} defaultChecked={option.value === "investor"} className="h-4 w-4 text-slate-900 accent-slate-900" />
                  <span className="text-sm text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">Стиль материала</p>
            <div className="space-y-3">
              {[{ value: "investment", label: "Инвестиционный" }, { value: "premium", label: "Премиальный" }, { value: "concise", label: "Кратко и по делу" }].map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300">
                  <input type="radio" name="style" value={option.value} defaultChecked={option.value === "investment"} className="h-4 w-4 text-slate-900 accent-slate-900" />
                  <span className="text-sm text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Проанализировать материалы</button>
        <p className="text-sm text-slate-500">Следующий этап: AI извлечёт данные объекта и покажет их для проверки.</p>
      </div>
    </form>
  );
}
