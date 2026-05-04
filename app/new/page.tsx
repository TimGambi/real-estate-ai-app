"use client";

import { useState } from "react";
import Link from "next/link";

type StatusType = "found" | "needs_check" | "not_found";

interface ExtractedData {
  projectName: { value: string; status: StatusType };
  developer: { value: string; status: StatusType };
  location: { value: string; status: StatusType };
  objectType: { value: string; status: StatusType };
  priceFrom: { value: string; status: StatusType };
  priceTo: { value: string; status: StatusType };
  bedrooms: { value: string; status: StatusType };
  area: { value: string; status: StatusType };
  completionDate: { value: string; status: StatusType };
  ownershipForm: { value: string; status: StatusType };
  paymentPlan: { value: string; status: StatusType };
  infrastructure: { value: string; status: StatusType };
  nearbyPlaces: { value: string; status: StatusType };
  investmentAdvantages: { value: string; status: StatusType };
  risks: { value: string; status: StatusType };
}

const defaultExtractedData: ExtractedData = {
  projectName: { value: "Ориан Сиам Лофт", status: "found" },
  developer: { value: "Orion Property Development Co., Ltd.", status: "found" },
  location: { value: "Район Пхаясинь, Бангкок (BTS Sanam Luang)", status: "found" },
  objectType: { value: "Жилой комплекс класса А, апартаменты-лофты", status: "found" },
  priceFrom: { value: "2 500 000", status: "needs_check" },
  priceTo: { value: "6 500 000", status: "needs_check" },
  bedrooms: { value: "1-3 спальни", status: "found" },
  area: { value: "30-110 кв.м", status: "found" },
  completionDate: { value: "Q4 2026", status: "needs_check" },
  ownershipForm: { value: "Фрихолд (полная собственность)", status: "found" },
  paymentPlan: { value: "25% предоплата, 75% в рассрочку, гибкий график платежей", status: "needs_check" },
  infrastructure: { value: "Фитнес-центр, спа-зона, ресторан, коворкинг, паркинг, безопасность 24/7", status: "found" },
  nearbyPlaces: { value: "Станция BTS, торговый центр The Siam, паркус-музей Бенджамиты, университеты", status: "found" },
  investmentAdvantages: { value: "Высокий спрос, центральная локация, престижный район, потенциал роста стоимости", status: "found" },
  risks: { value: "Риск задержки сдачи, конкуренция конкурирующих проектов, экономическая нестабильность", status: "not_found" },
};

interface CompositionItems {
  pdf: boolean;
  telegram: boolean;
  roi: boolean;
  faq: boolean;
  followup: boolean;
}

export default function NewSalesKitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDataConfirmed, setIsDataConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [extractedData, setExtractedData] = useState<ExtractedData>(defaultExtractedData);
  const [composition, setComposition] = useState<CompositionItems>({
    pdf: true,
    telegram: true,
    roi: true,
    faq: true,
    followup: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const handleDataChange = (field: keyof ExtractedData, newValue: string) => {
    setExtractedData((prev) => ({
      ...prev,
      [field]: { ...prev[field], value: newValue },
    }));
  };

  const handleConfirmData = () => {
    setIsDataConfirmed(true);
  };

  const handleCompositionChange = (item: keyof CompositionItems) => {
    setComposition((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleGenerateSalesKit = () => {
    setIsGenerating(true);
  };

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

            {isSubmitted && !isDataConfirmed && (
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Проверьте данные объекта</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Проверьте данные перед генерацией. AI может ошибаться в ценах, сроках сдачи, площадях и условиях покупки.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
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
                  ].map(({ key, label }) => (
                    <div key={key} className={`rounded-2xl border ${getStatusColor(extractedData[key].status)} p-4 space-y-3`}>
                      <div className="flex items-start justify-between gap-2">
                        <label className="text-sm font-medium text-slate-700">{label}</label>
                        <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(extractedData[key].status)} border ${getStatusColor(extractedData[key].status).split(" ")[1]}`}>
                          {getStatusLabel(extractedData[key].status)}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={extractedData[key].value}
                        onChange={(e) => handleDataChange(key, e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Инфраструктура</label>
                    <textarea
                      value={extractedData.infrastructure.value}
                      onChange={(e) => handleDataChange("infrastructure", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(extractedData.infrastructure.status)} border ${getStatusColor(extractedData.infrastructure.status).split(" ")[1]}`}>
                      {getStatusLabel(extractedData.infrastructure.status)}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Места рядом</label>
                    <textarea
                      value={extractedData.nearbyPlaces.value}
                      onChange={(e) => handleDataChange("nearbyPlaces", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(extractedData.nearbyPlaces.status)} border ${getStatusColor(extractedData.nearbyPlaces.status).split(" ")[1]}`}>
                      {getStatusLabel(extractedData.nearbyPlaces.status)}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Инвестиционные преимущества</label>
                    <textarea
                      value={extractedData.investmentAdvantages.value}
                      onChange={(e) => handleDataChange("investmentAdvantages", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(extractedData.investmentAdvantages.status)} border ${getStatusColor(extractedData.investmentAdvantages.status).split(" ")[1]}`}>
                      {getStatusLabel(extractedData.investmentAdvantages.status)}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Риски / что проверить</label>
                    <textarea
                      value={extractedData.risks.value}
                      onChange={(e) => handleDataChange("risks", e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium ${getStatusTextColor(extractedData.risks.status)} border ${getStatusColor(extractedData.risks.status).split(" ")[1]}`}>
                      {getStatusLabel(extractedData.risks.status)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmData}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Подтвердить данные и продолжить
                </button>
              </div>
            )}

            {isDataConfirmed && !isGenerating && (
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Настройте состав Sales Kit</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Выберите, какие материалы вы хотите получить. Все компоненты включены по умолчанию.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={composition.pdf}
                      onChange={() => handleCompositionChange("pdf")}
                      className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">PDF-презентация на 6 слайдов</p>
                      <p className="mt-1 text-sm text-slate-600">Готовая презентация с описанием объекта, фотографиями и инвестиционными данными</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={composition.telegram}
                      onChange={() => handleCompositionChange("telegram")}
                      className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Telegram-пост</p>
                      <p className="mt-1 text-sm text-slate-600">Привлекающий внимание пост для продвижения объекта в Telegram-каналах</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={composition.roi}
                      onChange={() => handleCompositionChange("roi")}
                      className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">ROI-блок</p>
                      <p className="mt-1 text-sm text-slate-600">Таблица потенциальной доходности инвестиций (требует проверки)</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={composition.faq}
                      onChange={() => handleCompositionChange("faq")}
                      className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">FAQ на 7 вопросов</p>
                      <p className="mt-1 text-sm text-slate-600">Ответы на частые вопросы о проекте, условиях покупки и инвестициях</p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={composition.followup}
                      onChange={() => handleCompositionChange("followup")}
                      className="mt-1 h-5 w-5 text-slate-900 accent-slate-900"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">3 follow-up сообщения</p>
                      <p className="mt-1 text-sm text-slate-600">Шаблоны для email или мессенджеров для поддержания интереса клиента</p>
                    </div>
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">Итоговый комплект:</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {composition.pdf && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>PDF-презентация</li>}
                    {composition.telegram && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>Telegram-пост</li>}
                    {composition.roi && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>ROI-блок</li>}
                    {composition.faq && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>FAQ</li>}
                    {composition.followup && <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>3 follow-up сообщения</li>}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-yellow-50 px-4 py-3">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Дисклеймер:</span> Цены, наличие, условия покупки и прогнозная доходность требуют проверки. ROI не является финансовой рекомендацией или гарантией доходности.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSalesKit}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Сгенерировать Sales Kit
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
                <p className="font-semibold text-slate-900">Следующий этап: готовые материалы</p>
                <p className="mt-2 text-sm leading-6">
                  Следующий этап: здесь появятся готовые материалы — PDF-презентация, Telegram-пост, ROI-блок, FAQ и follow-up сообщений.
                </p>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
