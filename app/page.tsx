export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
          <p className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
            MVP для рынка недвижимости
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            AI-помощник для создания материалов по объектам недвижимости
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Сервис помогает агентам и девелоперам за несколько минут готовить
            структурированные описания объектов, ключевые преимущества,
            инвестиционные блоки, условия покупки и презентационные тексты.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Создать описание объекта
          </button>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <h2 className="text-2xl font-semibold">Как это работает</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "1. Введите данные",
                description:
                  "Добавьте основную информацию об объекте: тип, локацию, площадь, стоимость и особенности.",
              },
              {
                title: "2. Получите структуру",
                description:
                  "Платформа формирует понятные блоки: описание, преимущества, инвестиционный потенциал и условия покупки.",
              },
              {
                title: "3. Используйте в работе",
                description:
                  "Скопируйте готовый текст и применяйте его в презентациях, объявлениях и коммерческих предложениях.",
              },
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
              >
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <h2 className="text-2xl font-semibold">Для кого продукт</h2>
          <ul className="mt-4 grid gap-3 text-slate-700 sm:grid-cols-2">
            <li className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              Агенты по недвижимости
            </li>
            <li className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              Девелоперы и застройщики
            </li>
            <li className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              Маркетологи в сфере недвижимости
            </li>
            <li className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              Отделы продаж жилых и коммерческих объектов
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
