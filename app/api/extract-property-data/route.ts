interface ExtractPropertyDataRequest {
  title?: string;
  sourceUrl?: string;
  rawText?: string;
  hasPdfFile?: boolean;
  targetAudience?: string;
  tone?: string;
}

type SourceConfidence = "low" | "medium" | "high";
type FieldStatus = "found" | "review" | "missing";

interface ExtractPropertyDataResponse {
  projectName: string;
  developer: string;
  location: string;
  propertyType: string;
  priceFromThb: string;
  priceToThb: string;
  bedrooms: string;
  area: string;
  completionDate: string;
  ownership: string;
  paymentPlan: string;
  facilities: string;
  nearbyPlaces: string;
  investmentHighlights: string;
  risks: string;
  missingFields: string[];
  sourceConfidence: SourceConfidence;
  fieldStatuses: {
    projectName: FieldStatus;
    developer: FieldStatus;
    location: FieldStatus;
    propertyType: FieldStatus;
    priceFromThb: FieldStatus;
    priceToThb: FieldStatus;
    bedrooms: FieldStatus;
    area: FieldStatus;
    completionDate: FieldStatus;
    ownership: FieldStatus;
    paymentPlan: FieldStatus;
  };
  sourceSummary: string;
}

const demoResponse: Omit<ExtractPropertyDataResponse, "sourceSummary"> = {
  projectName: "Ориан Сиам Лофт",
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
  missingFields: ["completionDate"],
  sourceConfidence: "medium",
  fieldStatuses: {
    projectName: "found",
    developer: "review",
    location: "found",
    propertyType: "found",
    priceFromThb: "review",
    priceToThb: "review",
    bedrooms: "found",
    area: "found",
    completionDate: "missing",
    ownership: "found",
    paymentPlan: "review",
  },
};

function buildSourceSummary(title: string, sourceUrl: string, hasPdfFile: boolean) {
  const sourceSummaryParts = [
    title ? "Использовано название проекта" : null,
    sourceUrl ? "Использована ссылка на объект" : null,
    hasPdfFile
      ? "PDF-файл отмечен как источник"
      : null,
  ].filter(Boolean);

  const fallback = "Источники указаны без текстового описания.";

  return `${sourceSummaryParts.join(". ") || fallback} Реальный анализ названия, ссылки и PDF будет подключён позже.`;
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

  if (!rawText) {
    return Response.json({
      ...demoResponse,
      sourceSummary: buildSourceSummary(title, sourceUrl, hasPdfFile),
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: "OPENAI_API_KEY не настроен. Добавьте ключ в .env.local.",
      },
      { status: 500 },
    );
  }

  try {
    type OpenAIModule = {
      default: new (options: { apiKey: string }) => {
        responses: {
          create: (args: unknown) => Promise<{ output_text: string }>;
        };
      };
    };

    const { default: OpenAI } = (await eval("import(\"openai\")")) as OpenAIModule;
    const client = new OpenAI({ apiKey });
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const response = await client.responses.create({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "Ты извлекаешь данные по объекту недвижимости из предоставленного текста. Возвращай ответ строго в JSON по заданной схеме. Все значения — на русском языке. Не выдумывай точные цены, сроки сдачи, площади и условия оплаты. Если данных нет, оставляй строку пустой и отмечай поле как missing. Если данные неполные или сомнительные, отмечай поле как review. ROI не рассчитывай.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Извлеки данные объекта недвижимости из текста:\n\n${rawText}`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "property_extraction",
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "projectName",
              "developer",
              "location",
              "propertyType",
              "priceFromThb",
              "priceToThb",
              "bedrooms",
              "area",
              "completionDate",
              "ownership",
              "paymentPlan",
              "facilities",
              "nearbyPlaces",
              "investmentHighlights",
              "risks",
              "missingFields",
              "sourceConfidence",
              "fieldStatuses",
              "sourceSummary",
            ],
            properties: {
              projectName: { type: "string" },
              developer: { type: "string" },
              location: { type: "string" },
              propertyType: { type: "string" },
              priceFromThb: { type: "string" },
              priceToThb: { type: "string" },
              bedrooms: { type: "string" },
              area: { type: "string" },
              completionDate: { type: "string" },
              ownership: { type: "string" },
              paymentPlan: { type: "string" },
              facilities: { type: "string" },
              nearbyPlaces: { type: "string" },
              investmentHighlights: { type: "string" },
              risks: { type: "string" },
              missingFields: { type: "array", items: { type: "string" } },
              sourceConfidence: { type: "string", enum: ["low", "medium", "high"] },
              fieldStatuses: {
                type: "object",
                additionalProperties: false,
                required: [
                  "projectName",
                  "developer",
                  "location",
                  "propertyType",
                  "priceFromThb",
                  "priceToThb",
                  "bedrooms",
                  "area",
                  "completionDate",
                  "ownership",
                  "paymentPlan",
                ],
                properties: {
                  projectName: { type: "string", enum: ["found", "review", "missing"] },
                  developer: { type: "string", enum: ["found", "review", "missing"] },
                  location: { type: "string", enum: ["found", "review", "missing"] },
                  propertyType: { type: "string", enum: ["found", "review", "missing"] },
                  priceFromThb: { type: "string", enum: ["found", "review", "missing"] },
                  priceToThb: { type: "string", enum: ["found", "review", "missing"] },
                  bedrooms: { type: "string", enum: ["found", "review", "missing"] },
                  area: { type: "string", enum: ["found", "review", "missing"] },
                  completionDate: { type: "string", enum: ["found", "review", "missing"] },
                  ownership: { type: "string", enum: ["found", "review", "missing"] },
                  paymentPlan: { type: "string", enum: ["found", "review", "missing"] },
                },
              },
              sourceSummary: { type: "string" },
            },
          },
        },
      },
    });

    const content = response.output_text;
    const parsed = JSON.parse(content) as ExtractPropertyDataResponse;

    return Response.json(parsed);
  } catch (error) {
    console.error("OpenAI extract-property-data error", error);

    return Response.json(
      {
        error: "Не удалось извлечь данные из rawText через OpenAI API.",
      },
      { status: 500 },
    );
  }
}
