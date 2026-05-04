"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewSalesKitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
                Новый Sales Kit
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                Создать новый комплект материалов
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Вернуться на главную
            </Link>
          </div>

          <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Заполните поля, чтобы подготовить исходные данные для AI-анализа объектов недвижимости.
            Пока результат не генерируется автоматически, но вы увидите следующий этап работы.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Название объекта</span>
                <input
                  type="text"
                  name="title"
                  placeholder='Например, ЖК "Парус"'
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Ссылка на объект</span>
                <input
                  type="url"
                  name="url"
                  placeholder="https://example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Описание объекта или исходные материалы</span>
              <textarea
                name="description"
                rows={8}
                placeholder="Добавьте ключевые факты, преимущества, локацию, планировки, материалы маркетинга и другие важные данные..."
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Загрузка PDF-файла</span>
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-slate-700">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white file:transition file:hover:bg-slate-700"
                  />
                  {fileName ? (
                    <p className="mt-3 text-sm text-slate-600">Выбран файл: {fileName}</p>
                  ) : (
                    <p className="mt-3 text-sm text-slate-500">PDF пока не загружается, это заглушка.</p>
                  )}
                </div>
              </label>

              <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">Целевая аудитория</p>
                  <div className="space-y-3">
                    {[
                      { value: "investor", label: "Инвестор" },
                      { value: "homebuyer", label: "Покупатель для жизни" },
                      { value: "premium", label: "Премиальный клиент" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300"
                      >
                        <input
                          type="radio"
                          name="audience"
                          value={option.value}
                          defaultChecked={option.value === "investor"}
                          className="h-4 w-4 text-slate-900 accent-slate-900"
                        />
                        <span className="text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">Стиль материала</p>
                  <div className="space-y-3">
                    {[
                      { value: "investment", label: "Инвестиционный" },
                      { value: "premium", label: "Премиальный" },
                      { value: "concise", label: "Кратко и по делу" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300"
                      >
                        <input
                          type="radio"
                          name="style"
                          value={option.value}
                          defaultChecked={option.value === "investment"}
                          className="h-4 w-4 text-slate-900 accent-slate-900"
                        />
                        <span className="text-sm text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Проанализировать материалы
              </button>
              <p className="text-sm text-slate-500">
                Следующий этап: AI извлечёт данные объекта и покажет их для проверки.
              </p>
            </div>

            {isSubmitted && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
                <p className="font-semibold text-slate-900">Заглушка этапа AI</p>
                <p className="mt-2 text-sm leading-6">
                  Следующий этап: AI извлечёт данные объекта и покажет их для проверки.
                  Пока что вы видите демонстрационную заглушку, следующая версия подключит анализ данных и генерацию результатов.
                </p>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
