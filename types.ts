export interface Property {
  id: string;
  title: string;
  neighborhood: string;
  category: string;
  price: string;
  priceValue: number;
  isRental: boolean;
  status: string;
  badge: "VERIFIED LEGAL" | "SOUS OFFRE" | "VENDU" | "PRESTIGE" | "NOUVEAUTÉ" | "INVESTISSEUR" | string;
  description: string;
  specs: {
    beds: string;
    baths: string;
    size: string;
    parking?: string;
    security?: string;
  };
  roi: string;
  features: string[];
  imageUrl: string;
}

export interface GeneratorParams {
  neighborhood: string;
  projectType: string;
  budget: string;
  targetAudience: string;
  customDetails: string;
}

export interface GeneratedLead {
  accrocheTitle: string;
  visualConcept: {
    imageType: string;
    suggestedIllustrationUrl?: string;
  };
  technicalSheet: {
    quartier: string;
    typeProjet: string;
    budgetEstimatif: string;
    potentialRoi: string;
  };
  copywritingText: string;
  assuranceSection: {
    titre: string;
    points: string[];
  };
  callToAction: string;
}
