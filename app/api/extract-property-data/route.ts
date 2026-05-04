interface ExtractPropertyDataRequest {
  title?: string;
  sourceUrl?: string;
  rawText?: string;
  targetAudience?: string;
  tone?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as ExtractPropertyDataRequest;

  const title = body.title?.trim() ?? "";
  const rawText = body.rawText?.trim() ?? "";

  if (!title && !rawText) {
    return Response.json(
      {
        error: "Добавьте название объекта или описание материалов для анализа.",
      },
      { status: 400 },
    );
  }

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
    fieldStatuses: {
      projectName: "found",
      developer: "review",
      location: "found",
      priceFromThb: "review",
      completionDate: "missing",
    },
  });
}
