export type StatusType = "found" | "needs_check" | "not_found";

export interface ExtractedField {
  value: string;
  status: StatusType;
}

export interface ExtractedData {
  projectName: ExtractedField;
  developer: ExtractedField;
  location: ExtractedField;
  objectType: ExtractedField;
  priceFrom: ExtractedField;
  priceTo: ExtractedField;
  bedrooms: ExtractedField;
  area: ExtractedField;
  completionDate: ExtractedField;
  ownershipForm: ExtractedField;
  paymentPlan: ExtractedField;
  infrastructure: ExtractedField;
  nearbyPlaces: ExtractedField;
  investmentAdvantages: ExtractedField;
  risks: ExtractedField;
}

export interface CompositionItems {
  pdf: boolean;
  telegram: boolean;
  roi: boolean;
  faq: boolean;
  followup: boolean;
}

export interface RoiItem {
  scenario: string;
  description: string;
  initialInvestment: string;
  roi1Year: string;
  roi3Year: string;
  roi5Year: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FollowupMessage {
  day: string;
  subject: string;
  text: string;
}
