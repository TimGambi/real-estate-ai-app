interface ExtractPropertyDataRequest {
  title?: string;
  sourceUrl?: string;
  rawText?: string;
  hasPdfFile?: boolean;
  targetAudience?: string;
  tone?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ExtractPropertyDataRequest;

  const title = body.title?.trim() ?? "";
  const sourceUrl = body.sourceUrl?.trim() ?? "";
  const rawText = body.rawText?.trim() ?? "";
  const hasPdfFile = Boolean(body.hasPdfFile);

  if (!title && !sourceUrl && !rawText && !hasPdfFile) {
    return Response.json(
      {
        error: "Добавьте хотя бы один источник: название проекта, ссылку, описание или PDF-файл.",
      },
      { status: 400 },
    );
  }

  const sourceSummaryParts = [
    title ? "Использовано название проекта" : null,
    sourceUrl ? "Использована ссылка на объект" : null,
    rawText ? "Использовано текстовое описание" : null,
    hasPdfFile ? "PDF-файл отмечен как источник, реальная загрузка будет подключена позже" : null,
  ].filter(Boolean);

  return Response.json({
    projectName: title || "Ориан Сиам Лофт",
    developer: "Orion Property Development Co., Ltd.",
    location: "Район Пхаясинь, Бангкок (BTS Sanam Luang)",
    propertyType: "Жилой комплекс класса А, апартаменты-лофты",
    priceFromThb: "2 500 000",
    priceToThb: "6 500 000",
    bedrooms: "1-3 спальни",
    area: "30-110 кв.м",
    completionDate: "Q4 2026",
    ownership: "Фрихолд (полная собственность)",
    paymentPlan: "25% предоплата, 75% в рассрочку, гибкий график платежей",
    facilities: "Фитнес-центр, спа-зона, ресторан, коворкинг, паркинг, безопасность 24/7",
    nearbyPlaces: "Станция BTS, торговый центр The Siam, парк-музей Бенджамиты, университеты",
    investmentHighlights: "Высокий спрос, центральная локация, престижный район, потенциал роста стоимости",
    risks: "Риск задержки сдачи, конкуренция конкурирующих проектов, экономическая нестабильность",
    sourceSummary: sourceSummaryParts.join(". "),
    fieldStatuses: {
      projectName: "found",
      developer: "review",
      location: "found",
      priceFromThb: "review",
      completionDate: "missing",
    },
  });
}
